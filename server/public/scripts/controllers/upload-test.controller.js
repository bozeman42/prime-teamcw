myApp.controller('UploadController',function(FileUploader){
    var vm = this;
    vm.fileToUpload = null;

    vm.uploader = new FileUploader();

    vm.uploader
});