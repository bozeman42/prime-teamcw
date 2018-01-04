myApp.controller('PasswordResetController', function (UserService, $routeParams, $location) {

    function resetPassword() {
        UserService.resetPassword(vm.code, vm.password)
            .then(function () {
                alert('Password has been reset');
                $location.path('/login')
            });
    };

    var vm = this;
    vm.code = $routeParams.code;    
    vm.password = '';
    vm.resetPassword = resetPassword;
    
});
