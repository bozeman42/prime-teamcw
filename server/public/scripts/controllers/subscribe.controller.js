myApp.controller('SubscribeController', function ($http, $cookies, SubscribeService) {
    console.log('SubscribeController created');
    var vm = this;

    vm.checkSubs = function() {
        $http.get('/subscribe').then(function(response) {
        console.log('Subscribers Loaded');
        })
    }   

    vm.checkSubs();

    var name = $cookies.get('name');
    console.log(name);

    console.log(document.cookie);
});