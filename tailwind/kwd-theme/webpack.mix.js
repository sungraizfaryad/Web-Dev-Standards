let mix = require('laravel-mix');
let path = require('path');

mix.setResourceRoot('../');
mix.setPublicPath(path.resolve('./'));

mix.webpackConfig({
    watchOptions: {
        ignored: [
            path.posix.resolve(__dirname, './node_modules'),
            path.posix.resolve(__dirname, './css'),
            path.posix.resolve(__dirname, './js')
        ]
    }
});

mix.js('resources/js/app.js', 'assets/js');

mix.postCss("resources/css/app.css", "assets/css");
mix.postCss("resources/css/homepage.css", "assets/css");
mix.postCss("resources/css/kwd-woo-styles.css", "assets/css");


mix.disableSuccessNotifications();
mix.browserSync({
    proxy: {
        target: 'http://yourwebsite.local/',
        ws: true,
    },
    host: 'yourwebsite.local',
    open: 'external',
    https: false,
    port: 3000,
    files: ['**/*.php']
});

if (mix.inProduction()) {
    mix.options({
        terser: {
            terserOptions: {
                compress: false, // Disable JS compression
                mangle: false,   // Disable JS mangling
                output: {
                    beautify: true, // Keep JS code readable
                },
            },
        },
        postCss: [
            require('cssnano')({
                preset: ['default', {discardComments: {removeAll: true}}],
                minifySelectors: false, // Disable CSS selector minification
            }),
        ],
    });
    mix.version();
} else {
    mix.options({manifest: false});
}