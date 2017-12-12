myApp.controller('MarketController', function (NgMap, DataService) {
    console.log('MarketController created');
    var self = this;
    self.marketData = DataService.data;

    self.googleMapsUrl = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBTMMoMR1gHMeJLiiZCuiH4xyQoNBPvMEY'
    NgMap.getMap().then(function (map) {
        console.log(map.getCenter());
        console.log('markers', map.markers);
        console.log('shapes', map.shapes);
    })

    self.paths = "[[44.970752, -93.460334],[44.936040, -93.456338],[44.888953, -93.443258],[44.865451, -93.430035],[44.858567, -93.350890],[44.950392, -93.347491],[44.971007, -93.341178],[44.973755, -93.400902]]";

    self.onMapOverlayCompleted = function (e) {
        if (e.type == google.maps.drawing.OverlayType.MARKER) {
            var pos = e.overlay.getPosition();
            alert(pos.toString());
        }
    };

    self.searchData = function(value) {
        DataService.searchData(value);
    }

    self.getData = function () {
        DataService.getData();
    }
    //self.getData();

    // self.getInventory = function() {
    //     DataService.getInventory();
    // }
    // self.getInventory();

    // self.getAbsorption = function() {
    //     DataService.getAbsorption();
    // }
    // self.getAbsorption();

});