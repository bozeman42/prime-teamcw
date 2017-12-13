myApp.controller('HomeController', function (NgMap, DataService, $location) {
    console.log('HomeController created');
    var self = this;
    self.data = DataService.data;

    self.googleMapsUrl = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBTMMoMR1gHMeJLiiZCuiH4xyQoNBPvMEY'
    NgMap.getMap().then(function(map){
        console.log(map.getCenter());
        console.log('markers', map.markers);
        console.log('shapes', map.shapes);
    })

    self.marker = {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: 'red',
        fillOpacity: .4,
        scale: 4.5,
        strokeWeight: 1,
        strokeColor: 'white'
    }
    
    self.click = function (event,id) {
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

        self.property = self.data.allProperties.filter(function(item){
            return item.X === id;
        })[0];
        console.log(self.property.Submarket);
        $location.path(`/market/${self.property.Submarket}/${year}/${quarter}`);

    };

    self.onMapOverlayCompleted = function (e) {
        if (e.type == google.maps.drawing.OverlayType.MARKER) {
            var pos = e.overlay.getPosition();
            alert(pos.toString());
        }
    };


    self.getAllProperties = function(){
        DataService.getAllProperties();
    }
    self.getAllProperties();
});