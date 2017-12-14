myApp.controller('HomeController', function (NgMap, DataService, $location) {
    console.log('HomeController created');
    var self = this;

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
                self.allProperties = properties.map(function (property, index) {
                    return Object.assign(property, {marker: Object.assign({}, self.marker, {fillColor: self.locationColor[property.Submarket] || 'red'})}, {id: '' + index});
                });

            });
    }
    self.getAllProperties();
});