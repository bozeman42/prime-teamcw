myApp.controller('PropertyController', function (NgMap, DataService, $http) {
    console.log('PropertyController created');
    var self = this;
    self.data = DataService.data;

    self.options = {
        state: location.hash.split('/')[2],
        market: decodeURIComponent(location.hash.split('/')[3]),
        year: location.hash.split('/')[4],
        quarter: location.hash.split('/')[5],
        id: location.hash.split('/')[6]
    }

    self.getProperty = function () {
        DataService.getProperty(self.options);
        console.log(self.options);
        console.log(self.data);
    }
    self.getProperty();

    self.googleMapsUrl = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBTMMoMR1gHMeJLiiZCuiH4xyQoNBPvMEY';

    NgMap.getMap().then(function (map) {
        console.log(map.getCenter());
        console.log('markers', map.markers);
        console.log('shapes', map.shapes);
    })
});