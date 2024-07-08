/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            // 116466
            // blac- 2c3531
            // beige- d9b08c
            colors: {
                almostBlack: '#171717',
                mediumGary: '#9CA3AF',
                lightGary: '#E5E7EB',
                boldBlack: '#262626',
                iconActiveGray: '#525252',
                fillerGary: '#D9D9D9',
                borderGray: '#E5E7EB',
                subItemGray: '#646464',
                primaryColor: '#baff39',
                secondaryColor: '#6e6e6e',
                bgGray: '#F2F2F2',
                deleteRed: '#EA3D3D',
            },
        },
    },
    plugins: [],
}
