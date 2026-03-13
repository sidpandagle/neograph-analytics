"use client";

import { useState, useEffect, useRef } from "react";
import { Globe, ChevronDown, Check } from "lucide-react";

const LANGUAGES = [
  { label: "English", code: "en" },
  { label: "Italian", code: "it" },
  { label: "Russian", code: "ru" },
  { label: "Spanish", code: "es" },
  { label: "French", code: "fr" },
  { label: "German", code: "de" },
  { label: "Japanese", code: "ja" },
  { label: "Chinese (Simplified)", code: "zh-CN" },
  { label: "Arabic", code: "ar" },
  { label: "Portuguese", code: "pt" },
];

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? decodeURIComponent(match[2]) : null;
}

function getCurrentLangFromCookie(): string {
  const cookie = getCookie("googtrans");
  if (!cookie) return "en";
  const parts = cookie.split("/");
  if (parts.length >= 3 && parts[2]) return parts[2];
  return "en";
}

function clearGoogTransCookie() {
  const expiry = "expires=Thu, 01 Jan 1970 00:00:00 UTC";
  const hostname = window.location.hostname;
  // Strip www. to get the apex domain for broad cookie clearing
  const apexDomain = hostname.replace(/^www\./, "");

  document.cookie = `googtrans=; path=/; ${expiry};`;
  document.cookie = `googtrans=; path=/; domain=${hostname}; ${expiry};`;
  document.cookie = `googtrans=; path=/; domain=.${apexDomain}; ${expiry};`;
  document.cookie = `googtrans=; path=/; domain=${apexDomain}; ${expiry};`;
}

function setGoogTransCookie(code: string) {
  const value = encodeURIComponent(`/en/${code}`);
  const hostname = window.location.hostname;
  const apexDomain = hostname.replace(/^www\./, "");

  document.cookie = `googtrans=${value}; path=/;`;
  document.cookie = `googtrans=${value}; path=/; domain=${hostname};`;
  document.cookie = `googtrans=${value}; path=/; domain=.${apexDomain};`;
}

