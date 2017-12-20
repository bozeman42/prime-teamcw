myApp.controller('HomeController', function (NgMap, DataService, $location, UserService) {
    console.log('HomeController created');
    var self = this;
    self.data = DataService.data;

    // UserService.refreshUsers();

    self.getStates = function() {
        DataService.getStates();
    }
    self.getStates();

    self.getMarkets = function(state) {
        DataService.getMarkets(state);
    }

    self.dropdown = function (state){
        if (state) {
            return true
        } 
        else {
            return false
        }
    }

    self.click = function (state, submarket) {
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

        $location.path(`/market/${state}/${encodeURIComponent(submarket)}/${year}/${quarter}`);
    };

});