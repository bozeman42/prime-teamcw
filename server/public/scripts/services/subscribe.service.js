myApp.service('SubscribeService', function ($http, $location, $cookies) {
    var self = this;

    self.launchSub = function () {
    require(["mojo/signup-forms/Loader"], function (L) { L.start({ "baseUrl": "mc.us17.list-manage.com", "uuid": "eb35150d92904da6a2eead60a", "lid": "8bb5bb9fba" }) })
    };

    self.email = '';
    self.selectedItem = {};


    self.checkSubStatus = function () {
        $http.get('/subscribe/' + self.email).then(function(response) {
            if (response.data) {
                $cookies.put('MCSubbed','true')
                $location.path(`/property/${self.selectedItem.State}/${encodeURIComponent(self.selectedItem.Submarket)}/${self.selectedItem.year}/${self.selectedItem.quarter}/${self.selectedItem.Property_Id}`);
            } else if (response.data === false) {
                alert('We do not recognize that email. Please make sure that you are subscribed to our emailing list or try again.');
            } else {
                alert('Something went wrong.');
            }
        })
    }

    self.subscribe = function () {
        $cookies.put('MCSubbed', 'true');
    }
});