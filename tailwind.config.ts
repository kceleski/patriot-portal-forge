
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
				'patriot-red': '#E63946',
				'navy-blue': '#1D3557',
				'sky-blue': '#457B9D',
				'light-blue': '#A8DADC',
				'off-white': '#F1FAEE',
				'dark-gray': '#2A2D34',
				'light-gray': '#E5E5E5',
				'gold': '#FFD700',
				'success-green': '#4CAF50',
				'warning-orange': '#FF9800',
				
				// Legacy support (mapped to new colors)
				'primary-red': '#E63946',
				'primary-navy': '#1D3557',
				'primary-sky': '#457B9D',
				'secondary-off-white': '#F1FAEE',
				'text-dark-gray': '#2A2D34',
				'accent-gold': '#FFD700',
				
				// Shadcn theme colors
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
				// HealthProAssist Typography
				'montserrat': ['Montserrat', 'sans-serif'],
				'open-sans': ['Open Sans', 'sans-serif'],
				'roboto-mono': ['Roboto Mono', 'monospace'],
				
				// Legacy support
				sans: ['Open Sans', 'system-ui', 'sans-serif'],
			},
			fontSize: {
				// HealthProAssist Typography Scale
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
				
				// Legacy sizes
				'2xs': ['0.625rem', { lineHeight: '0.875rem' }],
			},
			spacing: {
				// HealthProAssist 8px Grid System
				'xs': '4px',
				'sm': '8px',
				'md': '16px',
				'lg': '24px',
				'xl': '32px',
				'xxl': '48px',
				'xxxl': '64px',
				
				// Legacy spacing
				'18': '4.5rem',
				'88': '22rem',
			},
			boxShadow: {
				// HealthProAssist Shadow System
				'card': '0 4px 8px rgba(0, 0, 0, 0.1)',
				'card-hover': '0 8px 16px rgba(0, 0, 0, 0.1)',
				'ava-button': '0 4px 8px rgba(0, 0, 0, 0.2)',
				'ava-modal': '0 8px 16px rgba(0, 0, 0, 0.2)',
				
				// Legacy shadows
				'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
				'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
				'strong': '0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 20px 25px -5px rgba(0, 0, 0, 0.1)',
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'slide-in-right': {
					'0%': { transform: 'translateX(100%)' },
					'100%': { transform: 'translateX(0)' }
				},
				'scale-in': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' },
				},
				'ava-bounce': {
					'0%, 100%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.05)' },
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'slide-in-right': 'slide-in-right 0.3s ease-out',
				'scale-in': 'scale-in 0.2s ease-out',
				'float': 'float 3s ease-in-out infinite',
				'ava-bounce': 'ava-bounce 0.3s ease-out',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
