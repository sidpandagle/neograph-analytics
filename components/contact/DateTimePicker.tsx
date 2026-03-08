"use client";

import { useState, useEffect, useMemo } from "react";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const DAY_NAMES = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

// Available slots: 9 AM – 5 PM (business hours), internally anchored to America/New_York.
// Users see them converted to their own timezone — no ET label is ever shown.
const SLOT_HOURS = [9, 10, 11, 12, 13, 14, 15, 16, 17];

/** Returns NY's UTC offset in hours (5=EST, 4=EDT) for the given date. */
function getNYOffsetBehindUTC(dateStr: string): number {
  const noon = new Date(`${dateStr}T12:00:00Z`);
  const nyNoonHour = parseInt(
    new Intl.DateTimeFormat("en-US", {
      timeZone: "America/New_York",
      hour: "numeric",
      hour12: false,
    }).format(noon),
    10
  );
  return 12 - nyNoonHour;
}

interface SlotInfo {
  /** Internal key — not displayed to users. */
  slotIndex: number;
  localTimeStr: string;
  tzAbbr: string;
  utcISO: string;
  isDifferentDay: boolean;
  isNextDay: boolean;
}

function computeSlotInfo(
  dateStr: string,
  slotHour: number,
  slotIndex: number,
  userTZ: string,
  nyOffset: number
): SlotInfo {
  const utcHour = slotHour + nyOffset;

  let dayOffset = 0;
  let adjustedHour = utcHour;
  if (utcHour >= 24) { dayOffset = 1; adjustedHour -= 24; }
  else if (utcHour < 0) { dayOffset = -1; adjustedHour += 24; }

  const baseDate = new Date(`${dateStr}T00:00:00Z`);
  const utcInstant = new Date(baseDate.getTime() + dayOffset * 86400000);
  utcInstant.setUTCHours(adjustedHour, 0, 0, 0);

  const localTimeStr = new Intl.DateTimeFormat("en-US", {
    timeZone: userTZ,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(utcInstant);

  const tzAbbr =
    new Intl.DateTimeFormat("en-US", { timeZone: userTZ, timeZoneName: "short" })
      .formatToParts(utcInstant)
      .find((p) => p.type === "timeZoneName")?.value ?? "";

  const localDateStr = new Intl.DateTimeFormat("en-CA", {
    timeZone: userTZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(utcInstant);

  const isDifferentDay = localDateStr !== dateStr;
  const isNextDay = isDifferentDay && localDateStr > dateStr;

  return { slotIndex, localTimeStr, tzAbbr, utcISO: utcInstant.toISOString(), isDifferentDay, isNextDay };
}

interface CalendarCell {
  day: number;
  dateStr: string;
  isCurrentMonth: boolean;
  isToday: boolean;
  isDisabled: boolean;
}

function buildCalendarCells(year: number, month: number): CalendarCell[] {
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];

  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();

  const cells: CalendarCell[] = [];

  for (let i = firstWeekday - 1; i >= 0; i--) {
    const d = prevMonthDays - i;
    const m = month === 0 ? 11 : month - 1;
    const y = month === 0 ? year - 1 : year;
    cells.push({
      day: d,
      dateStr: `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`,
      isCurrentMonth: false,
      isToday: false,
      isDisabled: true,
    });
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    const weekday = (firstWeekday + d - 1) % 7;
    const isWeekend = false; // weekends allowed per user preference
    const isPastOrToday = dateStr <= todayStr;
    cells.push({
      day: d,
      dateStr,
      isCurrentMonth: true,
      isToday: dateStr === todayStr,
      isDisabled: isWeekend || isPastOrToday,
    });
  }

  const remaining = 42 - cells.length;
  for (let d = 1; d <= remaining; d++) {
    const m = month === 11 ? 0 : month + 1;
    const y = month === 11 ? year + 1 : year;
    cells.push({
      day: d,
      dateStr: `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`,
      isCurrentMonth: false,
      isToday: false,
      isDisabled: true,
    });
  }

  return cells;
}

export interface DateTimeSelection {
  dateTimeUTC: string;    // canonical UTC instant
  userTimezone: string;   // IANA timezone name
  timeLocalLabel: string; // e.g. "7:30 PM IST"
  tzAbbr: string;
}

interface DateTimePickerProps {
  onChange: (sel: DateTimeSelection | null) => void;
}

export function DateTimePicker({ onChange }: DateTimePickerProps) {
  const today = new Date();

  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedSlotIndex, setSelectedSlotIndex] = useState<number>(-1);

  const [userTZ, setUserTZ] = useState("America/New_York");
  const [tzAbbr, setTZAbbr] = useState("ET");

  useEffect(() => {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setUserTZ(tz);
    const abbr =
      new Intl.DateTimeFormat("en-US", { timeZone: tz, timeZoneName: "short" })
        .formatToParts(new Date())
        .find((p) => p.type === "timeZoneName")?.value ?? tz;
    setTZAbbr(abbr);
  }, []);

  const calendarCells = useMemo(
    () => buildCalendarCells(viewYear, viewMonth),
    [viewYear, viewMonth]
  );

  const nyOffset = useMemo(
    () => (selectedDate ? getNYOffsetBehindUTC(selectedDate) : 5),
    [selectedDate]
  );

  const slots = useMemo(
    (): SlotInfo[] =>
      selectedDate
        ? SLOT_HOURS.map((h, i) => computeSlotInfo(selectedDate, h, i, userTZ, nyOffset))
        : [],
    [selectedDate, userTZ, nyOffset]
  );

  const canGoPrev =
    viewYear > today.getFullYear() ||
    (viewYear === today.getFullYear() && viewMonth > today.getMonth());

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear((y) => y - 1); setViewMonth(11); }
    else setViewMonth((m) => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear((y) => y + 1); setViewMonth(0); }
    else setViewMonth((m) => m + 1);
  };

  const handleDateSelect = (dateStr: string) => {
    setSelectedDate(dateStr);
    setSelectedSlotIndex(-1);
    onChange(null);
  };

  const handleSlotSelect = (slot: SlotInfo) => {
    setSelectedSlotIndex(slot.slotIndex);
    onChange({
      dateTimeUTC: slot.utcISO,
      userTimezone: userTZ,
      timeLocalLabel: `${slot.localTimeStr} ${slot.tzAbbr}`,
      tzAbbr: slot.tzAbbr,
    });
  };

  const selectedSlot = slots.find((s) => s.slotIndex === selectedSlotIndex);

  return (
    <div className="space-y-4">
      {/* Timezone indicator */}
      <div className="flex items-center gap-2 text-xs bg-[var(--muted)] rounded-lg px-3 py-2 text-[var(--muted-foreground)]">
        <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>
          Times shown in your timezone:{" "}
          <strong>{tzAbbr}</strong>{" "}
          <span className="opacity-70">({userTZ})</span>
        </span>
      </div>

      <div className="grid md:grid-cols-[auto_1fr] gap-4">
        {/* ── Calendar ── */}
        <div className="border border-[var(--border)] rounded-xl p-4 bg-[var(--background)]">
          <div className="flex items-center justify-between mb-3 gap-2">
            <button
              type="button"
              onClick={prevMonth}
              disabled={!canGoPrev}
              aria-label="Previous month"
              className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-[var(--muted)] disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-sm font-semibold min-w-[130px] text-center">
              {MONTH_NAMES[viewMonth]} {viewYear}
            </span>
            <button
              type="button"
              onClick={nextMonth}
              aria-label="Next month"
              className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-[var(--muted)] transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-7 mb-1">
            {DAY_NAMES.map((d) => (
              <div key={d} className="text-center text-xs font-medium py-1 text-[var(--muted-foreground)]">
                {d}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-y-0.5">
            {calendarCells.map((cell, i) => {
              const isSelected = cell.dateStr === selectedDate;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => !cell.isDisabled && handleDateSelect(cell.dateStr)}
                  disabled={cell.isDisabled}
                  className={[
                    "h-8 w-8 mx-auto flex items-center justify-center text-xs rounded-lg transition-all",
                    !cell.isCurrentMonth ? "opacity-20 pointer-events-none" : "",
                    cell.isDisabled && cell.isCurrentMonth ? "opacity-30 cursor-not-allowed" : "",
                    isSelected
                      ? "bg-[var(--primary)] text-white font-semibold shadow-sm"
                      : cell.isToday && !cell.isDisabled
                      ? "ring-1 ring-[var(--primary)] text-[var(--primary)] font-semibold hover:bg-[var(--primary)]/10"
                      : !cell.isDisabled
                      ? "hover:bg-[var(--muted)] text-[var(--foreground)] cursor-pointer"
                      : "text-[var(--muted-foreground)]",
                  ].filter(Boolean).join(" ")}
                >
                  {cell.day}
                </button>
              );
            })}
          </div>

          <p className="text-[10px] text-[var(--muted-foreground)] mt-3 text-center opacity-50">
            Advance booking only
          </p>
        </div>

        {/* ── Time Slots ── */}
        <div className="border border-[var(--border)] rounded-xl p-4 bg-[var(--background)]">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold">Available Times</h4>
            {selectedDate && (
              <span className="text-xs text-[var(--muted-foreground)]">
                {new Date(`${selectedDate}T12:00:00Z`).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </span>
            )}
          </div>

          {!selectedDate ? (
            <div className="flex flex-col items-center justify-center min-h-[240px] text-[var(--muted-foreground)] text-center">
              <svg className="w-10 h-10 mb-3 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-sm">Select a date to<br />see available times</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {slots.map((slot) => {
                const isSelected = selectedSlotIndex === slot.slotIndex;
                return (
                  <button
                    key={slot.slotIndex}
                    type="button"
                    onClick={() => handleSlotSelect(slot)}
                    className={[
                      "px-2 py-2.5 rounded-lg text-center transition-all border",
                      isSelected
                        ? "bg-[var(--primary)] border-[var(--primary)] shadow-sm"
                        : "border-[var(--border)] hover:border-[var(--primary)]/50 hover:bg-[var(--muted)]",
                    ].join(" ")}
                  >
                    <div className={`text-xs font-semibold leading-tight ${isSelected ? "text-white" : "text-[var(--foreground)]"}`}>
                      {slot.localTimeStr}
                      {slot.isDifferentDay && (
                        <span className={`ml-1 text-[10px] font-normal ${isSelected ? "text-white/70" : slot.isNextDay ? "text-amber-500" : "text-sky-500"}`}>
                          {slot.isNextDay ? "+1d" : "-1d"}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Selection summary */}
      {selectedDate && selectedSlotIndex >= 0 && selectedSlot && (
        <div className="flex items-start gap-3 bg-green-50 border border-green-200 rounded-lg px-4 py-3">
          <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="text-sm text-green-900 leading-relaxed">
            <span className="font-semibold">
              {new Date(`${selectedDate}T12:00:00Z`).toLocaleDateString("en-US", {
                weekday: "long", month: "long", day: "numeric", year: "numeric",
              })}
            </span>
            <span className="mx-1.5 text-green-600">·</span>
            <span className="font-semibold">
              {selectedSlot.localTimeStr} {selectedSlot.tzAbbr}
            </span>
            {selectedSlot.isDifferentDay && (
              <span className="ml-1.5 text-amber-600 text-xs">
                · {selectedSlot.isNextDay ? "next day" : "previous day"} in your timezone
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
