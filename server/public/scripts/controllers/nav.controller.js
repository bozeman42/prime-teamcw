myApp.controller('NavController',function(UserService) {
    var vm = this;
    vm.user = UserService;

    vm.logout = function() {
      UserService.logout()
    }
  });