export default function GoogleTranslate() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("en");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentLang(getCurrentLangFromCookie());
  }, []);

  // Load Google Translate scripts only when a non-English language is active.
  // This removes ~300KB of 3rd-party JS/CSS from the critical path for English users.
  useEffect(() => {
    if (currentLang === 'en') return;
    if (document.getElementById('google-translate-element-script')) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).googleTranslateElementInit = function () {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      new (window as any).google.translate.TranslateElement(
        { pageLanguage: 'en', autoDisplay: false },
        'google_translate_element'
      );
      const observer = new MutationObserver(() => {
        const banner = document.querySelector('iframe.goog-te-banner-frame');
        if (banner) {
          (banner as HTMLElement).style.display = 'none';
          document.body.style.top = '0px';
          observer.disconnect();
        }
      });
      observer.observe(document.body, { childList: true, subtree: true });
      setTimeout(() => observer.disconnect(), 5000);
    };

    const script = document.createElement('script');
    script.id = 'google-translate-element-script';
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.head.appendChild(script);
  }, [currentLang]);

  // When a non-English language is active, Google Translate mutates the DOM with
  // <font> wrappers. Next.js client-side navigation then tries to reconcile against
  // that mutated DOM and throws. Fix: intercept all internal anchor clicks and
  // convert them to full-page navigations so React never touches a translated DOM.
  useEffect(() => {
    if (currentLang === "en") return;

    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a");
      if (
        anchor &&
        anchor.href &&
        anchor.href.startsWith(window.location.origin) &&
        !anchor.target &&
        !e.ctrlKey &&
        !e.metaKey &&
        !e.shiftKey
      ) {
        e.preventDefault();
        e.stopPropagation();
        window.location.href = anchor.href;
      }
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [currentLang]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  function selectLanguage(code: string) {
    setIsOpen(false);

    if (code === "en") {
      clearGoogTransCookie();
      window.location.reload();
      return;
    }

    setGoogTransCookie(code);
    // Always reload — avoids React/Google Translate DOM conflict and works
    // consistently across environments.
    window.location.reload();
  }

  const currentLabel = LANGUAGES.find((l) => l.code === currentLang)?.label ?? "Language";

  return (
    <div className="relative notranslate" ref={dropdownRef} translate="no">
      <button
        onClick={() => setIsOpen((o) => !o)}
        className="lang-btn relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium overflow-hidden"
        aria-label="Select language"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        {/* Pulse ring — uses transform+opacity (GPU composited) instead of box-shadow */}
        <span className="lang-ring" aria-hidden="true" />
        {/* Gradient fill — fades in on hover instead of snapping */}
        <span className="lang-fill" aria-hidden="true" />
        {/* Shine sweep */}
        <span className="lang-shine" aria-hidden="true" />
        <Globe className="w-3.5 h-3.5 flex-shrink-0 relative z-10" />
        <span className="hidden lg:inline whitespace-nowrap notranslate relative z-10">{currentLabel}</span>
        <ChevronDown
          className={`w-3 h-3 flex-shrink-0 relative z-10 lang-chevron ${isOpen ? "rotate-180" : ""}`}
        />
        <style>{`
          .lang-btn {
            color: #2563A3;
            border: 1.5px solid #2563A3;
            background: transparent;
            transition: color 0.55s ease, border-color 0.55s ease;
          }

          /* Pulse ring — transform+opacity are GPU composited, unlike box-shadow */
          .lang-ring {
            position: absolute;
            inset: -2px;
            border-radius: 9999px;
            border: 1.5px solid rgba(37, 99, 163, 0.5);
            animation: langPulse 2.4s ease-in-out infinite;
            pointer-events: none;
            will-change: transform, opacity;
          }
          @keyframes langPulse {
            0%   { transform: scale(1);    opacity: 0.7; }
            65%  { transform: scale(1.18); opacity: 0;   }
            100% { transform: scale(1);    opacity: 0;   }
          }
          .lang-btn:hover .lang-ring {
            animation-play-state: paused;
            opacity: 0;
          }

          /* Gradient fill layer — opacity-transitions smoothly */
          .lang-fill {
            position: absolute;
            inset: -1px;
            border-radius: 9999px;
            background: linear-gradient(135deg, #2563A3 0%, #1d4ed8 100%);
            opacity: 0;
            transition: opacity 0.55s ease;
            z-index: 1;
          }
          .lang-btn:hover .lang-fill {
            opacity: 1;
          }

          /* Shine sweep — translateX is GPU composited, unlike left */
          .lang-shine {
            position: absolute;
            top: 0;
            left: 0;
            width: 45%; height: 100%;
            background: linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%);
            transform: skewX(-18deg) translateX(-180%);
            animation: langShine 2.4s ease-in-out infinite;
            z-index: 4;
            pointer-events: none;
            will-change: transform, opacity;
          }
          @keyframes langShine {
            0%   { transform: skewX(-18deg) translateX(-180%); opacity: 0; }
            18%  { opacity: 1; }
            55%  { transform: skewX(-18deg) translateX(320%);  opacity: 0; }
            100% { transform: skewX(-18deg) translateX(320%);  opacity: 0; }
          }
          .lang-btn:hover .lang-shine {
            opacity: 0;
            transition: opacity 0.4s ease;
            animation-play-state: paused;
          }

          /* Hover text/border settle */
          .lang-btn:hover {
            color: #fff;
            border-color: rgba(29,78,216,0.6);
            box-shadow: 0 4px 16px rgba(37,99,163,0.28);
          }

          /* Chevron rotation */
          .lang-chevron {
            transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          }
        `}</style>
      </button>

      {isOpen && (
        <div
          className="absolute right-0 top-full mt-2 w-52 bg-white border border-slate-200 rounded-lg shadow-lg z-[60] py-1 overflow-hidden notranslate"
          role="listbox"
          aria-label="Language options"
          translate="no"
        >
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              role="option"
              aria-selected={currentLang === lang.code}
              onClick={() => selectLanguage(lang.code)}
              className={`w-full flex items-center justify-between px-4 py-2.5 text-sm text-left transition-colors ${
                currentLang === lang.code
                  ? "text-[#2563A3] bg-blue-50 font-medium"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              <span className="notranslate">{lang.label}</span>
              {currentLang === lang.code && (
                <Check className="w-3.5 h-3.5 text-[#2563A3]" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
