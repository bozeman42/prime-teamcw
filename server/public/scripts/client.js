var myApp = angular.module('myApp', ['ngRoute','angularFileUpload','ngMap']);

/// Routes ///
myApp.config(function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    console.log('myApp -- config')
    $routeProvider
        .when('/home', {
            templateUrl: '/views/templates/home.html',
            controller: 'HomeController as vm',
        })
        .when('/market', {
            templateUrl: '/views/templates/market.html',
            controller: 'MarketController as vm',
        })
        .when('/login', {
            templateUrl: '/views/templates/login.html',
            controller: 'LoginController as lc',
        })
        .when('/register', {
            templateUrl: '/views/templates/register.html',
            controller: 'LoginController as lc'
            // resolve: {
            //     getuser: function (UserService) {
            //         return UserService.getuser();
            //     }
            // }
        })
        .when('/admin', {
            templateUrl: '/views/templates/admin.html',
            controller: 'UserController as uc',
            resolve: {
                getuser: function (UserService) {
                    return UserService.getuser();
                }
            }
        })
        .when('/office', {
            templateUrl: '/views/templates/office.html',
            controller: 'OfficeController as vm',
            resolve: {
                getuser: function (UserService) {
                    return UserService.getuser();
                }
            }
        })
        .when('/email-upload', {
            templateUrl: '/views/templates/email-upload.html',
            controller: 'EmailController as vm',
            resolve: {
                getuser: function (UserService) {
                    return UserService.getuser();
                }
            }
        })
        .when('/email-list', {
            templateUrl: '/views/templates/email-list.html',
            controller: 'EmailController as vm',
            resolve: {
                getuser: function (UserService) {
                    return UserService.getuser();
                }
            }
        })
        .when('/email-history', {
            templateUrl: '/views/templates/email-history.html',
            controller: 'EmailController as vm',
            resolve: {
                getuser: function (UserService) {
                    return UserService.getuser();
                }
            }
        })
        .otherwise({
            redirectTo: 'login'
        });
});
