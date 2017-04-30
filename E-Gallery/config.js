SystemJS.config({
    'transpiler': 'plugin-babel',
    'map': {
        'plugin-babel': './node_modules/systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build': './node_modules/systemjs-plugin-babel/systemjs-babel-browser.js',

        // 'jquery': './bower_components/jquery/dist/jquery.min.js',
        // 'jquery-ui': './bower_components/jquery-ui/jquery-ui.min.js',
        'bootstrap': './bower_components/bootstrap/dist/js/bootstrap.js',
        'handlebars': './bower_components/handlebars/handlebars.js',
        'sammy': './bower_components/sammy/lib/sammy.js',
        'crypto-js': './bower_components/crypto-js/crypto-js.js',
        'toastr': './bower_components/toastr/toastr.js',

        'authentication': './scripts/requests/authentication-request.js',
        'view': './scripts/requests/view-requests.js',
        'utility': './scripts/helpers/utility.js',
        'notifier': './scripts/helpers/notifier.js',
        'templates': './scripts/helpers/template.js',
        'requester': './scripts/helpers/requester.js',
        'authenticationService': './scripts/helpers/authentication-service.js',       
        'constants': './scripts/helpers/constants.js',
        'validators': './scripts/helpers/validators.js',
        'JSONFormatter': './scripts/helpers/JSONFormatter.js',
        'userController': './scripts/controllers/userController.js',
        'galleryController': './scripts/controllers/galleryController.js',        
        'app': './scripts/app.js',
        'user': './scripts/data/user.js',

        //'authenticationManager': './scripts/requests/authenticationManager.js',       
        //'galeryApplication': './scripts',
        //'kinveyPostManager': './scripts/managers/kinveyPostManager.js',
        
    }
});

System.import('app');
