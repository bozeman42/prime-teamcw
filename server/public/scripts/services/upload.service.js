myApp.service('UploadService', function ($http,FileUploader) {
    console.log('UploadService Loaded');
    var self = this;
    
    self.uploader = new FileUploader({
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

});
