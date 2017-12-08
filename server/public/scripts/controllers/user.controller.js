myApp.controller('UserController', function (UserService) {
    console.log('UserController created');
    var vm = this;
    vm.userService = UserService;
    vm.userObject = UserService.userObject;
    vm.users = UserService.users;

    UserService.refreshUsers();

    vm.editUser = function (user) {
        console.log(user);
    }

    vm.deleteUser = function (user) {
        UserService.deleteUser(user.e_id);
    }
});
