SystemJS.config({
    'transpiler': 'plugin-babel',
    'map': {
        'plugin-babel': './node_modules/systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build': './node_modules/systemjs-plugin-babel/systemjs-babel-browser.js',
        // 'sammy': './bower_components/sammy/lib/sammy.js',

        // sammy need this jquery????
        'jquery': './bower_components/jquery/dist/jquery.min.js',
        'bootstrap': './bower_components/bootstrap/dist/js/bootstrap.js',
        'handlebars': './bower_components/handlebars/handlebars.js',
        'toastr': './bower_components/toastr/toastr.js',

        'authentication': './scripts/requests/authentication-request.js',
        'view': './scripts/requests/view-requests.js',
        'templates': './scripts/helpers/template.js',
        'requester': './scripts/helpers/requester.js',
        'authenticationService': './scripts/helpers/authentication-service.js',
        'constants': './scripts/helpers/constants.js',
        'validators': './scripts/helpers/validators.js',
        'JSONFormatter': './scripts/helpers/JSONFormatter.js',
        'userController': './scripts/controllers/userController.js',
        'galleryController': './scripts/controllers/galleryController.js',
        'app': './scripts/app.js',
        'domManipulation': './scripts/helpers/domManipulations.js',
        'patterns': './templates/pattern.js',
        'tamplatesMy': './scripts/helpers/tamplatesMy.js',
        'sammy': './bower_components/sammy/lib/sammy.js',
        'shoppingCartController': './scripts/controllers/shoppingCartController.js'     
    }
});

System.import('app');