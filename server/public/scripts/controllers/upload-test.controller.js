myApp.controller('UploadController',function(FileUploader){
    var vm = this;
    vm.fileToUpload = null;
    
    vm.uploader = new FileUploader({
        url: '/email/csv/',
        onCompleteItem: function(fileItem, response, status, headers) {
            console.log('item complete',fileItem,response,status,headers);
        },
        onProgress: function(progress) {
            console.log('progress:',progress);
        },
        removeAfterUpload: true,
        filters: [{
            name: 'csv',
            fn: function(item) {
                return (item.name.match(/\.csv$/));
            }
        }]
    });

    vm.upload = function() {
        vm.uploader.uploadItem(0)
    };
});