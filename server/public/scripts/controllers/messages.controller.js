myApp.controller('MessagesController', function ($http, $location, UserService, DataService) {
    var self = this;
    self.userService = UserService;
    self.messages = DataService.comments;
    self.showMessage = false;
    self.selectedMessage = '';

    self.getComments = function() {
        DataService.getComments();
    }

    self.getComments();

    self.openMessage = function(message) {
        self.selectedMessage = message;
        self.showMessage = !self.showMessage;
    }

    self.deleteMessage = function(message) {
        DataService.deleteMessage(message).then(function(){
            swal("Message Deleted!", "This message has been removed", "success");
            self.showMessage = !self.showMessage;
            self.getComments();
        })
    }

});