/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: { 
          primary: "#0B0F19", 
          secondary: "#111827", 
          tertiary: "#1F2937",
          card: "#1E293B"
        },
        surface: { 
          glass: "rgba(255,255,255,0.05)",
          hover: "rgba(255,255,255,0.1)"
        },
        border: {
          primary: "rgba(255,255,255,0.1)",
          secondary: "rgba(255,255,255,0.05)"
        },
        accent: { 
          primary: "#3B82F6", 
          primaryHover: "#2563EB",
          success: "#10B981", 
          warning: "#F59E0B", 
          danger: "#EF4444",
          purple: "#8B5CF6"
        },
        text: { 
          primary: "#F8FAFC", 
          secondary: "#94A3B8", 
          muted: "#64748B",
          inverse: "#0F172A"
        }
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        display: ["Space Grotesk", "Inter", "sans-serif"]
      },
      backdropBlur: {
        glass: "12px",
        heavy: "24px"
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.05)",
        glow: "0 0 40px rgba(59,130,246,0.15)"
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease-out forwards",
        "slide-up": "slideUp 0.5s ease-out forwards",
        "pulse-slow": "pulse 3s cubic-bezier(0.4,0,0.6,1) infinite",
        "float": "float 6s ease-in-out infinite"
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 }
        },
        slideUp: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" }
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" }
        }
      }
    }
  },
  plugins: []
}