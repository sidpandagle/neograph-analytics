import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui";
import { getHomeFacts } from "@/lib/api/home";

// Served from Supabase (the corpus count), so the route must revalidate rather
// than freeze at build time.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Methodology | How our figures are produced",
  description:
    "How NeoGraph Analytics builds a market estimate: published estimates compared, their spread reported, and every headline grounded against a public register.",
  keywords: [
    "market research methodology",
    "healthcare market sizing",
    "research transparency",
    "market forecast method",
  ],
  alternates: { canonical: "/methodology" },
};

const heading = "text-[22px] font-semibold tracking-[-0.01em] text-[var(--foreground)]";
const body = "mt-3 text-[15px] leading-[1.75] text-[var(--content-body,var(--foreground))]";

export default async function MethodologyPage() {
  const facts = await getHomeFacts();

  return (
    <Container>
      <article className="mx-auto max-w-[72ch] py-14">
        <header>
          <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-[var(--muted-foreground)]">
            Methodology
          </p>
          <h1 className="mt-2 text-[34px] font-semibold leading-[1.15] tracking-[-0.02em] text-[var(--foreground)]">
            How our figures are produced
          </h1>
          <p className="mt-4 text-[17px] leading-[1.7] text-[var(--muted-foreground)]">
            Every chart on this site links here. The short version: we report the
            range of published estimates rather than picking one, we say which
            scope decision explains the gap between them, and we test each
            headline against something countable before we publish it.
          </p>
        </header>

        <section className="mt-12">
          <h2 className={heading}>1. Published estimates are collected, not averaged</h2>
          <p className={body}>
            For each market we gather the size and growth figures already in
            circulation, with each publisher&apos;s stated scope recorded next to
            its number. Estimates for the same market routinely differ by two to
            three times. That spread is almost never a disagreement about growth
            — published CAGRs tend to cluster tightly — it is a disagreement
            about what counts as the market. A report whose headline is a single
            number is reporting the analyst&apos;s scope decision, not a finding
            about the market, so we publish the spread and name the scope
            difference behind it.
          </p>
        </section>

        <section className="mt-10">
          <h2 className={heading}>2. Headlines are grounded against a public register</h2>
          <p className={body}>
            Before a figure is published it is divided through by something a
            reader can count: FDA device and approval listings, CMS provider
            counts, the IAEA DIRAC register of radiotherapy centres,
            ClinicalTrials.gov trial counts, WHO and OECD statistics, or revenue
            a company discloses in its own filings. The resulting per-unit number
            is checkable arithmetic, and it is often decisive — an implied
            $976,000 per treatment centre per year, for instance, rules out a
            narrow reading of a market&apos;s scope on its own.
          </p>
          <p className={body}>
            A grounding calculation is a plausibility test, not a market
            estimate. Where we use one, the report says so, and says what the
            register itself leaves out.
          </p>
        </section>

        <section className="mt-10">
          <h2 className={heading}>3. What we leave out</h2>
          <p className={body}>
            Sections appear only when there is evidence behind them. In practice
            that means several things are routinely absent, on purpose:
          </p>
          <ul className={`${body} list-disc space-y-2 pl-5`}>
            <li>
              <strong className="font-semibold text-[var(--foreground)]">
                Vendor market shares.
              </strong>{" "}
              Private-company share is almost never disclosed. Our competitive
              sections name the players and describe their position in words. Where
              the only figures in circulation are a decade old, we say that
              instead of repeating them.
            </li>
            <li>
              <strong className="font-semibold text-[var(--foreground)]">
                Regional and country splits
              </strong>{" "}
              that no source provides. An omitted section is honest; an
              apportioned percentage is not.
            </li>
            <li>
              <strong className="font-semibold text-[var(--foreground)]">
                Segment percentages
              </strong>{" "}
              where only the segment list is known. The dimensions are listed
              without numbers attached.
            </li>
            <li>
              <strong className="font-semibold text-[var(--foreground)]">
                Recent-development lists
              </strong>{" "}
              padded with unsourced items.
            </li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className={heading}>4. Internal arithmetic checks</h2>
          <p className={body}>
            Each report is checked mechanically before publication. The stated
            CAGR has to reconnect the base-year value to the forecast value
            across the stated forecast period, to within a rounding tolerance;
            the plotted series has to begin at the base year on exactly the
            base-year figure; every chart has to carry a source; and the
            methodology section has to name at least three datable publications
            or registers. A draft that fails any of these is not published.
          </p>
          <p className={body}>
            Forecast curves between two published endpoints are modelled at a
            constant rate. That is a presentational choice, not a prediction of
            the path, and the caption under each chart says so.
          </p>
        </section>

        <section className="mt-10">
          <h2 className={heading}>5. Corrections</h2>
          <p className={body}>
            Figures get superseded. If a number here conflicts with a source you
            hold, write to us and say which figure and which source — we would
            rather correct a report than defend it.{" "}
            <Link
              href="/contact"
              className="font-medium text-[var(--cmi-primary)] underline underline-offset-2"
            >
              Contact the research desk
            </Link>
            .
          </p>
        </section>

        <footer className="mt-12 border-t border-[var(--border)] pt-6">
          <p className="text-[13.5px] leading-[1.7] text-[var(--muted-foreground)]">
            {facts.reportCount} reports across {facts.industryCount} industry
            categories are published under this methodology.{" "}
            <Link
              href="/reports"
              className="font-medium text-[var(--cmi-primary)] underline underline-offset-2"
            >
              Browse the research
            </Link>
            .
          </p>
        </footer>
      </article>
    </Container>
  );
}
