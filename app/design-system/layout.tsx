import type { Metadata } from "next";

/**
 * The showcase page itself is a client component, so it cannot export metadata.
 * This layout supplies what the audit found missing: a canonical, and an
 * explicit `noindex` rather than relying on the robots.txt disallow alone —
 * a disallowed URL can still be indexed from external links, since the
 * crawler never reads the page to find a meta robots tag, but a direct
 * request (which is how it would get indexed) does see this one.
 */
export const metadata: Metadata = {
  title: "Design System",
  description: "Internal component showcase for the NeoGraph Analytics UI library.",
  alternates: { canonical: "/design-system" },
  robots: { index: false, follow: false },
};

export default function DesignSystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
