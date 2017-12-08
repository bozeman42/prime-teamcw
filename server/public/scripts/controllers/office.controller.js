myApp.controller('OfficeController', function (UserService, OfficeService, $http) {
    console.log('OfficeController created');
    var self = this;
    self.userService = UserService;
    self.newOffice = {
        name: ''
    }
    self.offices = OfficeService.data;

    self.createOffice = function() {
        OfficeService.createOffice(self.newOffice);
    };

    self.getOffices = function() {
        OfficeService.getOffices();
    }

    self.getOffices();

});
