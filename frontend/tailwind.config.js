/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border:     "var(--color-border)",
        input:      "var(--color-input)",
        ring:       "var(--color-ring)",
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",

        /* ── Brand surfaces ── */
        surface: {
          DEFAULT: "var(--color-surface)",
          2:       "var(--color-surface-2)",
          3:       "var(--color-surface-3)",
        },

        /* ── Primary Gold ── */
        primary: {
          DEFAULT:    "var(--color-primary)",        /* #C9A227 */
          light:      "var(--color-primary-light)",   /* #F0C040 */
          dark:       "var(--color-primary-dark)",    /* #8a6a1a */
          foreground: "var(--color-primary-foreground)",
        },

        /* ── Secondary Amber ── */
        secondary: {
          DEFAULT:    "var(--color-secondary)",
          foreground: "var(--color-secondary-foreground)",
        },

        /* ── Accent Gold ── */
        accent: {
          DEFAULT:    "var(--color-accent)",
          foreground: "var(--color-accent-foreground)",
        },

        /* ── Destructive ── */
        destructive: {
          DEFAULT:    "var(--color-destructive)",
          foreground: "var(--color-destructive-foreground)",
        },

        /* ── Muted ── */
        muted: {
          DEFAULT:    "var(--color-muted)",
          foreground: "var(--color-muted-foreground)",
        },

        /* ── Popover ── */
        popover: {
          DEFAULT:    "var(--color-popover)",
          foreground: "var(--color-popover-foreground)",
        },

        /* ── Card ── */
        card: {
          DEFAULT:    "var(--color-card)",
          foreground: "var(--color-card-foreground)",
        },

        /* ── Status ── */
        success: {
          DEFAULT:    "var(--color-success)",
          foreground: "var(--color-success-foreground)",
        },
        warning: {
          DEFAULT:    "var(--color-warning)",
          foreground: "var(--color-warning-foreground)",
        },
        error: {
          DEFAULT:    "var(--color-error)",
          foreground: "var(--color-error-foreground)",
        },

        /* ── Direct palette shorthands ── */
        gold: {
          50:  "#fdf8e7",
          100: "#f9ecb8",
          200: "#f4dd85",
          300: "#efce52",
          400: "#F0C040",  /* bright gold */
          500: "#C9A227",  /* brand gold  */
          600: "#a07e1e",
          700: "#8a6a1a",  /* deep gold   */
          800: "#6b5215",
          900: "#4d3c0f",
        },
        espresso: {
          50:  "#f5e6c8",
          100: "#e8d0a0",
          200: "#c4a97a",
          300: "#a08050",
          400: "#7a5e38",
          500: "#5a421e",
          600: "#3a2c14",  /* lighter roast */
          700: "#2a1f0e",  /* medium roast  */
          800: "#1e1509",  /* dark roast    */
          900: "#120d07",  /* espresso black */
        },
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      fontFamily: {
        heading: ['Inter', 'sans-serif'],
        body:    ['Source Sans Pro', 'sans-serif'],
        caption: ['Roboto', 'sans-serif'],
        data:    ['JetBrains Mono', 'monospace'],
      },

      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to:   { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to:   { height: "0" },
        },
        "gold-shimmer": {
          "0%":   { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
      },

      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up":   "accordion-up 0.2s ease-out",
        "gold-shimmer":   "gold-shimmer 3s linear infinite",
      },

      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },

      boxShadow: {
        /* Gold glow shadows */
        'gold':    '0 1px 3px  rgba(201,162,39,0.15)',
        'gold-md': '0 4px 12px rgba(201,162,39,0.18), 0 2px 4px rgba(201,162,39,0.1)',
        'gold-lg': '0 10px 30px rgba(201,162,39,0.2), 0 4px 10px rgba(201,162,39,0.12)',
        'gold-xl': '0 20px 50px rgba(201,162,39,0.22), 0 10px 20px rgba(201,162,39,0.14)',
        /* Dark depth shadows */
        'dark':    '0 8px 30px rgba(0,0,0,0.6)',
        'dark-xl': '0 20px 60px rgba(0,0,0,0.7)',
        /* Glassmorphism */
        'glass':   '0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(201,162,39,0.15)',
        /* Backward compat */
        'green':    '0 1px 3px  rgba(201,162,39,0.1)',
        'green-md': '0 4px 6px  rgba(201,162,39,0.1), 0 2px 4px rgba(201,162,39,0.06)',
        'green-lg': '0 10px 15px rgba(201,162,39,0.1), 0 4px 6px rgba(201,162,39,0.05)',
        'green-xl': '0 20px 25px rgba(201,162,39,0.1), 0 10px 10px rgba(201,162,39,0.04)',
      },

      backgroundImage: {
        'gold-gradient':   'linear-gradient(135deg, #8a6a1a 0%, #C9A227 40%, #F0C040 65%, #C9A227 100%)',
        'dark-gradient':   'linear-gradient(160deg, #2a1f0e 0%, #1e1509 60%, #120d07 100%)',
        'hero-gradient':   'radial-gradient(ellipse at top, #3a2c14 0%, #1e1509 40%, #120d07 100%)',
        'gold-text-gradient': 'linear-gradient(135deg, #C9A227 0%, #F0C040 40%, #E8B84B 70%, #C9A227 100%)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}