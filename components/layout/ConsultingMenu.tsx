"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ConsultingService, ServiceCategory } from "@/lib/api/consulting.types";

interface ConsultingMenuProps {
  services: ConsultingService[];
  isActive: boolean;
}

export default function ConsultingMenu({ services, isActive }: ConsultingMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Group services by category
  const servicesByCategory = services.reduce((acc, service) => {
    const category = service.category as ServiceCategory;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(service);
    return acc;
  }, {} as Record<ServiceCategory, ConsultingService[]>);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Event handlers
  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsOpen(true), 150);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsOpen(false), 200);
  };

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
      triggerRef.current?.focus();
    } else if (
      (e.key === "Enter" || e.key === " ") &&
      e.target === triggerRef.current
    ) {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  return (
    <div
      className="relative"
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
    >
      {/* Trigger Button */}
      <button
        ref={triggerRef}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        className={cn(
          "text-sm font-medium transition-colors relative pb-0.5",
          "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-[var(--accent)] after:transition-all after:duration-200",
          "flex items-center gap-1 cursor-pointer whitespace-nowrap",
          isActive
            ? "text-[var(--foreground)] after:w-full"
            : "text-[var(--muted-foreground)] after:w-0 hover:text-[var(--foreground)] hover:after:w-full"
        )}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label="Browse services"
      >
        Consulting
        <svg
          className={cn(
            "w-4 h-4 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Backdrop Overlay - only on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 top-[64px]"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mega Menu Panel */}
      <div
        className={cn(
          "fixed left-0 right-0 z-50",
          "lg:top-[62px]",
          "bg-[var(--card)] theme-shadow border-t-2 border-t-[var(--accent)]",
          "transition-all duration-300 ease-out",
          "max-h-[calc(100vh-62px)] overflow-y-auto",
          isOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-2 pointer-events-none"
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        role="menu"
        aria-label="Services"
        aria-hidden={!isOpen}
        style={{
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <div className="p-6 max-w-7xl mx-auto">
          {/* Header row */}
          <div className="mb-4 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--muted-foreground)' }}>Our Services</span>
            <Link
              href="/services"
              onClick={() => setIsOpen(false)}
              className="text-xs font-semibold hover:underline underline-offset-4 transition-colors"
              style={{ color: 'var(--accent)' }}
              role="menuitem"
              tabIndex={isOpen ? 0 : -1}
            >
              View all services →
            </Link>
          </div>

          {/* Services by Category */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {Object.entries(servicesByCategory).map(([category, categoryServices]) => (
              <div key={category} className="space-y-2">
                <h3 className="text-xs font-semibold uppercase tracking-widest pb-1 border-b" style={{ color: 'var(--muted-foreground)', borderColor: 'var(--border)' }}>
                  {category}
                </h3>
                <div className="space-y-1">
                  {categoryServices.map((service) => (
                    <Link
                      key={service.id}
                      href={`/consulting/${service.slug}`}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "group block p-3 rounded-md",
                        "border-l-2 border-l-transparent",
                        "transition-all duration-200",
                        "focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
                      )}
                      style={{ backgroundColor: 'var(--muted)' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderLeftColor = 'var(--accent)'; (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--card)'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderLeftColor = 'transparent'; (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--muted)'; }}
                      role="menuitem"
                      tabIndex={isOpen ? 0 : -1}
                    >
                      <h4 className="font-semibold text-sm mb-0.5 transition-colors" style={{ color: 'var(--foreground)' }}>
                        {service.title}
                      </h4>
                      <p className="text-xs line-clamp-2 leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
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
    </div>
  );
}
