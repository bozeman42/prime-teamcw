myApp.controller('LoginController', function ($http, $location, UserService) {
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
        office: 'Minneapolis'
    };
    vm.message = '';

    vm.superuser = true;

    vm.login = function () {

        if (vm.user.username === '' || vm.user.password === '') {
            vm.message = "Enter your username and password!";
        } else {
            $http.post('/', vm.user).then(function (response) {
                if (response.data.username) {
                    // location works with SPA (ng-route)
                    $location.path('/admin'); // http://localhost:5000/#/user
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
            $http.post('/register', vm.user).then(function (response) {
                $location.path('/login');
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
