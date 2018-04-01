myApp.controller('HomeController', function (NgMap, DataService, EmailService, $location, UserService) {
    var self = this;
    var es = EmailService;
    self.data = DataService.data;
    self.userService = UserService;

    UserService.refreshUsers();
    UserService.getuser();

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
        // This is a hacky fix for this not working when you don't have current
        // data. How I would fix this if I were to continue work on this project
        // is to find the most current reports and default to that, rather than
        // depending on data arriving in time for the application not to break.
        const hackyDateFix = new Date('December 10, 2017');
        let year = hackyDateFix.getFullYear();
        let month = hackyDateFix.getMonth() + 1;
        let quarter;
        function calcYear() {
            if (month === 1) {           
                year -= 1;
            }
        }
        calcYear();
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

    // Tracks email clickthroughs
    self.emailTrack = function () {
        var queries = $location.search();

        if (queries.hasOwnProperty('eid')) {
            es.emailClickthrough(queries.eid);
        }
    };

    self.emailTrack();

});