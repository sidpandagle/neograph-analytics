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
  			sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
  			mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
  		},
  		colors: {
  			background: 'hsl(var(--background-hsl))',
  			foreground: 'hsl(var(--foreground-hsl))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary-hsl))',
  				foreground: 'hsl(var(--primary-foreground-hsl))'
  			},
  			'primary-hover': 'var(--primary-hover)',

  			/* Column Design System */
  			'ink-blue':      '#011821',
  			'deep-plum':     '#111a4a',
  			'action-orange': '#ec652b',
  			'fog-gray':      '#f6f6f8',
  			'steel-gray':    '#e3e4e8',
  			'charcoal-text': '#232730',
  			'slate-text':    '#7c7f88',
  			'ghost-white':   '#ffffff',
  			'faded-grid':    '#023247',
  			'success-moss':  '#44b48b',
  			'info-blue':     '#7ea7e9',

  			/* Legacy — kept for pages not yet migrated */
  			'navy': {
  				'950': '#111a4a',
  				'900': '#1a2566',
  				'800': '#232b7a',
  			},
  			'ocean': {
  				'700': '#0d1438',
  				'600': '#111a4a',
  				'500': '#1a2566',
  				'400': '#ec652b',
  				'300': '#f07640',
  				'200': '#f9c5aa',
  				'100': '#fde8dc',
  				'50':  '#fdf5f1',
  			},
  			'bright': {
  				'500': '#ec652b',
  				'400': '#f07640',
  			},

  			secondary: {
  				DEFAULT: 'hsl(var(--secondary-hsl))',
  				foreground: 'hsl(var(--secondary-foreground-hsl))'
  			},
  			border: 'hsl(var(--border-hsl))',
  			card: {
  				DEFAULT: 'hsl(var(--card-hsl))',
  				foreground: 'hsl(var(--card-foreground-hsl))'
  			},
  			'card-foreground': 'var(--card-foreground)',
  			muted: {
  				DEFAULT: 'hsl(var(--muted-hsl))',
  				foreground: 'hsl(var(--muted-foreground-hsl))'
  			},
  			'muted-foreground': 'var(--muted-foreground)',
  			popover: {
  				DEFAULT: 'hsl(var(--popover-hsl))',
  				foreground: 'hsl(var(--popover-foreground-hsl))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent-hsl))',
  				foreground: 'hsl(var(--accent-foreground-hsl))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive-hsl))',
  				foreground: 'hsl(var(--destructive-foreground-hsl))'
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
  				'8': 'hsl(var(--chart-8))'
  			}
  		},
  		spacing: {
  			'18': '4.5rem',
  			'88': '22rem',
  			'100': '25rem',
  			'112': '28rem',
  			'128': '32rem'
  		},
  		maxWidth: {
  			'8xl': '88rem',
  			'9xl': '96rem'
  		},
  		keyframes: {
  			shimmer: {
  				'0%': { backgroundPosition: '-1000px 0' },
  				'100%': { backgroundPosition: '1000px 0' }
  			},
  			fadeIn: {
  				'0%': { opacity: '0', transform: 'translateY(10px)' },
  				'100%': { opacity: '1', transform: 'translateY(0)' }
  			},
  			slideIn: {
  				'0%': { transform: 'translateX(-100%)' },
  				'100%': { transform: 'translateX(0)' }
  			},
  			float: {
  				'0%, 100%': { transform: 'translateY(0px)' },
  				'50%': { transform: 'translateY(-10px)' }
  			}
  		},
  		animation: {
  			shimmer: 'shimmer 2s ease-in-out infinite',
  			fadeIn: 'fadeIn 0.3s ease-out',
  			slideIn: 'slideIn 0.3s ease-out',
  			float: 'float 3s ease-in-out infinite'
  		},
  		transitionTimingFunction: {
  			'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
  			'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
