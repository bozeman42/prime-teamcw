myApp.service('UploadService', function ($http,FileUploader) {
    var self = this;
    
    self.uploader = new FileUploader({
        removeAfterUpload: true,
        onAfterAddingFile: function(item){

        },
        filters: [{
            name: 'csv',
            fn: function(item) {
                return (item.name.match(/\.csv$/));
            }
        }]
    });
});
