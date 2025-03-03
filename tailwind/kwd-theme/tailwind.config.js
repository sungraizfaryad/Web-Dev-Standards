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
        },
        extend: {
            colors: tailpress.colorMapper(
                tailpress.theme('settings.color.palette', theme),
            ),
            fontSize: tailpress.fontSizeMapper(
                tailpress.theme('settings.typography.fontSizes', theme),
            ),
            fontFamily: {
                poppins: ['Poppins', 'sans-serif'],
            },
            boxShadow: {
                kwd: '5px 5px 0px 0px rgba(172, 129, 4, 1)',
                'kwd-green': '5px 5px 0px 0px rgba(0, 117, 106, 1)',
                'kwd-red': '5px 5px 0px 0px rgba(190, 13, 100, 1)',
                'kwd-purple': '5px 5px 0px 0px rgba(70, 5, 60, 1)',
                'kwd-blue': '5px 5px 0px 0px rgba(25, 52, 105, 1)',
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
