/**
 * Contrast audit over the design tokens, in both themes.
 *
 * The standing rule for UI findings on this project is that they carry a
 * number. This reads the hex tokens straight out of `app/globals.css` — the
 * `:root` block for light, the `.dark` block for dark — and measures the pairs
 * the components actually use, so a claim like "the caption is too faint" is
 * either 4.7:1 or it is not a finding.
 *
 *   node scripts/contrast-audit.mjs
 *
 * Exit code is the number of failures, so it can gate a commit.
 *
 * WCAG thresholds applied: 4.5:1 for body text, 3:1 for large text (>=18.66px
 * bold or >=24px) and for non-text UI boundaries under 1.4.11.
 */
import fs from 'fs';

const CSS = fs.readFileSync('app/globals.css', 'utf8');

/** Tokens from a block, by brace matching rather than a line window. */
function tokensFrom(selector) {
  const start = CSS.indexOf(selector);
  if (start === -1) return {};
  let depth = 0;
  let i = CSS.indexOf('{', start);
  const from = i;
  for (; i < CSS.length; i++) {
    if (CSS[i] === '{') depth++;
    else if (CSS[i] === '}') {
      depth--;
      if (depth === 0) break;
    }
  }
  const body = CSS.slice(from, i);
  const out = {};
  for (const m of body.matchAll(/(--[a-z0-9-]+)\s*:\s*(#[0-9a-fA-F]{3,8})\s*;/g)) {
    out[m[1]] = m[2];
  }
  return out;
}

const light = tokensFrom(':root');
const dark = { ...light, ...tokensFrom('.dark') };

function channel(c) {
  const v = c / 255;
  return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
}

function luminance(hex) {
  let h = hex.replace('#', '');
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

function ratio(a, b) {
  const [x, y] = [luminance(a), luminance(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
}

/**
 * The pairs that appear in the components, each with the rule that applies.
 *
 * Two modelling notes, both learned by getting them wrong first:
 *
 * 1. A **two-tone focus ring passes if either stroke clears 3:1** against the
 *    surface. Measuring the strokes separately reported the ink ring as failing
 *    on the blue panel (2.58:1) when the paper ring beside it is at 7.25:1 —
 *    which is the entire reason the ring is two-tone. Those pairs are marked
 *    `anyOf`.
 * 2. **1.4.11 does not ask 3:1 of a decorative rule.** A card outline or a
 *    section divider is not a component boundary a user must perceive; the card
 *    has its own background and the content is understandable without the line.
 *    The border of a *form field* is different — it is the affordance — which
 *    is why `--input` is audited at 3:1 and `--border` is reported for
 *    information only.
 */
const PAIRS = [
  ['body text', '--foreground', '--card', 4.5, 'page prose on a panel'],
  ['body text', '--foreground', '--background', 4.5, 'page prose on the desk'],
  ['muted text', '--muted-foreground', '--card', 4.5, 'chart source captions (ChartFigure), related-report meta'],
  ['muted text', '--muted-foreground', '--background', 4.5, 'methodology lede, listing meta'],
  ['muted text', '--muted-foreground', '--muted', 4.5, 'FAQ toggle glyph in its closed circle'],
  ['field border', '--input', '--card', 3.0, 'form fields on a panel (contact, request-sample, country select)'],
  ['field border', '--input', '--background', 3.0, 'form fields on the desk'],
  ['large text', '--cmi-primary', '--card', 3.0, 'links and headings in accent'],
  ['body text', '--primary-foreground', '--cmi-primary-fill', 4.5, 'white label on the blue panel and buttons'],

  /* Status panels. The message sits on the panel's own surface, not on the
     card behind it, so that is the pair that has to clear 4.5:1. The icon
     glyphs are measured at 3:1 as non-text UI under 1.4.11 -- a 20px stroked
     SVG is a graphic, not text. */
  ['body text', '--status-error-text', '--status-error-surface', 4.5, 'the message in an error panel (contact, request-sample, blog form, checkout)'],
  ['icon', '--status-error-icon', '--status-error-surface', 3.0, 'the alert glyph inside an error panel'],
  ['icon', '--status-error-icon', '--card', 3.0, 'the required-field asterisk on a panel (CheckoutForm)'],
  ['body text', '--status-info-text', '--status-info-surface', 4.5, 'the privacy note under the request-sample form'],
  ['icon', '--status-info-icon', '--status-info-chip', 3.0, 'the tick and document glyphs in their round chips'],
  ['icon', '--status-success-icon', '--status-success-surface', 3.0, 'the order-confirmed tick'],
  ['icon', '--status-warn-icon', '--status-warn-surface', 3.0, 'the amber accent glyph on /about and /404'],
];

/** Decorative only: measured and printed, never failed. See note 2 above. */
const INFORMATIONAL = [
  ['--status-error-border', '--status-error-surface', 'the error panel outline against its own fill'],
  ['--status-info-border', '--status-info-surface', 'the note panel outline against its own fill'],
  ['--status-error-surface', '--card', 'the error panel separating from the card behind it'],
  ['--status-info-surface', '--card', 'the note panel separating from the card behind it'],
  ['--status-info-chip', '--card', 'the round icon chip separating from the card behind it'],
  ['--status-error-border', '--card', 'what actually makes the error panel perceivable; compare --border on --card below'],
  ['--status-info-border', '--card', 'what actually makes the note panel perceivable; compare --border on --card below'],
  ['--border', '--card', 'card outlines, FAQ row borders'],
  ['--border', '--background', 'section rules'],
];

/** A ring passes when either stroke clears the threshold against the surface. */
const RING_SURFACES = [
  ['--card', 'a panel'],
  ['--cmi-primary-fill', 'the blue hero and CTA panels'],
  ['--cmi-ink-surface', 'the footer'],
  ['--background', 'the desk'],
];

let failures = 0;

for (const [theme, tokens] of [['light', light], ['dark', dark]]) {
  console.log(`\n${theme}`);
  for (const [kind, fg, bg, min, where] of PAIRS) {
    const a = tokens[fg];
    const b = tokens[bg];
    if (!a || !b) {
      console.log(`  ?  ${fg} on ${bg} — token not defined as a hex in this theme`);
      continue;
    }
    const r = ratio(a, b);
    const ok = r >= min;
    if (!ok) failures++;
    console.log(
      `  ${ok ? 'ok' : 'XX'} ${r.toFixed(2).padStart(5)}:1  (needs ${min})  ${fg} on ${bg}  — ${kind}, ${where}`
    );
  }

  for (const [surface, where] of RING_SURFACES) {
    const outer = tokens['--focus-ring'];
    const inner = tokens['--focus-ring-inner'];
    const bg = tokens[surface];
    if (!outer || !inner || !bg) continue;
    const best = Math.max(ratio(outer, bg), ratio(inner, bg));
    const ok = best >= 3;
    if (!ok) failures++;
    console.log(
      `  ${ok ? 'ok' : 'XX'} ${best.toFixed(2).padStart(5)}:1  (needs 3)  focus ring, better stroke on ${surface}  — ${where}`
    );
  }

  for (const [fg, bg, where] of INFORMATIONAL) {
    const a = tokens[fg];
    const b = tokens[bg];
    if (!a || !b) continue;
    console.log(
      `  --  ${ratio(a, b).toFixed(2).padStart(5)}:1  (decorative, no threshold)  ${fg} on ${bg}  — ${where}`
    );
  }
}

console.log(`\n${failures} failing pair${failures === 1 ? '' : 's'}`);
process.exit(Math.min(failures, 125));
