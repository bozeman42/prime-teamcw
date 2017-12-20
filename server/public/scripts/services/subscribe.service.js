myApp.service('SubscribeService', function ($http, $location) {
    console.log('SubscribeService Loaded');
    var self = this;

    self.launchSub = function () {
    require(["mojo/signup-forms/Loader"], function (L) { L.start({ "baseUrl": "mc.us17.list-manage.com", "uuid": "eb35150d92904da6a2eead60a", "lid": "8bb5bb9fba" }) })
    };

    self.checkSubStatus = function () {
        $http.get('/subscribe/check').then(function(response) {
            if (response.data) {
                console.log('Functional');
            } else {
                console.log('User is not subscribed');
                $location.path('/not-subscribed')
            }
        })
    }

    self.launchSub();
});