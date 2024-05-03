/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
			boxShadow: {
				boxShadowInput: 'inset 3px 3px 3px 3px rgb(0 0 0 / 0.05)',
			},
			keyframes: {
				loading: {
					'0%, 100%': { opacity: '0', transform: 'scale(0)'},
					'50%': { opacity: '100', transform: 'scale(1)'},
					'100%': { transform: 'scale(0)', opacity: '0'}
				}
			},
			backgroundImage: theme => ({
				'gradient-radial': 'radial-gradient(circle, rgba(201,241,255,0.4) 0%, rgba(144,200,255,1) 100%)',
				'gradient-radial-dark': 'radial-gradient(circle, rgba(23,37,84,1) 0%, rgba(4,0,10,1) 100%)',
			})
		},
  },
  plugins: [],
}

