"use client"

import React, { useState } from 'react'
import { MarketForecastLineChart } from './charts/MarketForecastLineChart'
import { ComponentSharePieChart } from './charts/ComponentSharePieChart'
import { RegionalBarChart } from './charts/RegionalBarChart'
import type { JsonReport, SegmentItem } from '@/lib/jsonReports'

interface JsonReportSectionsProps {
  report: JsonReport
}

// ── Section counter ─────────────────────────────────────────────────────────
let _sectionIndex = 0
function resetSectionIndex() { _sectionIndex = 0 }
function nextSection() { return ++_sectionIndex }

// ── helpers ─────────────────────────────────────────────────────────────────

const SectionHeading = ({ id, num, children }: { id: string; num: number; children: React.ReactNode }) => (
  <div className="flex items-start gap-4 mb-7">
    <span
      className="flex-shrink-0 mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
      style={{ background: 'rgba(17,26,74,0.08)', color: '#111a4a', border: '1px solid rgba(17,26,74,0.16)' }}
    >
      {String(num).padStart(2, '0')}
    </span>
    <h2
      id={id}
      className="font-display text-2xl font-bold scroll-mt-24"
      style={{ color: '#011821', letterSpacing: '-0.01em', lineHeight: '1.25' }}
    >
      {children}
    </h2>
  </div>
)

const SubHeading = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: '#57534E', letterSpacing: '0.06em' }}>
    {children}
  </h3>
)


// ── market dynamics ──────────────────────────────────────────────────────────

const DYNAMICS_TABS = [
  {
    key: 'drivers',
    label: 'Growth Drivers',
    dot: '#16a34a',
    bg: '#f0fdf4',
    border: '#bbf7d0',
    text: '#15803d',
    accentBar: '#22c55e',
  },
  {
    key: 'restraints',
    label: 'Restraints',
    dot: '#dc2626',
    bg: '#fff1f2',
    border: '#fecdd3',
    text: '#b91c1c',
    accentBar: '#f87171',
  },
  {
    key: 'opportunities',
    label: 'Opportunities',
    dot: '#111a4a',
    bg: 'rgba(17,26,74,0.05)',
    border: 'rgba(17,26,74,0.15)',
    text: '#111a4a',
    accentBar: '#111a4a',
  },
  {
    key: 'challenges',
    label: 'Challenges',
    dot: '#d97706',
    bg: '#fffbeb',
    border: '#fde68a',
    text: '#b45309',
    accentBar: '#fbbf24',
  },
] as const

type DynamicsKey = typeof DYNAMICS_TABS[number]['key']

