myApp.service('UploadService', function ($http,FileUploader) {
    console.log('UploadService Loaded');
    var self = this;
    
    self.uploader = new FileUploader({
        removeAfterUpload: true,
        onAfterAddingFile: function(item){
            console.log('Added item to queue',item);
            console.log('queue',this.queue);
        },
        filters: [{
            name: 'csv',
            fn: function(item) {
                return (item.name.match(/\.csv$/));
            }
        }]
    });
});
