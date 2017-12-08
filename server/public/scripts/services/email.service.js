myApp.service('EmailService', function ($http, $location,FileUploader) {
    console.log('EmailService Loaded');
    var self = this;
    
    self.uploader = new FileUploader({
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

    self.emailUpload = function() {
        self.uploader.uploadItem(0)
        $location.path('/email-list')

    }

});
