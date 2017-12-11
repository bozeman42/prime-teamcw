myApp.controller('EmailController', function (UserService, $location, UploadService) {
    console.log('EmailController created');
    var self = this;
    self.userService = UserService;
    
    self.uploaderOptions = {
        url: '/email/csv/'
    };

    self.uploader = UploadService.uploader;

    self.emailUpload = function() {
        self.uploader.uploadItem(0);
        $location.path('/email-list');
    };
    
});
