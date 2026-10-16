/**
 * Country + dial-code picker.
 *
 * This component predates the token system and was written against raw Tailwind
 * palette classes — `border-gray-300`, `hover:border-purple-500`,
 * `focus:ring-purple-500`, `text-gray-900`, `bg-purple-100`. Purple appears
 * nowhere else on the site, and the fixed greys do not follow the theme: in
 * dark mode `text-gray-900` (#111827) on `--card` (#131C30) measures
 * **1.02:1**, so the selected country was effectively invisible on the contact
 * and request-sample forms. Every class here now reads a token, which also
 * means the field border picks up `--input` and its 3.30:1 (light) / 3.80:1
 * (dark) against the page.
 */
"use client";

import { useState, useRef, useEffect } from "react";
import { countries, Country, getDefaultCountry } from "@/lib/data/countries";
import { ChevronDown } from "lucide-react";

interface CountrySelectProps {
  value?: string; // Country code (e.g., "US", "IN")
  onChange: (country: Country) => void;
  disabled?: boolean;
  className?: string;
  required?: boolean;
}

export function CountrySelect({
  value,
  onChange,
  disabled = false,
  className = "",
  required = false,
}: CountrySelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<Country>(() => {
    if (value) {
      return countries.find((c) => c.code === value) || getDefaultCountry();
    }
    return getDefaultCountry();
  });

  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Filter countries based on search
  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.dialCode.includes(searchTerm)
  );

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchTerm("");
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      // Focus search input when dropdown opens
      setTimeout(() => searchInputRef.current?.focus(), 0);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (country: Country) => {
    setSelectedCountry(country);
    onChange(country);
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Selected Country Display */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`w-full px-4 py-2 text-left border border-[var(--input)] rounded-md bg-[var(--card)]
          hover:border-[var(--cmi-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]
          focus:border-transparent transition-all duration-200 flex items-center justify-between
          ${disabled ? "bg-[var(--muted)] cursor-not-allowed" : "cursor-pointer"}
          ${isOpen ? "ring-2 ring-[var(--primary)] border-transparent" : ""}`}
      >
        <div className="flex items-center gap-2">
          <span className="text-xl pb-1">{selectedCountry.flag}</span>
          <span className="text-[var(--foreground)]">
            {selectedCountry.name} ({selectedCountry.dialCode})
          </span>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-[var(--muted-foreground)] transition-transform duration-200
            ${isOpen ? "transform rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className="absolute z-50 w-full mt-1 bg-[var(--card)] border border-[var(--border)] rounded-md
          shadow-lg max-h-60 overflow-hidden"
        >
          {/* Search Input */}
          <div className="p-2 border-b border-[var(--border)] sticky top-0 bg-[var(--card)]">
            <input
              ref={searchInputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search countries..."
              className="w-full px-3 py-2 text-sm border border-[var(--input)] rounded-md
                focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
            />
          </div>

          {/* Countries List */}
          <div className="overflow-y-auto max-h-48">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => (
                <button
                  key={country.code}
                  type="button"
                  onClick={() => handleSelect(country)}
                  className={`w-full px-4 py-2 text-left hover:bg-[var(--muted)] flex items-center
                    gap-2 transition-colors duration-150
                    ${
                      selectedCountry.code === country.code
                        ? "bg-[var(--cmi-primary-fill)] text-[var(--primary-foreground)]"
                        : "text-[var(--foreground)]"
                    }`}
                >
                  <span className="text-xl pb-1">{country.flag}</span>
                  <span className="flex-1">
                    {country.name} ({country.dialCode})
                  </span>
                </button>
              ))
            ) : (
              <div className="px-4 py-3 text-sm text-[var(--muted-foreground)] text-center">
                No countries found
              </div>
            )}
          </div>
        </div>
      )}

      {/* Hidden input for form validation */}
      {required && (
        <input
          type="hidden"
          name="country"
          value={selectedCountry.code}
          required={required}
        />
      )}
    </div>
  );
}
