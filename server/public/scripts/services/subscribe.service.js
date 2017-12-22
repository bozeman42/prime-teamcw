myApp.service('SubscribeService', function ($http, $location, $cookies) {
    console.log('SubscribeService Loaded');
    var self = this;

    self.launchSub = function () {
    require(["mojo/signup-forms/Loader"], function (L) { L.start({ "baseUrl": "mc.us17.list-manage.com", "uuid": "eb35150d92904da6a2eead60a", "lid": "8bb5bb9fba" }) })
    };

    self.email = '';
    self.selectedItem = {};


    self.checkSubStatus = function () {
        console.log(self.selectedItem);
        $http.get('/subscribe/' + self.email).then(function(response) {
            if (response.data) {
                console.log('User is subscribed');
                // $cookies.put()
                $location.path(`/property/${self.selectedItem.State}/${encodeURIComponent(self.selectedItem.Submarket)}/${self.selectedItem.year}/${self.selectedItem.quarter}/${self.selectedItem.Property_Id}`);
            } else if (response.data === false) {
                console.log('User is not subscribed');
                alert('We do not recognize that email. Please make sure that you are subscribed to our emailing list or try again.');
            } else {
                alert('Something went wrong.');
            }
        })
    }
});