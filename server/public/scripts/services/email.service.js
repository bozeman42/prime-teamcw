myApp.service('EmailService', function ($http, $location) {
    console.log('EmailService Loaded');
    var self = this;
    
    self.emailUpload = function() {
        $location.path('/email-list')
    }

});
