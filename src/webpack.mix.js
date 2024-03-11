const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */


mix
    //////////////////////////ragy///////////////////////
    .js('resources/js/ragy.js','public/js/ragy/ragy.js')
    .sass('resources/sass/ragy/ragy.scss','public/css/ragy/ragy.css')

    //////////////////home///////////////////////////////
    .js('resources/js/home/home.js','public/js/home/')
    .sass('resources/sass/home/style.scss','public/css/home/')
    .js('resources/js/home/underConstraction.js','public/js/home/')
    .sass('resources/sass/home/underConstraction.scss','public/css/home/')
    .sass('resources/sass/home/demo.scss','public/css/home/')
    .js('resources/js/home/demo.js','public/js/home/')

    .js('resources/js/home/translate.js','public/js/home/')
    .sass('resources/sass/home/translate.scss','public/css/home/')

    /////////////////foodmenu////////////////////////////
    .js('resources/js/foodmenu/foodmenu.js','public/js/foodmenu')
    .js('resources/js/foodmenu/register.js','public/js/foodmenu')
    .sass('resources/sass/foodmenu/foodmenu.scss','public/css/foodmenu')

    /////////////////////help//////////////////////////
    .js('resources/js/help/help.js','public/js/help')
    .sass('resources/sass/help/help.scss','public/css/help')


    //////////////////////////////billing/////////////////////////
    .js('resources/js/billing/billing.js','public/js/billing')
    .js('resources/js/billing/payment_return_url.js','public/js/billing')
    .sass('resources/sass/billing/billing.scss','public/css/billing')
    .sass('resources/sass/billing/invoice.scss','public/css/billing')

    ////////////////////cpanel/////////////////////////
    .js('resources/js/cpanel/cpanel.js','public/js/cpanel/')
    .sass('resources/sass/cpanel/cpanel.scss','public/css/cpanel')
    .js('resources/js/cpanel/login.js','public/js/cpanel/')
    .sass('resources/sass/cpanel/login.scss','public/css/cpanel')
    .css('resources/css/colors.css','public/css/cpanel')
    .css('resources/css/colorsDark.css','public/css/cpanel')

    .sass('resources/sass/cpanel/financialReport.scss','public/css/cpanel')

    ////////////////////////////////builder//////////////////////////
    .sass('resources/sass/builder/builder.scss','public/css/builder')
    .js('resources/js/builder/builder.js','public/js/builder')


    //////////////////////////deliveryAccount//////////////////////
    .js('resources/js/deliveryAccount/script.js','public/js/deliveryAccount')
    .js('resources/js/deliveryAccount/login.js','public/js/deliveryAccount')
    .sass('resources/sass/deliveryAccount/style.scss','public/css/deliveryAccount')
    .sass('resources/sass/deliveryAccount/login.scss','public/css/deliveryAccount')

    /////////////////////////////administration//////////////////////////
    .js('resources/js/admin/layout.js','public/js/admin')
    .sass('resources/sass/admin/layout.scss','public/css/admin')

    /////////////////////////website///////////////////////////////
    .sass('resources/sass/website/notActive.scss','public/css/website/')
    .js('resources/js/website/script.js','public/js/website/')
    .sass('resources/sass/website/style.scss','public/css/website/')


    .sass('resources/sass/website/1/style.scss','public/css/website/1/')
    .js('resources/js/website/1/script.js','public/js/website/1/')

    .sass('resources/sass/website/2/style.scss','public/css/website/2/')
    .js('resources/js/website/2/script.js','public/js/website/2/')

    // .minify('public/js/cpanel/cpanel.js')
    // .webpackConfig({
    //     devtool: "inline-source-map"
    // });
