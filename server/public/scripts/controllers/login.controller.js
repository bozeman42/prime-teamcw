myApp.controller('LoginController', function ($http, $location, UserService, OfficeService) {
    console.log('LoginController created');
    var vm = this;
    vm.userService = UserService;
    vm.user = {
        e_id: '',
        username: '',
        password: '',
        firstname: '',
        lastname: '',
        role: '',
        o_id: null,
        email: ''
    };
    vm.message = '';
    vm.getOffices = OfficeService.getOffices;
    vm.officeData = OfficeService.data;
    vm.getOffices();
    vm.superuser = true;

    vm.login = function () {
        if (vm.user.username === '' || vm.user.password === '') {
            vm.message = "Enter your username and password!";
        } else {
            $http.post('/', vm.user).then(function (response) {
                if (response.data.username) {
                    $location.path('/home'); 
                } else {
                    vm.message = "Please check your login credentials.";
                }
            }).catch(function (response) {
                vm.message = "Please check your login credentials.";
            });
        }
    };

    vm.registerUser = function () {
        if (vm.user.username === '' || vm.user.password === '') {
            vm.message = "Choose a username and password!";
        } else {
            if (vm.user.role == '' || vm.user.role == undefined) {
                vm.user.role = 'intern'
            }
            $http.post('/register', vm.user).then(function (response) {
                $location.path('/admin');
            }).catch(function (response) {
                console.log('LoginController -- registerUser -- error');
                vm.message = "Please try again."
            });
        }
    }

    vm.checkSuper = function () {
        $http.get('/register/checkSuper').then(function (response){
            if (response.data.length === 0){
            vm.superuser = false;
            }
        }).catch(function(err){
            console.log('Error getting users');
        })
    }

    vm.checkSuper();
});
