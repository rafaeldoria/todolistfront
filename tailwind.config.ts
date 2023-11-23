import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        lightBlue: {
          200:"rgba(186, 230, 253)",
          400:"rgba(56, 189, 248)",
          500:"rgba(14, 165, 233)",
          600:"rgba(2, 132, 199)",
        },
        blueGray: {
          50:"rgba(248, 250, 252)",
          100:"rgba(241, 245, 249)",
          200:"rgba(226, 232, 240)",
          400:"rgba(148, 163, 184)",
          500:"rgba(100, 116, 139)",
          600:"rgba(71, 85, 105)",
          700:"rgba(51, 65, 85)",
          800:"rgba(30, 41, 59)",
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'img-login':'url("/images/login.jpg")',
        'img-todobgr':'url("/images/todobgr.jpg")'
      },
    },
  },
  plugins: [],
}
export default config
