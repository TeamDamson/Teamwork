SystemJS.config({
    'transpiler': 'plugin-babel',
    'map': {
        'plugin-babel': './node_modules/systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build': './node_modules/systemjs-plugin-babel/systemjs-babel-browser.js',
        'jquery': './bower_components/jquery/dist/jquery.min.js',
        'jquery-ui': './bower_components/jquery-ui/jquery-ui.min.js',
        'bootstrap': './bower_components/bootstrap/dist/js/bootstrap.js',
        'handlebars': './bower_components/handlebars/handlebars.js',
        //'sammy': './bower_components/sammy/lib/sammy.js',
        //'cryptojs': './bower_components/crypto-js/crypto-js.js',
       'script': './scripts/script.js',
       'auth': './scripts/authentication.js',
       'utility': './scripts/utility.js',
       'request': './scripts/requests.js',
       'constants': './scripts/constants.js',
    }
});

System.import('script');