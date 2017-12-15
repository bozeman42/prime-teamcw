myApp.controller('SubscribeController', function ($http) {
    console.log('SubscribeController created');
    var vm = this;

    vm.checkSubs = function() {
        $http.get('/subscribe').then(function(response) {
        console.log(response.data);
        })
    }   
});