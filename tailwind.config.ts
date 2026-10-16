import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        /* Plus Jakarta Sans for everything read at length. */
        sans: ['var(--font-jakarta)', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        /* Outfit for display type and every number. */
        display: ['var(--font-outfit)', 'Outfit', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },

      colors: {
        background: 'hsl(var(--background-hsl))',
        foreground: 'hsl(var(--foreground-hsl))',
        primary: {
          DEFAULT: 'hsl(var(--primary-hsl))',
          foreground: 'hsl(var(--primary-foreground-hsl))',
        },
        'primary-hover': 'var(--primary-hover)',

        /* ── CMI palette ───────────────────────────────────── */
        cmi: {
          primary: '#1541E3',
          pressed: '#0E2FA8',
          raised: '#2C55EB',
          line: '#4E77FF',
          ink: '#0A1633',
          sky: '#BFDCF7',
          'sky-ink': '#34557F',
          'on-blue': '#C9D8FF',
          'on-blue-dim': '#A9C0FF',
          desk: '#EDF1F9',
          surface: '#F4F7FE',
          raisedsurface: '#F9FBFF',
          chip: '#EDF1FE',
          rail: '#F1F5FD',
          hairline: '#E3E9F7',
          body: '#5C6B8A',
          meta: '#8A97B2',
          idle: '#4C5B7A',
          mid: '#6E97F2',
          base: '#D8E2F5',
          signal: '#7CFFB2',
        },

        /* ── Legacy aliases, remapped onto the CMI blue system ──
           Kept so existing call sites (ocean-*, navy-*, bright-*)
           adopt the new palette without a rename sweep. ─────── */
        navy: {
          '950': 'var(--b-950)',
          '900': 'var(--b-900)',
          '800': 'var(--b-800)',
        },
        ocean: {
          /* 950/900/800 did not exist, yet text-ocean-900 and text-ocean-800
             were both in use -- Tailwind emitted no rule, so those elements
             silently inherited their parent's colour. */
          '950': 'var(--b-950)',
          '900': 'var(--b-900)',
          '800': 'var(--b-800)',
          '700': 'var(--b-700)',
          '600': 'var(--b-600)',
          '500': 'var(--b-500)',
          '400': 'var(--b-400)',
          '300': 'var(--b-300)',
          '200': 'var(--b-200)',
          '100': 'var(--b-100)',
          '50': 'var(--b-50)',
        },
        bright: {
          '500': 'var(--b-600)',
          '400': 'var(--b-500)',
        },

        /* Cool blue-grey ramp replacing Tailwind's default slate/gray,
           so neutral call sites sit in the same family as the desk. */
        slate: {
          '50': 'var(--n-50)',
          '100': 'var(--n-100)',
          '200': 'var(--n-200)',
          '300': 'var(--n-300)',
          '400': 'var(--n-400)',
          '500': 'var(--n-500)',
          '600': 'var(--n-600)',
          '700': 'var(--n-700)',
          '800': 'var(--n-800)',
          '900': 'var(--n-900)',
          '950': 'var(--n-950)',
        },
        gray: {
          '50': 'var(--n-50)',
          '100': 'var(--n-100)',
          '200': 'var(--n-200)',
          '300': 'var(--n-300)',
          '400': 'var(--n-400)',
          '500': 'var(--n-500)',
          '600': 'var(--n-600)',
          '700': 'var(--n-700)',
          '800': 'var(--n-800)',
          '900': 'var(--n-900)',
          '950': 'var(--n-950)',
        },

        /* Tailwind's blue (and stray purples) pulled onto the CMI blue,
           so form and checkout surfaces match the rest of the system. */
        blue: {
          '50': 'var(--b-50)',
          '100': 'var(--b-100)',
          '200': 'var(--b-200)',
          '300': 'var(--b-300)',
          '400': 'var(--b-400)',
          '500': 'var(--b-500)',
          '600': 'var(--b-600)',
          '700': 'var(--b-700)',
          '800': 'var(--b-800)',
          '900': 'var(--b-900)',
          '950': 'var(--b-950)',
        },
        /* Decorative amber tints (icon chips, never warnings) join the blue. */
        amber: {
          '50': 'var(--b-50)',
          '100': 'var(--b-100)',
          '200': 'var(--b-200)',
          '300': 'var(--b-300)',
          '400': 'var(--b-400)',
          '500': 'var(--b-500)',
          '600': 'var(--b-600)',
          '700': 'var(--b-700)',
          '800': 'var(--b-800)',
          '900': 'var(--b-900)',
          '950': 'var(--b-950)',
        },
        purple: {
          '50': 'var(--b-50)',
          '100': 'var(--b-100)',
          '200': 'var(--b-200)',
          '300': 'var(--b-300)',
          '400': 'var(--b-400)',
          '500': 'var(--b-500)',
          '600': 'var(--b-600)',
          '700': 'var(--b-700)',
          '800': 'var(--b-800)',
          '900': 'var(--b-900)',
          '950': 'var(--b-950)',
        },

        /* Column-era aliases, remapped rather than removed. */
        'ink-blue': '#0A1633',
        'deep-plum': '#1541E3',
        'action-orange': '#1541E3',
        'fog-gray': '#F4F7FE',
        'steel-gray': '#E3E9F7',
        'charcoal-text': '#0A1633',
        'slate-text': '#5C6B8A',
        'ghost-white': '#FFFFFF',
        'faded-grid': '#1541E3',
        'success-moss': '#12B76A',
        'info-blue': '#6E97F2',

        secondary: {
          DEFAULT: 'hsl(var(--secondary-hsl))',
          foreground: 'hsl(var(--secondary-foreground-hsl))',
        },
        border: 'hsl(var(--border-hsl))',
        card: {
          DEFAULT: 'hsl(var(--card-hsl))',
          foreground: 'hsl(var(--card-foreground-hsl))',
        },
        'card-foreground': 'var(--card-foreground)',
        muted: {
          DEFAULT: 'hsl(var(--muted-hsl))',
          foreground: 'hsl(var(--muted-foreground-hsl))',
        },
        'muted-foreground': 'var(--muted-foreground)',
        popover: {
          DEFAULT: 'hsl(var(--popover-hsl))',
          foreground: 'hsl(var(--popover-foreground-hsl))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent-hsl))',
          foreground: 'hsl(var(--accent-foreground-hsl))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive-hsl))',
          foreground: 'hsl(var(--destructive-foreground-hsl))',
        },
        input: 'hsl(var(--input-hsl))',
        ring: 'hsl(var(--ring-hsl))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
          '6': 'hsl(var(--chart-6))',
          '7': 'hsl(var(--chart-7))',
          '8': 'hsl(var(--chart-8))',
        },
      },

      /* CMI scale: 4 · 8 · 12 · 18 · 26 · 44 */
      spacing: {
        '4.5': '18px',
        '6.5': '26px',
        '11': '44px',
        '18': '4.5rem',
        '88': '22rem',
        '100': '25rem',
        '112': '28rem',
        '128': '32rem',
      },

      maxWidth: {
        /* Must read the same custom property as the .desk class in globals.css.
           This was a hardcoded 1240px while --desk-max steps up to 1400px at
           1536px and 1520px at 1800px, so the header -- the only consumer of
           this token -- stayed 280px narrower than the page content under it
           on a wide display. The horizontal padding already matches .desk
           (20px, 14px under 900px), so aligning max-width aligns the edges. */
        desk: 'var(--desk-max)',
        '8xl': '88rem',
        '9xl': '96rem',
      },

      borderRadius: {
        panel: '24px',
        card: '18px',
        tile: '14px',
        soft: '16px',
        pill: '999px',
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 4px)',
        sm: 'calc(var(--radius) - 6px)',
      },

      boxShadow: {
        card: 'var(--shadow-card)',
        panel: 'var(--shadow-panel)',
        blue: 'var(--shadow-blue)',
      },

      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },

      animation: {
        shimmer: 'shimmer 2s ease-in-out infinite',
        fadeIn: 'fadeIn 0.3s ease-out',
        slideIn: 'slideIn 0.3s ease-out',
        float: 'float 8s ease-in-out infinite',
      },

      transitionTimingFunction: {
        'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
