myApp.controller('DataUploadController', function ($location, DataService, UserService, UploadService) {
    var vm = this;
    var ds = DataService
    vm.uploader = UploadService.uploader;
    vm.uploaderOptions = {
        url: '/data/csv/',
        onSuccess: function (response, status, headers) {
            console.log('data uploaded');
        }
    };

    vm.dataUpload = function () {
        console.log('uploader options', vm.uploaderOptions);
        vm.uploader.uploadItem(0);
    };
});