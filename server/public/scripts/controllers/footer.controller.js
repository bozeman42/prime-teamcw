myApp.controller('FooterController',function(UserService) {
    var vm = this;
    vm.user = UserService;

    vm.logout = function (user){
        UserService.logout(user)
    }
  });