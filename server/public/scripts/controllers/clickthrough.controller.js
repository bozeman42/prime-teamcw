myApp.controller('ClickthroughController', function(EmailService){
    console.log('ClickthroughController created');
    var vm = this;
    var es = EmailService;
    vm.data = es.data;

    vm.getClickthroughs = function() {
      es.getClickthroughs()
      .catch(function(error){
        alert('Failed to get clickthroughs',error);
      })
    }

    vm.getClickthroughs();
});