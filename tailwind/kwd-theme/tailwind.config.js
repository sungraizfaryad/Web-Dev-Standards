const theme = require('./theme.json');
const tailpress = require('@jeffreyvr/tailwindcss-tailpress');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './*.php',
        './**/*.php',
        './resources/css/*.css',
        './resources/js/*.js',
        './safelist.txt',
        './node_modules/flowbite/**/*.js'
    ],
    theme: {
        fontFamily: {
            poppins: ['Poppins', 'sans-serif'],
            'dm-sans': ['DM Sans', 'sans-serif'],
        },
        container: {
            padding: {
                DEFAULT: '1rem',
                sm: '2rem',
                lg: '0rem',
            },
        },
        extend: {
            colors: tailpress.colorMapper(
                tailpress.theme('settings.color.palette', theme),
            ),
            fontSize: tailpress.fontSizeMapper(
                tailpress.theme('settings.typography.fontSizes', theme),
            ),
            fontFamily: {
                sans: ['DM Sans', 'sans-serif'],
            },
        },
        screens: {
            xs: '480px',
            sm: '640px',
            md: '768px',
            lg: tailpress.theme('settings.layout.contentSize', theme),
            xl: tailpress.theme('settings.layout.wideSize', theme),
        },
    },
    plugins: [
        tailpress.tailwind,
        require('flowbite/plugin')
    ],
};
