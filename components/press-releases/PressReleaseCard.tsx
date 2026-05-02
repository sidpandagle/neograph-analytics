import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface PressReleaseCardProps {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  location?: string;
}

export function PressReleaseCard({
  slug,
  title,
  excerpt,
  category,
  author,
  date,
  readTime,
  location,
}: PressReleaseCardProps) {
  return (
    <Link href={`/press-releases/${slug}`} className="group flex flex-col h-full">
      <div className="flex flex-col h-full theme-card border rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200">
        {/* Accent stripe — amber for press releases to differentiate from blog */}
        <div className="h-[3px] bg-[var(--accent)] shrink-0" />

        <div className="flex flex-col flex-1 p-6">
          {/* Category badge */}
          <div className="mb-4">
            <span className="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full theme-accent-chip">
              {category}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-base font-semibold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors line-clamp-2 leading-snug mb-3">
            {title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-[var(--muted-foreground)] line-clamp-3 flex-1 leading-relaxed">
            {excerpt}
          </p>

          {/* Footer */}
          <div className="mt-5 pt-4 border-t border-[var(--border)] flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-semibold text-[var(--foreground)] truncate">{author}</p>
              <div className="flex items-center gap-1.5 text-xs text-[var(--muted-foreground)] mt-0.5">
                <span>{readTime}</span>
                <span>·</span>
                <time>{date}</time>
                {location && (
                  <>
                    <span>·</span>
                    <span className="truncate">{location}</span>
                  </>
                )}
              </div>
            </div>
            <span className="text-[var(--accent)] shrink-0">
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
