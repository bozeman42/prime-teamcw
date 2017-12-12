myApp.service('UploadService', function ($http,FileUploader) {
    console.log('UploadService Loaded');
    var self = this;
    
    self.uploader = new FileUploader({
        removeAfterUpload: true,
        filters: [{
            name: 'csv',
            fn: function(item) {
                return (item.name.match(/\.csv$/));
            }
        }]
    });
});
