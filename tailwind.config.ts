
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				// HealthProAssist Brand Colors
				'brand-red': '#E63946',
				'brand-navy': '#1D3557',
				'brand-sky': '#457B9D',
				'brand-light-blue': '#A8DADC',
				'brand-off-white': '#F1FAEE',
                'brand-white': '#FFFFFF';

				
				// Semantic Colors
				'text-primary': '#1D3557',
				'text-secondary': '#457B9D',
				'background-main': '#F1FAEE',
				'background-card': '#A8DADC',
				'ui-border': '#E5E5E5',
				'ui-ring': '#457B9D',
				'success': '#4CAF50',
				'warning': '#E63942',

				// Shadcn theme colors (mapped to our brand)
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				'heading': ['Montserrat', 'sans-serif'],
				'body': ['Open Sans', 'sans-serif'],
				'mono': ['Roboto Mono', 'monospace'],
			},
			fontSize: {
				'h1': ['36px', { lineHeight: '44px', fontWeight: '700' }],
				'h2': ['30px', { lineHeight: '38px', fontWeight: '700' }],
				'h3': ['24px', { lineHeight: '32px', fontWeight: '600' }],
				'h4': ['20px', { lineHeight: '28px', fontWeight: '600' }],
				'h5': ['18px', { lineHeight: '26px', fontWeight: '600' }],
				'h6': ['16px', { lineHeight: '24px', fontWeight: '600' }],
				'body-large': ['18px', { lineHeight: '28px', fontWeight: '400' }],
				'body': ['16px', { lineHeight: '24px', fontWeight: '400' }],
				'body-small': ['14px', { lineHeight: '20px', fontWeight: '400' }],
				'caption': ['12px', { lineHeight: '16px', fontWeight: '400' }],
			},
			keyframes: {
				'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
				'accordion-up': { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
