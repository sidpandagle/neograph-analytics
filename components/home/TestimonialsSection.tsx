'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import testimonialsData from '@/data/testimonials.json';

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  role: string;
  company: string;
  location: string;
  rating: number;
}

const testimonials: Testimonial[] = testimonialsData;
const ITEMS_PER_SLIDE = 3;

function getInitials(company: string): string {
  return company
    .split(' ')
    .filter((w) => w.length > 0 && !['of', 'the', 'and'].includes(w.toLowerCase()))
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function StarRating({ rating, onBlue = false }: { rating: number; onBlue?: boolean }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className="h-3.5 w-3.5"
          fill="currentColor"
          viewBox="0 0 20 20"
          style={{
            color: i < rating
              ? onBlue ? 'var(--cmi-sky)' : 'var(--cmi-primary)'
              : onBlue ? 'rgba(255,255,255,0.25)' : 'var(--cmi-base)',
          }}
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = Math.ceil(testimonials.length / ITEMS_PER_SLIDE);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);

  const currentTestimonials = testimonials.slice(
    currentIndex * ITEMS_PER_SLIDE,
    (currentIndex + 1) * ITEMS_PER_SLIDE
  );

  const [featured, ...secondary] = currentTestimonials;

  return (
    <section className="flex flex-col gap-6.5 rounded-panel bg-white p-7 md:p-11">
      <div className="flex flex-col items-center gap-2.5 text-center">
        <span className="eyebrow">Client stories</span>
        <h2 className="text-[26px] md:text-[34px]">Trusted by industry leaders</h2>
        <p className="max-w-[620px] text-[15px] leading-[1.6] text-[var(--cmi-body)]">
          What healthcare executives and research teams say about working with NeoGraph.
        </p>
      </div>

      <div className="grid gap-[18px] lg:grid-cols-12">
        {/* Featured quote takes the blue — emphasis follows the primary. */}
        {featured && (
          <figure className="flex flex-col rounded-card bg-[var(--cmi-primary)] p-6.5 md:p-8 lg:col-span-7">
            <StarRating rating={featured.rating} onBlue />
            <blockquote className="my-6 flex-1 text-[18px] leading-[1.55] text-white md:text-[20px]">
              &ldquo;{featured.quote}&rdquo;
            </blockquote>
            <figcaption className="flex items-center gap-3.5 border-t border-[var(--cmi-primary-line)] pt-5">
              <div className="num flex h-11 w-11 shrink-0 items-center justify-center rounded-pill bg-[var(--cmi-primary-raised)] text-[13px] text-white">
                {getInitials(featured.company)}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white">{featured.role}</p>
                <p className="mt-0.5 truncate text-xs text-[var(--cmi-on-blue-dim)]">
                  {featured.company} &middot; {featured.location}
                </p>
              </div>
            </figcaption>
          </figure>
        )}

        <div className="flex flex-col gap-[18px] lg:col-span-5">
          {secondary.map((testimonial) => (
            <figure
              key={testimonial.id}
              className="flex flex-1 flex-col rounded-card border border-[var(--cmi-line)] p-6"
            >
              <StarRating rating={testimonial.rating} />
              <blockquote className="my-4 flex-1 text-sm leading-[1.7] text-[var(--cmi-body)]">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <figcaption className="flex items-center gap-3 border-t border-[var(--cmi-line)] pt-4">
                <div className="num flex h-9 w-9 shrink-0 items-center justify-center rounded-pill bg-[var(--cmi-surface)] text-[11px] text-[var(--cmi-primary)]">
                  {getInitials(testimonial.company)}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-xs font-semibold text-[var(--cmi-ink)]">{testimonial.role}</p>
                  <p className="mt-0.5 truncate text-[11px] text-[var(--cmi-meta)]">
                    {testimonial.company} &middot; {testimonial.location}
                  </p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {/* Pager */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={prevSlide}
          className="flex h-10 w-10 items-center justify-center rounded-pill border border-[var(--cmi-line)] text-[var(--cmi-body)] transition-colors hover:border-[var(--cmi-primary)] hover:text-[var(--cmi-primary)]"
          aria-label="Previous testimonials"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <div className="flex gap-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className="h-1.5 rounded-pill transition-all duration-300"
              style={{
                width: index === currentIndex ? '2rem' : '0.375rem',
                backgroundColor: index === currentIndex ? 'var(--cmi-primary)' : 'var(--cmi-base)',
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="flex h-10 w-10 items-center justify-center rounded-pill border border-[var(--cmi-line)] text-[var(--cmi-body)] transition-colors hover:border-[var(--cmi-primary)] hover:text-[var(--cmi-primary)]"
          aria-label="Next testimonials"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}
