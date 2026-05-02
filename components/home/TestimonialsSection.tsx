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

function StarRating({ rating, dark = false }: { rating: number; dark?: boolean }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className="w-3.5 h-3.5"
          fill="currentColor"
          viewBox="0 0 20 20"
          style={{ color: i < rating ? '#ec652b' : dark ? 'rgba(255,255,255,0.12)' : '#e3e4e8' }}
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

const cardShadow = 'rgba(17, 26, 74, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px';

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
    <section className="py-24 relative overflow-hidden" style={{ backgroundColor: '#f6f6f8' }}>

      <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

        {/* Section header */}
        <div className="text-center space-y-3 mb-14">
          <span
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full border"
            style={{ color: '#111a4a', backgroundColor: 'rgba(17,26,74,0.05)', borderColor: 'rgba(17,26,74,0.12)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: '#ec652b' }} />
            Client Stories
          </span>
          <h2
            className="text-3xl md:text-[2.6rem] lg:text-5xl tracking-[-0.03em] leading-[1.08]"
            style={{ color: '#011821' }}
          >
            Trusted by Industry Leaders
          </h2>
          <p className="text-base max-w-2xl mx-auto leading-relaxed" style={{ color: '#7c7f88' }}>
            What healthcare executives and research teams say about NeoGraph Analytics.
          </p>
        </div>

        {/* Featured + secondary */}
        <div className="grid lg:grid-cols-12 gap-6">

          {/* Featured */}
          {featured && (
            <div
              className="lg:col-span-7 relative bg-white border rounded-2xl p-8 md:p-10 overflow-hidden flex flex-col"
              style={{ borderColor: '#e3e4e8', boxShadow: cardShadow }}
            >
              {/* Top accent */}
              <div className="absolute inset-x-0 top-0 h-[2px] rounded-t-2xl" style={{ backgroundColor: '#ec652b' }} />

              {/* Quote mark */}
              <svg
                className="w-16 h-16 mb-5 shrink-0"
                fill="currentColor"
                viewBox="0 0 32 32"
                style={{ color: 'rgba(17,26,74,0.10)' }}
                aria-hidden="true"
              >
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>

              <p
                className="italic text-lg md:text-xl leading-[1.80] flex-1 mb-8"
                style={{ color: '#232730', fontStyle: 'italic' }}
              >
                &ldquo;{featured.quote}&rdquo;
              </p>

              <StarRating rating={featured.rating} />

              <div className="flex items-center gap-4 mt-6 pt-6 border-t" style={{ borderColor: '#f0f1f3' }}>
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                  style={{ background: '#111a4a' }}
                >
                  {getInitials(featured.company)}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold" style={{ color: '#011821' }}>{featured.role}</p>
                  <p className="text-xs mt-0.5" style={{ color: '#7c7f88' }}>
                    {featured.company} &middot; {featured.location}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Secondary */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {secondary.map((testimonial) => (
              <div
                key={testimonial.id}
                className="flex-1 bg-white border rounded-2xl p-6 overflow-hidden relative flex flex-col"
                style={{ borderColor: '#e3e4e8', boxShadow: cardShadow }}
              >
                <div className="absolute inset-x-0 top-0 h-[2px] rounded-t-2xl" style={{ backgroundColor: '#111a4a', opacity: 0.5 }} />

                <div className="flex items-start justify-between mb-4">
                  <StarRating rating={testimonial.rating} />
                  <svg
                    className="w-7 h-7 shrink-0"
                    fill="currentColor"
                    viewBox="0 0 32 32"
                    style={{ color: '#e3e4e8' }}
                    aria-hidden="true"
                  >
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                </div>

                <p className="italic text-sm leading-[1.82] flex-1 mb-5" style={{ color: '#7c7f88' }}>
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                <div className="flex items-center gap-3 pt-4 border-t" style={{ borderColor: '#f0f1f3' }}>
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                    style={{ background: '#111a4a' }}
                  >
                    {getInitials(testimonial.company)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold truncate" style={{ color: '#011821' }}>{testimonial.role}</p>
                    <p className="text-[11px] truncate mt-0.5" style={{ color: '#7c7f88' }}>
                      {testimonial.company} &middot; {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-12">
          <button
            onClick={prevSlide}
            className="w-10 h-10 rounded-full border bg-white flex items-center justify-center transition-all duration-200"
            style={{ borderColor: '#e3e4e8', color: '#7c7f88', boxShadow: cardShadow }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#ec652b'; (e.currentTarget as HTMLElement).style.color = '#ec652b'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#e3e4e8'; (e.currentTarget as HTMLElement).style.color = '#7c7f88'; }}
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex gap-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: index === currentIndex ? '2rem' : '0.375rem',
                  backgroundColor: index === currentIndex ? '#ec652b' : '#e3e4e8',
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="w-10 h-10 rounded-full border bg-white flex items-center justify-center transition-all duration-200"
            style={{ borderColor: '#e3e4e8', color: '#7c7f88', boxShadow: cardShadow }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#ec652b'; (e.currentTarget as HTMLElement).style.color = '#ec652b'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#e3e4e8'; (e.currentTarget as HTMLElement).style.color = '#7c7f88'; }}
            aria-label="Next testimonials"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