function MarketDynamicsSection({ dynamics }: { dynamics: JsonReport['market_dynamics'] }) {
  const [active, setActive] = useState<DynamicsKey>('drivers')
  const tabInfo = DYNAMICS_TABS.find((t) => t.key === active)!
  const items = dynamics[active]

  return (
    <section className="mb-14">
      {/* Pill tabs */}
      <div className="flex flex-wrap gap-2 mb-5">
        {DYNAMICS_TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActive(tab.key)}
            className="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200"
            style={
              active === tab.key
                ? { background: tab.bg, color: tab.text, border: `1.5px solid ${tab.border}`, boxShadow: `0 0 0 3px ${tab.border}40` }
                : { background: '#F5F4F0', color: '#78716C', border: '1.5px solid #E7E5E4' }
            }
          >
            <span
              className="inline-block w-1.5 h-1.5 rounded-full mr-1.5"
              style={{ background: active === tab.key ? tab.dot : '#A8A29E', verticalAlign: 'middle', marginTop: '-2px' }}
            />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content panel */}
      <div
        className="rounded-xl p-5"
        style={{ background: tabInfo.bg, border: `1px solid ${tabInfo.border}`, borderLeft: `4px solid ${tabInfo.accentBar}` }}
      >
        {items.length === 0 ? (
          <p className="text-sm" style={{ color: tabInfo.text }}>No data available.</p>
        ) : (
          <ul className="space-y-3">
            {items.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm leading-relaxed" style={{ color: tabInfo.text }}>
                <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: tabInfo.accentBar }} />
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

// ── segmentation ─────────────────────────────────────────────────────────────

const SEGMENT_COLORS: Record<string, { dot: string; bg: string; border: string }> = {
  'By Component': { dot: '#111a4a', bg: 'rgba(17,26,74,0.05)', border: 'rgba(17,26,74,0.15)' },
  'By Type':      { dot: '#ec652b', bg: 'rgba(236,101,43,0.05)', border: 'rgba(236,101,43,0.18)' },
  'By Application': { dot: '#111a4a', bg: 'rgba(17,26,74,0.04)', border: 'rgba(17,26,74,0.12)' },
  'By End User':  { dot: '#d97706', bg: '#fffbeb', border: '#fde68a' },
}

function SegmentListCard({ title, items }: { title: string; items: string[] }) {
  const colors = SEGMENT_COLORS[title] ?? { dot: '#111a4a', bg: 'rgba(17,26,74,0.05)', border: 'rgba(17,26,74,0.15)' }
  return (
    <div
      className="rounded-xl p-4"
      style={{ background: colors.bg, border: `1px solid ${colors.border}` }}
    >
      <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: colors.dot }}>
        {title}
      </p>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2 text-sm text-[var(--foreground)]">
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: colors.dot }} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

function splitSegmentField(items: (SegmentItem | string)[]) {
  const segments = items.filter(
    (item): item is SegmentItem =>
      typeof item === 'object' && item !== null && 'market_share' in item
  )
  const strings = items.map((item) =>
    typeof item === 'string' ? item : (item as SegmentItem).name
  )
  return { segments, strings }
}

