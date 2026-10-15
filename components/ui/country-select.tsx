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
        className={`w-full px-4 py-2 text-left border border-gray-300 rounded-md bg-[var(--card)]
          hover:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500
          focus:border-transparent transition-all duration-200 flex items-center justify-between
          ${disabled ? "bg-gray-100 cursor-not-allowed" : "cursor-pointer"}
          ${isOpen ? "ring-2 ring-purple-500 border-transparent" : ""}`}
      >
        <div className="flex items-center gap-2">
          <span className="text-xl pb-1">{selectedCountry.flag}</span>
          <span className="text-gray-900">
            {selectedCountry.name} ({selectedCountry.dialCode})
          </span>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 transition-transform duration-200
            ${isOpen ? "transform rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className="absolute z-50 w-full mt-1 bg-[var(--card)] border border-gray-200 rounded-md
          shadow-lg max-h-60 overflow-hidden"
        >
          {/* Search Input */}
          <div className="p-2 border-b border-gray-200 sticky top-0 bg-[var(--card)]">
            <input
              ref={searchInputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search countries..."
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md
                focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                  className={`w-full px-4 py-2 text-left hover:bg-purple-50 flex items-center
                    gap-2 transition-colors duration-150
                    ${
                      selectedCountry.code === country.code
                        ? "bg-purple-100 text-purple-700"
                        : "text-gray-900"
                    }`}
                >
                  <span className="text-xl pb-1">{country.flag}</span>
                  <span className="flex-1">
                    {country.name} ({country.dialCode})
                  </span>
                </button>
              ))
            ) : (
              <div className="px-4 py-3 text-sm text-gray-500 text-center">
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
