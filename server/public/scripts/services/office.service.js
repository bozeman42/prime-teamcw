myApp.service('OfficeService', function ($http, $location) {
    console.log('OfficeService Loaded');
    var self = this;
    self.data = {
        offices: ''
    };
    self.userObject = {};
    self.editingOffice = false;
    self.officeToEdit = {
        name: '',
        id: ''
    }

    self.createOffice = function(value) {
        $http.post('/office', value).then(function(response){
            console.log('Succesfully created office', response);
            $location.path('/office')
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

    self.deleteOffice = function (office) {
        console.log(office);
        return $http.delete('/office/' + office.office_id).then(function(response){
            console.log('Office deleted');
        })
    }

    self.saveEditedOffice = function (office) {
        console.log(office);
        return $http.put('/office/' + office.id, self.officeToEdit).then(function(response){
            console.log('Office Edited');
            $location.path('/office');
        })
    }
});
