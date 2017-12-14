myApp.controller('HomeController', function (NgMap, DataService, $location) {
    console.log('HomeController created');
    var self = this;
    // self.allProperties = [];

    self.googleMapsUrl = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBTMMoMR1gHMeJLiiZCuiH4xyQoNBPvMEY'

    self.marker = {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: 'red',
        fillOpacity: .4,
        scale: 4.5,
        strokeWeight: 1,
        strokeColor: 'white'
    }
    
    self.click = function (event, submarket) {
        let year = (new Date()).getFullYear();
        let month = (new Date()).getMonth() + 1;
        let quarter;
        function calcQuarter(){
            if(month < 4){
                quarter = 4
            } else if(month > 3 && month < 7){
                quarter = 1
            } else if(month > 6 && month < 10){
                quarter = 2
            } else if(month > 9){
                quarter = 3
            }
        }
        calcQuarter();

        // self.property = self.allProperties.filter(function(item){
        //     return item.X === id;
        // })[0];
        $location.path(`/market/${submarket}/${year}/${quarter}`);
    };

    self.locationColor = {
        'Minneapolis CBD': 'darkgrey',
        'Southwest': 'blue',
        'West': 'yellow',
        'South/Airport': 'red',
        'Northwest': 'orange',
        'St. Paul CBD': 'lightgrey',
        'Northeast': 'green'
    }

    self.customMarker = function (location) {
        return Object.assign(self.marker, {fillColor: self.locationColor[location.Submarket] || 'red'})
    }

    self.onMapOverlayCompleted = function (e) {
        if (e.type == google.maps.drawing.OverlayType.MARKER) {
            var pos = e.overlay.getPosition();
            alert(pos.toString());
        }
    };


    self.getAllProperties = function(){
        DataService.getAllProperties()
            .then(function (properties) {
                console.log('properties');
                console.log(properties);

                // 

                // limit result to 10
                // properties.splice(0, properties.length - 10);
                
                self.allProperties = properties.map(function (property, index) {
                    return Object.assign(property, {marker: Object.assign({}, self.marker, {fillColor: self.locationColor[property.Submarket] || 'red'})}, {id: '' + index + property.X + property.Y + property.NRA});
                });

                /* use cluster
                var dynMarkers = [];
                NgMap.getMap().then(function(map) {

                    properties.forEach(function (property) {
                        var latLng = new google.maps.LatLng(property.X, property.Y);
                        var marker = new google.maps.Marker({position:latLng});

                        // marker.addListener('click', function (event) {
                        //     let year = (new Date()).getFullYear();
                        //     let month = (new Date()).getMonth() + 1;
                        //     let quarter;
                        //     function calcQuarter(){
                        //         if(month < 4){
                        //             quarter = 4
                        //         } else if(month > 3 && month < 7){
                        //             quarter = 1
                        //         } else if(month > 6 && month < 10){
                        //             quarter = 2
                        //         } else if(month > 9){
                        //             quarter = 3
                        //         }
                        //     }
                        //     calcQuarter();
                    
                        //     // self.property = self.allProperties.filter(function(item){
                        //     //     return item.X === id;
                        //     // })[0];
                        //     // console.log(self.property.Submarket);
                        //     // console.log(`/market/${submarket}/${year}/${quarter}`);
                        //     $location.path(`/market/${property.Submarket}/${year}/${quarter}`);
                        // });
                        dynMarkers.push(marker);
                    });

                    markerClusterer = new MarkerClusterer(map, dynMarkers, {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
    
                    // markerClusterer.addListener('click', function (event) {
                    //     console.log('cluster click');
                    // });

                    google.maps.event.addListener(markerClusterer, 'clusterclick', function(cluster) {
                        console.log(cluster);
                        console.log(cluster.getCenter());
                        console.log(cluster.getSize());
                        console.log(cluster.getMarkers());
                        console.log('cluster click');
                    });
                  });

                */
            });
    }
    self.getAllProperties();


    // NgMap.getMap().then(function (map) {
    //     self.map = map;

    //     map.addListener('center_changed', function() {
    //         // 3 seconds after the center of the map has changed, pan back to the
    //         // marker.
    //         window.setTimeout(function() {
    //           map.panTo(marker.getPosition());
    //         }, 3000);
    //       });
    // });
});