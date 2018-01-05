myApp.controller('SubscribeController', function ($http, $cookies, SubscribeService) {
    var vm = this;
    vm.subscribeService = SubscribeService
    vm.checkSubs = function() {
        $http.get('/subscribe').then(function(response) {
        })
    }   

    vm.checkSubs();
});