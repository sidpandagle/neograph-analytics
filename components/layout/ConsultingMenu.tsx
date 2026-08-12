"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ConsultingService, ServiceCategory } from "@/lib/api/consulting.types";

interface ConsultingMenuProps {
  services: ConsultingService[];
  isActive: boolean;
}

/** Services dropdown, grouped by practice area. */
export default function ConsultingMenu({ services, isActive }: ConsultingMenuProps) {
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

  const servicesByCategory = services.reduce((acc, service) => {
    const category = service.category as ServiceCategory;
    if (!acc[category]) acc[category] = [];
    acc[category].push(service);
    return acc;
  }, {} as Record<ServiceCategory, ConsultingService[]>);

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
        Consulting
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
          "absolute left-1/2 top-[calc(100%+20px)] z-50 w-[min(940px,88vw)] -translate-x-1/2",
          "max-h-[70vh] overflow-y-auto rounded-panel border border-[var(--cmi-line)] bg-white p-7 shadow-panel",
          "transition-[opacity,transform] duration-200 ease-out",
          isOpen
            ? "visible translate-y-0 opacity-100"
            : "pointer-events-none invisible -translate-y-1.5 opacity-0"
        )}
        role="menu"
        aria-label="Services"
        aria-hidden={!isOpen}
      >
        <div className="mb-4 flex items-center justify-between">
          <span className="eyebrow-muted">Our services</span>
          <Link
            href="/services"
            onClick={() => setIsOpen(false)}
            className="text-[13.5px] font-semibold text-[var(--cmi-primary)]"
            role="menuitem"
            tabIndex={isOpen ? 0 : -1}
          >
            View all services →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {Object.entries(servicesByCategory).map(([category, categoryServices]) => (
            <div key={category} className="space-y-2.5">
              <h3 className="eyebrow-muted border-b border-[var(--cmi-line)] pb-2">
                {category}
              </h3>
              <div className="space-y-2">
                {categoryServices.map((service) => (
                  <Link
                    key={service.id}
                    href={`/consulting/${service.slug}`}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "block rounded-tile border border-transparent bg-[var(--cmi-surface)] p-3.5",
                      "transition-colors duration-150 hover:border-[var(--cmi-primary)] hover:bg-white"
                    )}
                    role="menuitem"
                    tabIndex={isOpen ? 0 : -1}
                  >
                    <h4 className="font-display text-[14.5px] font-semibold text-[var(--cmi-ink)]">
                      {service.title}
                    </h4>
                    <p className="mt-0.5 line-clamp-2 text-[12.5px] leading-[1.5] text-[var(--cmi-body)]">
                      {service.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
