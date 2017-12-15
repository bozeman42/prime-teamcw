myApp.controller('PropertyController', function (NgMap, DataService) {
    console.log('PropertyController created');
    var self = this;
    self.marketData = DataService.data;

});