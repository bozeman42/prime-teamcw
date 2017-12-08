myApp.service('UserService', function ($http, $location) {
    console.log('UserService Loaded');
    var self = this;
    self.userObject = {};
    self.users = {data: []};

    self.getuser = function () {
        console.log('UserService -- getuser');
        $http.get('/user').then(function (response) {
            if (response.data.username) {
                // user has a curret session on the server
                self.userObject.userName = response.data.username;
                console.log('UserService -- getuser -- User Data: ', self.userObject.userName);
            } else {
                console.log('UserService -- getuser -- failure');
                // user has no session, bounce them back to the login page
                $location.path("/home");
            }
        }, function (response) {
            console.log('UserService -- getuser -- failure: ', response);
            $location.path("/home");
        });
    },

        self.logout = function () {
            console.log('UserService -- logout');
            $http.get('/user/logout').then(function (response) {
                console.log('UserService -- logout -- logged out');
                $location.path("/home");
            });
        }

    self.refreshUsers = function () {
        console.log('UserService -- refreshuser');
        $http.get('/user/refreshUser').then(function (response) {
            self.users.data = response.data;
        })
    }

    self.deleteUser = function (e_id) {
        $http.delete('/user/'+ e_id).then(function(response) {
            console.log('Deleted User');
            self.refreshUsers();
        }).catch(function(err) {
            console.log('Failed to delete user.');
        })
    }
});
