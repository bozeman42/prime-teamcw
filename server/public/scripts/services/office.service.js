myApp.service('OfficeService', function ($http, $location) {
    console.log('OfficeService Loaded');
    var self = this;
    self.data = {
        offices: ''
    };
    self.userObject = {};

    self.createOffice = function(value) {
        $http.post('/office', value).then(function(response){
            console.log('Succesfully created office', response);
        }).catch(function (err){
            console.log('Error creating office', err)
        })
    };

    self.getOffices = function() {
        return $http.get('/office').then(function(response){
            self.data.offices = response.data;
            console.log('Succesfully retrieved offices', self.data);
            return self.data.offices;
        }).catch(function (err){
            console.log('Error retrieving offices', err)
        })
    }

});
