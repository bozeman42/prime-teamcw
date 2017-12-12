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

});