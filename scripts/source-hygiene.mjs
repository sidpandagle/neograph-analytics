/**
 * Offline scan for source damage that nothing else catches, because the file
 * still parses and the app still runs.
 *
 * Why this exists: a regex escape in this repo has been eaten by tooling three
 * times. Twice in `lib/seo.ts` -- once turning `\b` into a literal backspace
 * (the pattern then matched nothing and the function silently did nothing), and
 * once turning `\s+` into `s+`, which replaced every letter "s" in a report
 * title with a space and shipped "Global Liquid Biop y Market" to 182 pages.
 * Once more in `components/reports/JsonReportSections.tsx`, where the mangled
 * boundary left `co` matching inside "Covestro".
 *
 * None of the three failed a build, a typecheck or a lint. Two of them matched
 * *something*, so they did damage rather than nothing. A backspace character is
 * invisible in every editor and in `cat`, which is why this reads bytes.
 *
 *   node scripts/source-hygiene.mjs
 *
 * Exit code is the number of findings, so it can gate a commit.
 */
import fs from 'fs';
import path from 'path';

const ROOTS = ['app', 'components', 'lib', 'scripts', 'content'];
const EXTS = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs', '.css', '.json', '.md']);

/* Control characters that no source file in this repo has a reason to contain.
   Tab (9), newline (10) and carriage return (13) are excluded. */
const CONTROL = new Map([
  [8, 'backspace (\b that lost its backslash)'],
  [11, 'vertical tab (\v that lost its backslash)'],
  [12, 'form feed (\f that lost its backslash)'],
  [0, 'null'],
  [27, 'escape'],
]);

/* A regex literal whose first atom is a bare letter that is only ever meant as
   an escape class. `/s+/` is the shape that shipped; `/d{4}/` and `/w+/` are the
   same mistake waiting. Matched conservatively: a slash, then one of those
   letters, then a quantifier or a closing slash. */
const SUSPECT = new RegExp("[=(,\s]/[sSdDwWbB][+*?{]", 'g');

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name.startsWith('.')) continue;
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p, out);
    else if (EXTS.has(path.extname(entry.name))) out.push(p);
  }
  return out;
}

const files = ROOTS.filter((r) => fs.existsSync(r)).flatMap((r) => walk(r));
let findings = 0;

for (const file of files) {
  const buf = fs.readFileSync(file);
  for (const [code, label] of CONTROL) {
    let n = 0;
    for (const b of buf) if (b === code) n++;
    if (n) {
      // Report the line so it can be found, since the character cannot be seen.
      const text = buf.toString('utf8');
      const line = text.slice(0, text.indexOf(String.fromCharCode(code))).split('\n').length;
      console.log(`x ${file}:${line}  ${n} x ${label}`);
      findings += n;
    }
  }

  const text = buf.toString('utf8');
  if (file.endsWith('.md')) continue; // prose quotes these patterns on purpose
  for (const m of text.matchAll(SUSPECT)) {
    const line = text.slice(0, m.index).split('\n').length;
    const atom = m[0].trim();
    console.log(`x ${file}:${line}  regex literal starts ${atom} — a lost backslash looks exactly like this`);
    findings++;
  }
}

console.log(`\n${files.length} source files scanned`);
console.log(`${findings} finding${findings === 1 ? '' : 's'}`);
process.exit(Math.min(findings, 125));
