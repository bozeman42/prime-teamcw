myApp.service('DataService', function ($http, $location) {
    console.log('DataService Loaded');
    var self = this;
    self.data = {
        data: '',
        inventory: '',
        vacancy: '',
        properties: ''
    };
    self.userObject = {};

    self.searchData = function(value) {
        let coords = [];
        //Properties locations for map       
        $http.get(`/data/properties?year=${value.year}&quarter=${value.quarter}&market=${value.market}`).then(function(response) {
            self.data.properties = response.data;
            console.log('Succesfully retrieved property data', response.data);
            response.data.forEach(function(item){
                coords.push([item.X, item.Y]);
            })
            console.log('TESTING HERE', coords);
            self.data.properties = coords;
            console.log('TESTING OBJECT', self.data.properties);
        }).catch(function (err) {
            console.log('Error retrieving property data', err)
        })

        //Table and Inventory Chart        
        $http.get(`/data/all?year=${value.year}&quarter=${value.quarter}&market=${value.market}`).then(function(response) {
            self.data.data = response.data;
            console.log('Succesfully retrieved market data', response.data);
            let ctx = document.getElementById("inventoryChart").getContext("2d");
            let inventoryChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    datasets: [{
                        data: response.data.map(item => item.Total_Buildings),
                        backgroundColor: ['#003865', '#9bd3dd', '#b5bd00']
                    }],
                    labels: response.data.map(item => item.Class),
                },
            })
        }).catch(function (err) {
            console.log('Error retrieving market data', err)
        })

        //Absorption Chart
        $http.get(`/data/absorption?market=${value.market}`).then(function (response) {
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
                this.fill = fill,
                this.borderColor = [],
                this.calcBorderColor = function() {
                    console.log('TESTING BORDER LABELs', this.label);
                    if(this.label === 'Class A'){
                        this.borderColor = ['#003865'];
                    } else if(this.label === 'Class B'){
                        this.borderColor = ['#9bd3dd'];
                    } else{
                        this.borderColor = ['#b5bd00'];
                    }
                }
            }

            //Create array of all years
            response.data.forEach(function (value) {
                if (year.indexOf(value.Time) < 0) {
                    year.push(value.Time);
                    year.sort();
                }
            });

            //Create array of all building Class Types
            response.data.forEach(function (value){
                if (className.indexOf(value.Class) < 0){
                    className.push(value.Class);
                    className.sort();
                }
            })

            //Add an object to an array for each building class type
            className.forEach(function (value){
                let datapoint = new Item([], value, false);
                datapoint.calcBorderColor();
                dataObjects.push(datapoint);
            })

            //Add yearly absorption data to each building class object 
            response.data.forEach(function(value){
                dataObjects.forEach(function(item){
                    if (item.label === value.Class){
                        item.data.push(value.Absorption);
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

        //Vacancy Chart
        $http.get(`/data/vacancy?market=${value.market}`).then(function (response) {
            self.data.vacancy = response.data;
            console.log('Succesfully retrieved vacancy', self.data.vacancy);
            let ctx = document.getElementById("vacancyChart").getContext("2d");
            let year = [];
            let className = [];
            let dataObjects = [];

            //Object constructor for each type of building class to be plotted as a line
            let Item = function( data, label, fill ){
                this.data = data,
                this.label = label,
                this.fill = fill,
                this.backgroundColor = [],
                this.calcBackgroundColor = function() {
                    if(this.label === 'Class A'){
                        this.backgroundColor = ['#003865','#003865','#003865','#003865','#003865','#003865','#003865','#003865','#003865','#003865'];
                    } else if(this.label === 'Class B'){
                        this.backgroundColor = ['#9bd3dd','#9bd3dd','#9bd3dd','#9bd3dd','#9bd3dd','#9bd3dd','#9bd3dd','#9bd3dd','#9bd3dd','#9bd3dd'];
                    } else{
                        this.backgroundColor = ['#b5bd00','#b5bd00','#b5bd00','#b5bd00','#b5bd00','#b5bd00','#b5bd00','#b5bd00','#b5bd00','#b5bd00'];
                    }
                }
            }

            //Create array of all years
            response.data.forEach(function (value) {
                if (year.indexOf(value.Time) < 0) {
                    year.push(value.Time);
                    year.sort();
                }
            });

            //Create array of all building Class Types
            response.data.forEach(function (value){
                if (className.indexOf(value.Class) < 0){
                    className.push(value.Class);
                    className.sort();
                }
            })

            //Add an object to an array for each building class type
            className.forEach(function (value){
                let datapoint = new Item([], value, false);
                datapoint.calcBackgroundColor();
                dataObjects.push(datapoint);
            })

            //Add yearly absorption data to each building class object 
            response.data.forEach(function(value){
                dataObjects.forEach(function(item){
                    if (item.label === value.Class){
                        item.data.push(value.Squarefeet_Vacant);
                    }
                })
            })

            let absorptionChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: year,
                    datasets: dataObjects,
                },
                options: {
                    scales: {
                      yAxes: [{
                        stacked: true,
                        ticks: {
                          beginAtZero: false
                        }
                      }],
                      xAxes: [{
                        stacked: true,
                        ticks: {
                          beginAtZero: true
                        }
                      }]
                
                    }
                  }
            })

        }).catch(function (err) {
            console.log('Error retrieving absorption', err)
        })
        

    }

});
