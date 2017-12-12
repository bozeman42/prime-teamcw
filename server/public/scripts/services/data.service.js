myApp.service('DataService', function ($http, $location) {
    console.log('DataService Loaded');
    var self = this;
    self.data = {
        data: '',
        inventory: ''
    };
    self.userObject = {};

    self.getData = function () {
        //All Data
        $http.get('/data/all').then(function (response) {
            self.data.data = response.data;
            console.log('Succesfully retrieved market data', self.data);

        }).catch(function (err) {
            console.log('Error retrieving market data', err)
        })
    }

    self.getInventory = function () {
        //Inventory Chart
        $http.get('/data/inventory').then(function (response) {
            self.data.inventory = response.data;
            console.log('Succesfully retrieved inventory', self.data.inventory);

            let ctx = document.getElementById("inventoryChart").getContext("2d");
            let inventoryChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    datasets: [{
                        data: response.data.map(x => x.buildings),
                        backgroundColor: ['#003865', '#9bd3dd', '#b5bd00']
                    }],
                    labels: response.data.map(x => x.Property_SubType),
                },
            })

        }).catch(function (err) {
            console.log('Error retrieving inventory', err)
        })
    }

    self.getAbsorption = function () {
        //Inventory Chart
        $http.get('/data/absorption').then(function (response) {
            self.data.inventory = response.data;
            console.log('Succesfully retrieved absorption', self.data.inventory);
            let ctx = document.getElementById("absorptionChart").getContext("2d");
            let year = [];
            let className = [];
            let dataObjects = [];

            //Object constructor for each type of building class to be plotted as a line
            let Item = function( data, label, fill ){
                this.data = data,
                this.label = label,
                this.fill = fill
                this.borderColor = '#003865'
            }

            //Create array of all years
            response.data.forEach(function (value) {
                if (year.indexOf(value.Year) < 0) {
                    year.push(value.Year);
                    year.sort();
                }
            });

            //Create array of all building Class Types
            response.data.forEach(function (value){
                if (className.indexOf(value.Property_SubType) < 0){
                    className.push(value.Property_SubType);
                    className.sort();
                }
            })

            //Add an object to an array for each building class type
            className.forEach(function (value){
                let datapoint = new Item([], value, false);
                dataObjects.push(datapoint);
            })

            //Add yearly absorption data to each building class object 
            response.data.forEach(function(value){
                dataObjects.forEach(function(item){
                    if (item.label === value.Property_SubType){
                        item.data.push(value.absorption);
                    }
                })
            })

            let absorptionChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: year,
                    datasets: dataObjects,
                }
            })

        }).catch(function (err) {
            console.log('Error retrieving absorption', err)
        })
    }


});
