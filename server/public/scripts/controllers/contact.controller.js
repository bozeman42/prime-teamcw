myApp.controller('ContactController', function ($location, UserService, DataService) {
    console.log('ContactController created');
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
        if (!self.contactForm.email || !self.contactForm.first || !self.contactForm.last) {
            alert('Please complete all required fields')
        } else {
            DataService.postComment(self.contactForm);
            self.contactForm = '';
        }
    }

});