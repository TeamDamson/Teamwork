SystemJS.config({
    'transpiler': 'plugin-babel',
    'map': {
        'plugin-babel': 'https://cdn.rawgit.com/systemjs/plugin-babel/master/plugin-babel.js',
        'systemjs-babel-build': 'https://cdn.rawgit.com/systemjs/plugin-babel/master/systemjs-babel-browser.js',
        // 'jquery': './bower_components/jquery/dist/jquery.min.js',
        // 'jquery-ui': './bower_components/jquery-ui/jquery-ui.min.js',
        // 'bootstrap': './bower_components/bootstrap/dist/js/bootstrap.js',
        // 'handlebars': './bower_components/handlebars/handlebars.js',
        //'sammy': './bower_components/sammy/lib/sammy.js',
        //'cryptojs': './bower_components/crypto-js/crypto-js.js',
        'script': './scripts/script.js',
        'auth': './scripts/authentication.js',
        'utility': './scripts/utility.js',
        'request': './scripts/requests.js',
        'constants': './scripts/helpers/constants.js',
        'autenticationManager': './scripts/managers/authenticationManager.js',
        'user': './scripts/data/user.js',
        'validators': './scripts/helpers/validators.js',
        'galeryApplication': './scripts',
        'kinveyPostManager': './scripts/managers/kinveyPostManagerManager.js',
        'JSONFormatter': './scripts/helpers/JSONFormatter.js',
        'patterns': './tamplates/patterns.js',
        'tamplates': './tamplates/tamplates.js'
    }
});

System.import('script');