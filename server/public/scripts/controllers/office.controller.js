myApp.controller('OfficeController', function (UserService, $http) {
    console.log('OfficeController created');
    var self = this;
    self.userService = UserService;
    self.newOffice = {
        name: ''
    }
    self.offices;

    self.createOffice = function() {
        $http.post('/office', self.newOffice).then(function(response){
            console.log('Succesfully created office', response);
        }).catch(function (err){
            console.log('Error creating office', err)
        })
    };

    self.getOffices = function() {
        $http.get('/office').then(function(response){
            console.log('Succesfully retrieved offices', response);
            self.offices = response.data;
        }).catch(function (err){
            console.log('Error retrieving offices', err)
        })
    }

    self.getOffices();

});
