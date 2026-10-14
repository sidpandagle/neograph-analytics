"""Budget gate for the 24/7 autopilot.

Ceiling is 70% OF PACE, not 70% absolute. Pace is the share of the 7-day window
already elapsed, i.e. what even spending would have consumed by now. Running at
or above the ceiling means stop and wait for Siddhant.
"""
import json, os, time, sys

STATE = os.path.join(os.path.expanduser("~"), ".claude", "budget-state.json")
WINDOW = 7 * 86400
FACTOR = 0.70

def main() -> int:
    try:
        with open(STATE) as fh:
            d = json.load(fh)
    except (OSError, ValueError) as exc:
        print(f"budget: state unreadable ({exc}). Treat as STOP.")
        return 2

    used = float(d.get("seven_day_pct") or 0)
    reset = d.get("seven_day_reset")
    if not reset:
        print("budget: no reset timestamp. Treat as STOP.")
        return 2

    start = float(reset) - WINDOW
    pace = max(0.0, min(100.0, (time.time() - start) / WINDOW * 100))
    ceiling = FACTOR * pace

    print(f"7d used            : {used:.0f}%")
    print(f"pace (elapsed)     : {pace:.1f}%")
    print(f"ceiling (70% pace) : {ceiling:.1f}%")
    print(f"headroom           : {ceiling - used:+.1f} points")
    print(f"window resets      : {time.strftime('%Y-%m-%d %H:%M', time.localtime(float(reset)))}")
    print(f"5h used            : {d.get('five_hour_pct')}%")

    if used >= ceiling:
        print("STATUS: STOP - at or over the ceiling. Await instruction.")
        return 1
    print("STATUS: OK - continue.")
    return 0

if __name__ == "__main__":
    sys.exit(main())
