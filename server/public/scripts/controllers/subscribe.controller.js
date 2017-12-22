myApp.controller('SubscribeController', function ($http, $cookies, SubscribeService) {
    console.log('SubscribeController created');
    var vm = this;
    vm.subscribeService = SubscribeService
    vm.checkSubs = function() {
        $http.get('/subscribe').then(function(response) {
        console.log('Subscribers Loaded');
        })
    }   

    vm.checkSubs();
});