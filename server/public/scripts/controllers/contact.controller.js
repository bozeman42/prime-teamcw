myApp.controller('ContactController', function ($location, UserService, DataService) {
    var self = this;
    self.userService = UserService;

    self.contactForm = {
        email: '',
        first: '',
        last: '',
        address: '',
        size: '',
        time: '',
        phone: '',
        notes: ''
    };

    self.postComment = function(){
        if (!self.contactForm.email) {
            swal("Error!", "Please fill out all required fields", "error");
        } else {
            DataService.postComment(self.contactForm).then(function(){
                swal("Success!", "Your message has been sent", "success");
                self.contactForm = '';
                $location.path('/home');
            }).catch(function(){
                swal("Error!", "There was a problem sending your message. Please try again.", "error");
            })
            
        }
    }

});