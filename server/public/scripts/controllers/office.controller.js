myApp.controller('OfficeController', function (UserService, OfficeService, $http, $location) {
    var self = this;
    self.userService = UserService;
    self.officeService = OfficeService;
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

    self.editOffice = function (office) {
        OfficeService.editingOffice = true;
        $location.path('/office-modify');
        OfficeService.officeToEdit.name = office.office;
        OfficeService.officeToEdit.id = office.office_id;
    }

    self.saveEditedOffice = function () {
        OfficeService.saveEditedOffice(OfficeService.officeToEdit).then(function() {
            self.getOffices();
          
            OfficeService.editingOffice = false;
        })
    }

    self.deleteOffice = function (office) {
        OfficeService.deleteOffice(office).then(function() {
            self.getOffices();
        })
    }
});