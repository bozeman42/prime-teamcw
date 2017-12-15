myApp.controller('PropertyController', function (NgMap, DataService, $http) {
    console.log('PropertyController created');
    var self = this;
    self.marketData = DataService.data;

    require(["mojo/signup-forms/Loader"], function (L) { L.start({ "baseUrl": "mc.us17.list-manage.com", "uuid": "eb35150d92904da6a2eead60a", "lid": "8bb5bb9fba" }) })

    
});