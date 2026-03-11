import Link from 'next/link';
import type { PressRelease } from '@/lib/api/press-releases.types';

interface PressReleaseListCardProps {
  pressRelease: PressRelease;
}

export default function PressReleaseListCard({ pressRelease }: PressReleaseListCardProps) {
  let formattedDate = '';
  try {
    if (pressRelease.date) {
      const d = new Date(pressRelease.date);
      if (!isNaN(d.getTime())) {
        formattedDate = d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      }
    }
  } catch {
    formattedDate = pressRelease.date || '';
  }

  return (
    <Link href={`/press-releases/${pressRelease.slug}`} className="group block">
      <article
        className="relative py-6 pl-5 -ml-5 border-b border-slate-100
          before:absolute before:left-0 before:top-4 before:bottom-4 before:w-[3px]
          before:rounded-full before:bg-transparent before:transition-all before:duration-300
          group-hover:before:bg-[#2563A3]"
      >
        {/* Category + Date */}
        <div className="flex items-center gap-2.5 mb-2">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#2563A3]">
            {pressRelease.category}
          </span>
          {formattedDate && (
            <>
              <span className="text-slate-300 text-xs">·</span>
              <time className="text-xs text-slate-400">{formattedDate}</time>
            </>
          )}
        </div>

        {/* Title */}
        <h3 className="text-[17px] font-bold text-slate-800 leading-snug mb-2
          group-hover:text-[#2563A3] transition-colors duration-200">
          {pressRelease.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 mb-3">
          {pressRelease.excerpt}
        </p>

        {/* Footer row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span>{pressRelease.author}</span>
            {pressRelease.readTime && (
              <>
                <span className="text-slate-200">|</span>
                <span>{pressRelease.readTime}</span>
              </>
            )}
            {pressRelease.location && (
              <>
                <span className="text-slate-200">|</span>
                <span>{pressRelease.location}</span>
              </>
            )}
          </div>

          <span className="text-xs font-semibold text-[#2563A3] flex items-center gap-1
            opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0
            transition-all duration-200">
            Read More
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </article>
    </Link>
  );
}
