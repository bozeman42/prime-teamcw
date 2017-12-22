myApp.controller('MessagesController', function ($http, $location, UserService, DataService) {
    console.log('MessagesController created');
    var self = this;
    self.userService = UserService;
    self.messages = DataService.comments;

    self.getComments = function() {
        DataService.getComments();
    }

    self.getComments();

});