function MarketSegmentationSection({ segmentation }: { segmentation: JsonReport['market_segmentation'] }) {
  const comp = splitSegmentField(segmentation.by_component ?? [])
  const byType = splitSegmentField(segmentation.by_type ?? [])
  const byApp = splitSegmentField(segmentation.by_application ?? [])
  const byEnd = splitSegmentField(segmentation.by_end_user ?? [])

  return (
    <section className="mb-14">
      {comp.segments.length > 0 && (
        <div className="mb-8">
          <ComponentSharePieChart title="By Component" segments={comp.segments} />
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {comp.strings.length > 0 && comp.segments.length === 0 && (
          <SegmentListCard title="By Component" items={comp.strings} />
        )}
        {byType.strings.length > 0 && <SegmentListCard title="By Type" items={byType.strings} />}
        {byApp.strings.length > 0 && <SegmentListCard title="By Application" items={byApp.strings} />}
        {byEnd.strings.length > 0 && <SegmentListCard title="By End User" items={byEnd.strings} />}
      </div>
    </section>
  )
}

// ── country table ─────────────────────────────────────────────────────────────

function CountryTable({ countries }: { countries: JsonReport['country_analysis'] }) {
  if (!countries.length) return null
  const maxShare = Math.max(...countries.map((c) => c.market_share))

  return (
    <div className="mt-6">
      <SubHeading>Country-Level Analysis</SubHeading>
      <div className="rounded-xl overflow-hidden border border-[var(--border)]">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: '#F5F4F0' }}>
              <th className="text-left py-3 px-4 font-semibold text-[var(--foreground)] text-xs uppercase tracking-wider">Country</th>
              <th className="text-right py-3 px-4 font-semibold text-[var(--foreground)] text-xs uppercase tracking-wider">Share</th>
              <th className="text-right py-3 px-4 font-semibold text-[var(--foreground)] text-xs uppercase tracking-wider">Growth</th>
            </tr>
          </thead>
          <tbody>
            {countries.map((c, i) => (
              <tr key={i} className="border-t border-[var(--border)]" style={{ background: i % 2 === 0 ? '#fff' : '#FAFAF9' }}>
                <td className="py-3 px-4 text-[var(--foreground)] font-medium">{c.country}</td>
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <div className="w-20 h-1.5 rounded-full bg-[var(--border)]">
                      <div
                        className="h-1.5 rounded-full"
                        style={{ width: `${(c.market_share / maxShare) * 100}%`, background: '#111a4a' }}
                      />
                    </div>
                    <span className="font-semibold text-[var(--foreground)]">{c.market_share.toFixed(1)}%</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-right font-semibold" style={{ color: '#ec652b' }}>
                  +{c.growth_rate.toFixed(1)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ── regional analysis ─────────────────────────────────────────────────────────

function RegionalSection({ regions, countries }: { regions: JsonReport['regional_analysis']; countries: JsonReport['country_analysis'] }) {
  if (!regions.length) return null
  const maxShare = Math.max(...regions.map((r) => r.market_share))

  return (
    <section className="mb-14">
      <div className="space-y-3 mb-6">
        {regions.map((r, i) => (
          <div
            key={i}
            className="rounded-xl p-4"
            style={{ background: '#fff', border: '1px solid var(--border)' }}
          >
            <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <span
                  className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{ background: 'rgba(17,26,74,0.07)', color: '#111a4a' }}
                >
                  {i + 1}
                </span>
                <h4 className="font-semibold text-sm text-[var(--foreground)]">{r.region}</h4>
                {r.largest_country && (
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: '#F5F4F0', color: '#78716C', border: '1px solid #E7E5E4' }}>
                    Lead: {r.largest_country}
                  </span>
                )}
              </div>
              <div className="flex gap-4 text-xs">
                <span className="text-[var(--muted-foreground)]">
                  CAGR: <span className="font-bold" style={{ color: '#ec652b' }}>{r.growth_rate.toFixed(1)}%</span>
                </span>
                <span className="text-[var(--muted-foreground)]">
                  Share: <span className="font-bold text-[var(--foreground)]">{r.market_share.toFixed(1)}%</span>
                </span>
              </div>
            </div>

            {/* Share progress bar */}
            <div className="w-full h-1.5 rounded-full mb-3" style={{ background: '#F5F4F0' }}>
              <div
                className="h-1.5 rounded-full transition-all duration-700"
                style={{ width: `${(r.market_share / maxShare) * 100}%`, background: '#111a4a' }}
              />
            </div>

            {r.description && (
              <p className="text-xs leading-relaxed" style={{ color: '#78716C' }}>{r.description}</p>
            )}
          </div>
        ))}
      </div>
      <CountryTable countries={countries} />
    </section>
  )
}

// ── competitive landscape ─────────────────────────────────────────────────────

const POSITION_STYLE: Record<string, { bg: string; color: string; border: string }> = {
  Leader:     { bg: 'rgba(236,101,43,0.07)', color: '#ec652b', border: 'rgba(236,101,43,0.22)' },
  Challenger: { bg: 'rgba(17,26,74,0.06)', color: '#111a4a', border: 'rgba(17,26,74,0.16)' },
  Follower:   { bg: '#f6f6f8', color: '#7c7f88', border: '#e3e4e8' },
  Niche:      { bg: '#fffbeb', color: '#92400e', border: '#fde68a' },
}

function CompetitiveLandscapeSection({
  players,
  profiles,
}: {
  players: JsonReport['competitive_landscape']
  profiles: JsonReport['company_profiles']
}) {
  return (
    <section className="mb-14">
      <div className="grid gap-3">
        {players.map((p, i) => {
          const profile = profiles.find((pr) => pr.company === p.company)
          const posStyle = POSITION_STYLE[p.market_position ?? ''] ?? POSITION_STYLE.Follower

          return (
            <div
              key={i}
              className="rounded-xl p-5"
              style={{ background: '#fff', border: '1px solid var(--border)', transition: 'box-shadow 0.2s' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(17,26,74,0.10)' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = 'none' }}
            >
              <div className="flex items-start justify-between flex-wrap gap-3 mb-3">
                <div className="flex items-center gap-3">
                  {/* Company initial avatar */}
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0"
                    style={{ background: 'rgba(17,26,74,0.07)', color: '#111a4a' }}
                  >
                    {p.company.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-[var(--foreground)]">{p.company}</h4>
                    {p.headquarters && (
                      <p className="text-xs" style={{ color: '#78716C' }}>{p.headquarters}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {p.market_position && (
                    <span
                      className="text-xs px-2.5 py-1 rounded-full font-medium"
                      style={{ background: posStyle.bg, color: posStyle.color, border: `1px solid ${posStyle.border}` }}
                    >
                      {p.market_position}
                    </span>
                  )}
                  {profile?.revenue && (
                    <span className="text-xs font-semibold" style={{ color: '#ec652b' }}>
                      {profile.revenue}
                    </span>
                  )}
                </div>
              </div>

              {p.description && (
                <p className="text-xs leading-relaxed mb-3" style={{ color: '#57534E' }}>
                  {p.description}
                </p>
              )}

              {profile?.ai_healthcare_products && profile.ai_healthcare_products.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {profile.ai_healthcare_products.map((prod, j) => (
                    <span
                      key={j}
                      className="text-xs px-2 py-0.5 rounded-md"
                      style={{ background: '#F5F4F0', color: '#57534E', border: '1px solid #E7E5E4' }}
                    >
                      {prod}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}

// ── recent developments ───────────────────────────────────────────────────────

function RecentDevelopmentsSection({ developments }: { developments: JsonReport['recent_developments'] }) {
  const sorted = [...developments].sort((a, b) => b.year - a.year)

  return (
    <section className="mb-14">
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[18px] top-0 bottom-0 w-px" style={{ background: '#111a4a' }} />

        <div className="space-y-6">
          {sorted.map((d, i) => (
            <div key={i} className="flex gap-5">
              {/* Year bubble */}
              <div className="flex-shrink-0 flex flex-col items-center">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold z-10"
                  style={{ background: i === 0 ? '#111a4a' : 'rgba(17,26,74,0.06)', color: i === 0 ? '#fff' : '#111a4a', border: `2px solid ${i === 0 ? '#111a4a' : 'rgba(17,26,74,0.20)'}` }}
                >
                  {String(d.year).slice(2)}
                </div>
              </div>

              {/* Content card */}
              <div
                className="flex-1 rounded-xl p-4 mb-1"
                style={{ background: '#fff', border: '1px solid var(--border)' }}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-bold" style={{ color: '#111a4a' }}>{d.year}</span>
                  <span className="text-xs font-semibold text-[var(--foreground)]">{d.company}</span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: '#57534E' }}>{d.event}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── regulatory landscape ──────────────────────────────────────────────────────

function RegulatorySection({ items }: { items: string[] }) {
  if (!items.length) return null

  return (
    <section className="mb-14">
      <div className="flex flex-wrap gap-2">
        {items.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium"
            style={{ background: '#F5F4F0', color: '#1C1917', border: '1px solid #D6D3D1' }}
          >
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#111a4a' }} />
            {item}
          </span>
        ))}
      </div>
    </section>
  )
}

// ── FAQs ──────────────────────────────────────────────────────────────────────

function JsonFAQSection({ faqs }: { faqs: JsonReport['faqs'] }) {
  const [open, setOpen] = useState<number | null>(null)
  if (!faqs.length) return null

  return (
    <section className="mb-14">
      <div className="space-y-2">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="rounded-xl overflow-hidden"
            style={{ border: '1px solid var(--border)' }}
          >
            <button
              className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors"
              style={{ background: open === i ? 'rgba(17,26,74,0.04)' : '#fff' }}
              onClick={() => setOpen(open === i ? null : i)}
            >
              <span className="font-medium text-sm text-[var(--foreground)] pr-4">{faq.question}</span>
              <span
                className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-sm font-bold transition-transform duration-200"
                style={{
                  background: open === i ? '#111a4a' : '#f6f6f8',
                  color: open === i ? '#fff' : '#7c7f88',
                  transform: open === i ? 'rotate(45deg)' : 'none',
                }}
              >
                +
              </span>
            </button>
            <div
              className="overflow-hidden transition-all duration-300"
              style={{ maxHeight: open === i ? '500px' : '0', opacity: open === i ? 1 : 0 }}
            >
              <div
                className="px-5 pb-4 pt-3 text-sm leading-relaxed"
                style={{ color: '#57534E', background: '#FAFAF9', borderTop: '1px solid #E7E5E4' }}
              >
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ── executive summary ─────────────────────────────────────────────────────────

function ExecutiveSummarySection({ summary }: { summary: string }) {
  const paragraphs = summary.split('\n\n').filter(Boolean)
  return (
    <div
      className="rounded-2xl overflow-hidden mb-10"
      style={{ border: '1px solid #e3e4e8', background: '#ffffff' }}
    >
      {/* <div
        className="flex items-center gap-3 px-6 py-4"
        style={{ background: 'linear-gradient(90deg, #111a4a 0%, #1a2566 100%)' }}
      >
        <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 20 20" fill="none">
          <path d="M3 5h14M3 10h9M3 15h6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        <span className="text-sm font-semibold uppercase tracking-widest text-white opacity-90">
          Executive Summary
        </span>
      </div> */}
      <div className="px-6 py-6 space-y-4">
        {paragraphs.map((para, i) => (
          <p
            key={i}
            className="text-base leading-[1.8]"
            style={{ color: i === 0 ? '#011821' : '#44403C', fontWeight: i === 0 ? 500 : 400 }}
          >
            {para}
          </p>
        ))}
      </div>
    </div>
  )
}

// ── key highlights ─────────────────────────────────────────────────────────────

function KeyHighlightsSection({ highlights }: { highlights: string[] }) {
  if (!highlights.length) return null
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
      {highlights.map((highlight, i) => {
        const colonIdx = highlight.indexOf(':')
        const label = colonIdx > -1 ? highlight.slice(0, colonIdx) : null
        const body = colonIdx > -1 ? highlight.slice(colonIdx + 1).trim() : highlight
        return (
          <div
            key={i}
            className="rounded-xl p-4 flex gap-3"
            style={{ background: '#fff', border: '1px solid var(--border)' }}
          >
            <div
              className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mt-0.5"
              style={{ background: 'rgba(17,26,74,0.07)', color: '#111a4a', border: '1px solid rgba(17,26,74,0.16)' }}
            >
              {i + 1}
            </div>
            <div>
              {label && (
                <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: '#111a4a' }}>
                  {label}
                </p>
              )}
              <p className="text-sm leading-relaxed" style={{ color: '#44403C' }}>{body}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ── market context ─────────────────────────────────────────────────────────────

function MarketContextBlock({ context }: { context: string }) {
  return (
    <div
      className="rounded-xl p-5 mb-6"
      style={{ background: '#FAFAF9', border: '1px solid #E7E5E4', borderLeft: '4px solid #78716C' }}
    >
      <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#78716C' }}>Market Context</p>
      <p className="text-sm leading-[1.85]" style={{ color: '#44403C' }}>{context}</p>
    </div>
  )
}

// ── forecast analysis ─────────────────────────────────────────────────────────

function ForecastAnalysisBlock({ analysis }: { analysis: string }) {
  return (
    <div
      className="rounded-xl p-5 mb-6"
      style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderLeft: '4px solid #16A34A' }}
    >
      <div className="flex items-center gap-2 mb-2">
        <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 16 16" fill="none">
          <path d="M2 12l4-6 3 4 3-5 2 7" stroke="#16A34A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#15803D' }}>Forecast Analysis</span>
      </div>
      <p className="text-sm leading-[1.85]" style={{ color: '#166534' }}>{analysis}</p>
    </div>
  )
}

// ── reader takeaways ─────────────────────────────────────────────────────────

function ReaderTakeawaysSection({ takeaways }: { takeaways: string[] }) {
  if (!takeaways.length) return null
  const dotColors = ['#111a4a', '#16A34A', '#D97706', '#DC2626', '#ec652b']
  return (
    <section className="mb-14">
      <div className="space-y-2">
        {takeaways.map((item, i) => {
          const colonIdx = item.indexOf(':')
          const audience = colonIdx > -1 ? item.slice(0, colonIdx) : null
          const insight = colonIdx > -1 ? item.slice(colonIdx + 1).trim() : item
          const color = dotColors[i % dotColors.length]
          return (
            <div
              key={i}
              className="rounded-xl p-4 flex gap-3"
              style={{ background: '#fff', border: '1px solid var(--border)', borderLeft: `3px solid ${color}` }}
            >
              <div className="flex-shrink-0 w-2 h-2 rounded-full mt-2" style={{ background: color }} />
              <div>
                {audience && (
                  <span
                    className="inline-block text-xs font-bold uppercase tracking-wide mb-1 px-2 py-0.5 rounded-md"
                    style={{ background: `${color}18`, color }}
                  >
                    {audience}
                  </span>
                )}
                <p className="text-sm leading-relaxed" style={{ color: '#44403C' }}>{insight}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

// ── main export ───────────────────────────────────────────────────────────────

export function JsonReportSections({ report }: JsonReportSectionsProps) {
  resetSectionIndex()

  const forecastStart = report.forecast_period.split('-')[0]
  const forecastEnd = report.forecast_period.split('-')[1]

  const baseYearPoint = report.market_forecast.find(
    (p) => p.year === report.base_year || p.year === parseInt(forecastStart)
  )
  const displayCurrentValue = baseYearPoint?.value ?? report.market_size.current_value

  return (
    <div>
      {/* ── Executive Summary ── */}
      {report.executive_summary && (
        <section className="mb-14">
          <SectionHeading id="executive-summary" num={nextSection()}>Executive Summary</SectionHeading>
          <ExecutiveSummarySection summary={report.executive_summary} />
        </section>
      )}

      {/* ── Key Highlights ── */}
      {report.key_highlights && report.key_highlights.length > 0 && (
        <section className="mb-14">
          <SectionHeading id="key-highlights" num={nextSection()}>Key Highlights</SectionHeading>
          <KeyHighlightsSection highlights={report.key_highlights} />
        </section>
      )}

      {/* ── Market Overview ── */}
      <section className="mb-14">
        <SectionHeading id="json-overview" num={nextSection()}>Market Overview</SectionHeading>

        {report.market_context && <MarketContextBlock context={report.market_context} />}

        <blockquote
          className="rounded-xl p-5 mb-6 text-base leading-relaxed"
          style={{ background: 'rgba(17,26,74,0.04)', borderLeft: '4px solid #111a4a', color: '#011821', fontStyle: 'normal' }}
        >
          {report.market_overview.summary}
        </blockquote>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {[
            { label: 'Market Stage', value: report.market_overview.market_stage },
            { label: 'Adoption Level', value: report.market_overview.adoption_level },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="rounded-xl p-4 flex items-start gap-3"
              style={{ background: '#fff', border: '1px solid var(--border)' }}
            >
              <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: '#111a4a' }} />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: '#78716C' }}>
                  {label}
                </p>
                <p className="font-semibold text-[var(--foreground)]">{value}</p>
              </div>
            </div>
          ))}
        </div>

        {report.market_overview.key_trends.length > 0 && (
          <>
            <SubHeading>Key Trends</SubHeading>
            <div className="flex flex-wrap gap-2">
              {report.market_overview.key_trends.map((trend, i) => (
                <span
                  key={i}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm"
                  style={{ background: '#F5F4F0', color: '#1C1917', border: '1px solid #D6D3D1' }}
                >
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#111a4a' }} />
                  {trend}
                </span>
              ))}
            </div>
          </>
        )}
      </section>


      {/* ── Charts ── */}
      <section className="mb-14">
        <SectionHeading id="charts" num={nextSection()}>Market Forecast & Data</SectionHeading>
        <div className="space-y-6">
          {report.market_forecast.length > 0 && (
            <MarketForecastLineChart
              data={report.market_forecast}
              baseYear={report.base_year}
              forecastPeriod={report.forecast_period}
              currentValue={displayCurrentValue}
              forecastValue={report.market_size.forecast_value}
              cagr={report.market_size.cagr}
              unit={report.unit}
              currency={report.currency}
            />
          )}
          {report.forecast_analysis && <ForecastAnalysisBlock analysis={report.forecast_analysis} />}
          <div className="grid grid-cols-1 gap-6">
            {(report.market_segmentation.by_component ?? []).some(
              (item): item is SegmentItem =>
                typeof item === 'object' && item !== null && 'market_share' in item
            ) && (
              <ComponentSharePieChart
                title="Market Share by Component"
                segments={(report.market_segmentation.by_component ?? []).filter(
                  (item): item is SegmentItem =>
                    typeof item === 'object' && item !== null && 'market_share' in item
                )}
              />
            )}
            {report.regional_analysis.length > 0 && (
              <RegionalBarChart regions={report.regional_analysis} />
            )}
          </div>
        </div>
      </section>


      {/* ── Market Dynamics ── */}
      <section className="mb-14">
        <SectionHeading id="market-dynamics" num={nextSection()}>Market Dynamics</SectionHeading>
        <MarketDynamicsSection dynamics={report.market_dynamics} />
      </section>


      {/* ── Segmentation ── */}
      <section className="mb-14">
        <SectionHeading id="segmentation" num={nextSection()}>Market Segmentation</SectionHeading>
        <MarketSegmentationSection segmentation={report.market_segmentation} />
      </section>


      {/* ── Regional + Country ── */}
      {report.regional_analysis.length > 0 && (
        <section className="mb-14">
          <SectionHeading id="regional" num={nextSection()}>Regional Analysis</SectionHeading>
          <RegionalSection regions={report.regional_analysis} countries={report.country_analysis} />
        </section>
      )}

      {/* ── Competitive Landscape ── */}
      {report.competitive_landscape.length > 0 && (
        <section className="mb-14">
          <SectionHeading id="competitive" num={nextSection()}>Competitive Landscape</SectionHeading>
          <CompetitiveLandscapeSection
            players={report.competitive_landscape}
            profiles={report.company_profiles}
          />
        </section>
      )}

      {/* ── Recent Developments ── */}
      {report.recent_developments.length > 0 && (
        <section className="mb-14">
          <SectionHeading id="developments" num={nextSection()}>Recent Developments</SectionHeading>
          <RecentDevelopmentsSection developments={report.recent_developments} />
        </section>
      )}

      {/* ── Regulatory ── */}
      {report.regulatory_landscape.length > 0 && (
        <section className="mb-14">
          <SectionHeading id="regulatory" num={nextSection()}>Regulatory Landscape</SectionHeading>
          <RegulatorySection items={report.regulatory_landscape} />
        </section>
      )}

      {/* ── Reader Takeaways ── */}
      {report.reader_takeaways && report.reader_takeaways.length > 0 && (
        <section className="mb-14">
          <SectionHeading id="takeaways" num={nextSection()}>Strategic Takeaways</SectionHeading>
          <ReaderTakeawaysSection takeaways={report.reader_takeaways} />
        </section>
      )}

      {/* ── FAQs ── */}
      {report.faqs.length > 0 && (
        <section className="mb-14">
          <SectionHeading id="faq" num={nextSection()}>Frequently Asked Questions</SectionHeading>
          <JsonFAQSection faqs={report.faqs} />
        </section>
      )}
    </div>
  )
}
