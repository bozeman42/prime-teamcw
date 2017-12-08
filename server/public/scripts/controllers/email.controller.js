myApp.controller('EmailController', function (UserService, EmailService) {
    console.log('EmailController created');
    var self = this;
    self.userService = UserService;

    self.emailUpload = function() {
        EmailService.emailUpload();
    }
});
