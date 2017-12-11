myApp.controller('UserController', function (UserService, $location, $route) {
    console.log('UserController created');
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
        $location.path('/register')
    }

    vm.checkEmailExist = function () {
        if (vm.forgotPwInfo.email === '' || vm.forgotPwInfo.email == 'undefined') {
            alert('Enter email');
        } else if (vm.forgotPwInfo.e_id === '' || vm.forgotPwInfo.e_id == 'undefined') {
            alert('Enter employee ID')
        } else {
            UserService.checkEmailExist(vm.forgotPwInfo);
        }
    }
});