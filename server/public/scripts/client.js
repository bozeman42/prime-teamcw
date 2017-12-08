var myApp = angular.module('myApp', ['ngRoute','angularFileUpload']);

/// Routes ///
myApp.config(function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    console.log('myApp -- config')
    $routeProvider
        .when('/home', {
            templateUrl: '/views/templates/home.html',
            controller: 'LoginController as lc',
        })
        .when('/register', {
            templateUrl: '/views/templates/register.html',
            controller: 'LoginController as lc'
        })
        .when('/user', {
            templateUrl: '/views/templates/user.html',
            controller: 'UserController as uc',
            resolve: {
                getuser: function (UserService) {
                    return UserService.getuser();
                }
            }
        })
        .when('/info', {
            templateUrl: '/views/templates/info.html',
            controller: 'InfoController',
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
        .when('/upload', {
            templateUrl: '/views/templates/upload-test.html',
            controller: 'UploadController as ufc'
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
            redirectTo: 'home'
        });
});
