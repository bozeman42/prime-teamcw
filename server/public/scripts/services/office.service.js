myApp.service('OfficeService', function ($http, $location) {
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
            $location.path('/office')
        }).catch(function (err){
            console.log('Error creating office', err)
        })
    };

    self.getOffices = function() {
        return $http.get('/office').then(function(response){
            self.data.offices = response.data;
            return self.data.offices;
        }).catch(function (err){
            console.log('Error retrieving offices', err)
        })
    }

    self.deleteOffice = function (office) {
        return $http.delete('/office/' + office.office_id).then(function(response){
        })
    }

    self.saveEditedOffice = function (office) {
        return $http.put('/office/' + office.id, self.officeToEdit).then(function(response){
            $location.path('/office');
        })
    }
});
