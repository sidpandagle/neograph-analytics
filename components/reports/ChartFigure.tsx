"use client"

import React from 'react'
import Link from 'next/link'

interface ChartFigureProps {
  /** The sentence that says where the plotted numbers came from. */
  source: string
  /** How the series was constructed, where that is not self-evident. */
  modelling?: string
  children: React.ReactNode
  className?: string
}

/**
 * A chart with its source note attached.
 *
 * `<figure>` / `<figcaption>` is the semantic pairing for this, and it is what
 * a screen reader needs to read the caption as belonging to the graphic rather
 * than as loose text that happens to follow it.
 *
 * The caption always carries a source line and always links to the methodology
 * page. On a research publication the provenance of a figure is part of the
 * figure, not an optional extra.
 */
export const ChartFigure: React.FC<ChartFigureProps> = ({
  source,
  modelling,
  children,
  className,
}) => (
  <figure className={className}>
    {children}
    <figcaption className="mt-2 px-1 text-xs leading-relaxed text-[var(--muted-foreground)]">
      <span className="font-semibold text-[var(--foreground)]">Source:</span> {source}
      {modelling && <> {modelling}</>}{' '}
      <Link
        href="/methodology"
        className="underline underline-offset-2 hover:text-[var(--foreground)]"
      >
        How these figures are produced
      </Link>
      .
    </figcaption>
  </figure>
)
