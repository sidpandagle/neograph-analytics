"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
}

interface MegaMenuProps {
  categories: Category[];
  isActive: boolean;
}

/**
 * Reports dropdown. Renders as a rail item whose panel drops onto the
 * desk below the header — a card, not a full-bleed bar.
 */
export default function MegaMenu({ categories, isActive }: MegaMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const onMouseDown = (e: MouseEvent) => {
      if (containerRef.current?.contains(e.target as Node)) return;
      setIsOpen(false);
    };
    const onFocusOut = (e: FocusEvent) => {
      if (containerRef.current?.contains(e.relatedTarget as Node)) return;
      setIsOpen(false);
    };

    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("focusout", onFocusOut);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("focusout", onFocusOut);
    };
  }, [isOpen]);

  const scheduleClose = () => {
    hoverTimeout.current = setTimeout(() => setIsOpen(false), 160);
  };
  const cancelClose = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
      triggerRef.current?.focus();
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseLeave={scheduleClose}
      onMouseEnter={cancelClose}
      onKeyDown={handleKeyDown}
    >
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-1 whitespace-nowrap rounded-pill px-4 py-2 text-sm transition-colors duration-150",
          isActive || isOpen
            ? "bg-white font-semibold text-[var(--cmi-ink)]"
            : "font-medium text-[var(--cmi-idle)] hover:bg-white hover:text-[var(--cmi-ink)]"
        )}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        Reports
        <svg
          className={cn("h-3.5 w-3.5 transition-transform duration-200", isOpen && "rotate-180")}
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div
        className={cn(
          "absolute left-1/2 top-[calc(100%+20px)] z-50 w-[min(920px,88vw)] -translate-x-1/2",
          "rounded-panel border border-[var(--cmi-line)] bg-white p-7 shadow-panel",
          "transition-[opacity,transform] duration-200 ease-out",
          isOpen
            ? "visible translate-y-0 opacity-100"
            : "pointer-events-none invisible -translate-y-1.5 opacity-0"
        )}
        role="menu"
        aria-label="Report categories"
        aria-hidden={!isOpen}
      >
        <div className="mb-4 flex items-center justify-between">
          <span className="eyebrow-muted">Browse by industry</span>
          <Link
            href="/reports"
            onClick={() => setIsOpen(false)}
            className="text-[13.5px] font-semibold text-[var(--cmi-primary)]"
          >
            View all reports →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/reports?category=${category.slug}`}
              onClick={() => setIsOpen(false)}
              className={cn(
                "group block rounded-tile border border-transparent bg-[var(--cmi-surface)] p-4",
                "transition-colors duration-150 hover:border-[var(--cmi-primary)] hover:bg-white"
              )}
              role="menuitem"
              tabIndex={isOpen ? 0 : -1}
            >
              <h3 className="font-display text-[15px] font-semibold text-[var(--cmi-ink)]">
                {category.name}
              </h3>
              <p className="mt-1 line-clamp-2 text-[12.5px] leading-[1.5] text-[var(--cmi-body)]">
                {category.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
