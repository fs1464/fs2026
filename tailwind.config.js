/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  darkMode: 'class',
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#1A1A2E',
          accent: '#E94560',
          'accent-light': '#FF6B81',
        },
        nearly: {
          bg: '#FFFFFF',
          'bg-secondary': '#F8F9FA',
          'bg-tertiary': '#F0F2F5',
          'text-primary': '#1A1A2E',
          'text-secondary': '#6C757D',
          'text-tertiary': '#ADB5BD',
          border: '#E9ECEF',
          'border-light': '#F0F2F5',
        },
        trust: {
          level1: '#AAAAAA',
          level2: '#1565C0',
          level3: '#0F7B6C',
          level4: '#E94560',
        },
        status: {
          success: '#28A745',
          warning: '#FFC107',
          error: '#DC3545',
          info: '#17A2B8',
        },
      },
      fontFamily: {
        'noto': ['NotoSans_400Regular'],
        'noto-medium': ['NotoSans_500Medium'],
        'noto-semibold': ['NotoSans_600SemiBold'],
        'noto-bold': ['NotoSans_700Bold'],
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '48px',
      },
      borderRadius: {
        'card': '12px',
        'sheet': '20px',
        'pill': '999px',
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'elevated': '0 4px 16px rgba(0, 0, 0, 0.12)',
        'sheet': '0 -4px 20px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
};
