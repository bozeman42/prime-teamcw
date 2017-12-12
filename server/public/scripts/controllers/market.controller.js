myApp.controller('MarketController', function (NgMap, DataService) {
    console.log('MarketController created');
    var self = this;
    self.marketData = DataService.data;
    self.marker = {
        url: '../styles/images/red.png'
    }

    self.googleMapsUrl = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBTMMoMR1gHMeJLiiZCuiH4xyQoNBPvMEY'
    NgMap.getMap().then(function (map) {
        console.log(map.getCenter());
        console.log('markers', map.markers);
        console.log('shapes', map.shapes);
    })

    self.onMapOverlayCompleted = function (e) {
        if (e.type == google.maps.drawing.OverlayType.MARKER) {
            var pos = e.overlay.getPosition();
            alert(pos.toString());
        }
    };

    self.searchData = function(value) {
        DataService.searchData(value);
    }

    // self.getData = function () {
    //     DataService.getData();
    // }
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