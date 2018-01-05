myApp.controller('PropertyController', function ($http, $location, UserService, NgMap, DataService) {
    var self = this;
    self.data = DataService.data;

    self.options = {
        state: location.hash.split('/')[2],
        market: decodeURIComponent(location.hash.split('/')[3]),
        year: location.hash.split('/')[4],
        quarter: location.hash.split('/')[5],
        id: location.hash.split('/')[6].split('?')[0]
    }

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

    self.getProperty = function () {
        DataService.getProperty(self.options);
    }
    self.getProperty();

    self.googleMapsUrl = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyA0orkvDxdwPUQAyigJ_9CAikHv5HhZxHc';

    NgMap.getMap("map").then(function (map) {
    })

    self.postComment = function(){
        if (!self.contactForm.email || !self.contactForm.first || !self.contactForm.last) {
            swal("Error!", "Please fill out all required fields", "error");
        } else {
            DataService.postComment(self.contactForm).then(function(){
                swal("Success!", "Your message has been sent", "success");
                self.contactForm = '';
            }).catch(function(){
                swal("Error!", "There was a problem sending your message. Please try again.", "error");
            })
            
        }
    }
});