myApp.service('EmailService', function ($http, UploadService) {
    console.log('EmailService created');
    var self = this;

    self.data = {
        contacts: []
    };

    self.uploaderOptions = {
        url: '/email/csv/',
        onSuccess: function(response, status, headers) {
            console.log('hey');
            self.getContacts(response.batchId);
        }
    };
    
    self.getContacts = function (batchId) {
        var config = {
            params: {
                batchId: batchId
            }
        };
        return $http.get('/email/', config)
            .then(function (response) {
                console.log('Get email list response:', response.data);
                self.data.contacts = response.data;
                return response.data;
            })
            .catch(function (error) {
                console.log('failed to get email list:', error);
            });
    };

    self.getContact = function (email_id,index) {
        var config = {
            params: {
                email_id: email_id,
                index: index
            }
        };
        console.log('single record config',config);
        return $http.get('/email/single/', config)
        .then(function(response){
            console.log('single email refresh',response)
            
            self.data.contacts[response.data.index] = response.data.contact;
        });
    }

    self.clickEmailLink = function(contact,index){
        console.log(contact);
        var config = {
            method: 'PUT',
            url: '/email/',
            params: {
                id: contact.email_id,
                index: index
            }
        };
        return $http(config)
        .then(function(response){
            console.log('click success');
            console.log('batch',response);
            self.getContact(response.data.email_id,response.data.index);
        });
    }
});