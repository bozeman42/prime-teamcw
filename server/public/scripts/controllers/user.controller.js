myApp.controller('UserController', function (UserService, $location, $route) {
    var vm = this;
    vm.userService = UserService;
    vm.userObject = UserService.userObject;
    vm.users = UserService.users;

    UserService.refreshUsers();

    vm.editUser = function (user) {
        UserService.editUser(user);
    }

    vm.deleteUser = function (user) {
        UserService.deleteUser(user.e_id);
    }

    vm.newUser = function (user){
        UserService.editUser(null);
        $location.path('/register')
    }

    vm.requestPasswordChange = function () {
        if (vm.email) {
            UserService.requestPasswordChange(vm.email)
                .then(function () {
                    alert('An email has been sent regarding instructions on how to reset your password.');
                    $location.path('/login')
                })
        } else {
            alert('Email is required');
        }
    }
});
