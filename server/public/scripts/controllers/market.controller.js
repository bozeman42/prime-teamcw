myApp.controller('MarketController', function ($location, $cookies, NgMap, EmailService, DataService, UserService, SubscribeService) {
    var self = this;
    var es = EmailService;
    self.marketData = DataService.data;

    self.options = {
        state: location.hash.split('/')[2],
        market: decodeURIComponent(decodeURIComponent(location.hash.split('/')[3])),
        year: location.hash.split('/')[4],
        quarter: location.hash.split('/')[5].split('?')[0]
    };

    //Retrieve markets for dropdown selection
    self.getMarkets = function (state) {
        DataService.getMarkets(state);
    };
    self.getMarkets(self.options.state);

    //Google Maps markers
    self.marker = {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: 'red',
        fillOpacity: 1,
        scale: 7.5,
        strokeWeight: 1,
        strokeColor: 'grey'
    };

    //Color options of Google Maps marker based on class
    self.locationColor = {
        'Class A': '#063C62',
        'Class B': '#0590AE',
        'Class C': '#BDBF2E',
    };

    // Tracks email clickthroughs
    self.emailTrack = function () {
        var queries = $location.search();

        if (queries.hasOwnProperty('eid')) {
            console.log('eid', queries.eid);
            es.emailClickthrough(queries.eid);
        }
    };

    //Dynamically places color on Google maps marker
    self.customMarker = function (location) {
        return Object.assign(self.marker, { fillColor: self.locationColor[location.Class] || 'red' });
    };

    let year = (new Date()).getFullYear();
    let month = (new Date()).getMonth() + 1;
    let quarter;
    function calcYear() {
        if (month === 1) {           
            year -= 1;
        }
    }
    calcYear();
    function calcQuarter() {
        if (month < 4) {
            quarter = 4
        } else if (month > 3 && month < 7) {
            quarter = 1
        } else if (month > 6 && month < 10) {
            quarter = 2
        } else if (month > 9) {
            quarter = 3
        }
    }
    calcQuarter();

    self.click = function (event, item) {
        item.year = location.hash.split('/')[4];
        item.quarter = location.hash.split('/')[5];
        self.selectedItem = item;
        SubscribeService.selectedItem = item;
    };

    self.close = function () {
        self.selectedItem = false;
        SubscribeService.selectedItem = false;
    }

    //Navigate to selected property page
    self.viewProperty = function () {
        if ($cookies.get('MCSubbed') === '' || $cookies.get('MCSubbed') == undefined || $cookies.get('MCSubbed') == false) {
            $location.path('/subscribeForm');
        } else if ($cookies.get('MCSubbed')) {
            $location.path(`/property/${self.selectedItem.State}/${encodeURIComponent(self.selectedItem.Submarket)}/${year}/${quarter}/${self.selectedItem.Property_Id}`);
        } else {
            alert('Something went wrong. Please refresh and try again.')
            $cookies.remove('MCSubbed');
        }
    }

    self.googleMapsUrl = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA0orkvDxdwPUQAyigJ_9CAikHv5HhZxHc`;
    NgMap.getMap("map").then(function (map) {
    })

    self.searchData = function (value) {
        self.getMarketData(value);
        self.getAbsorptionData(value);
        self.getVacancyData(value);
        self.getMarketPropertyData(value);
    }

    self.getMarketData = function (value) {
        DataService.getMarketData(value).then(function () {
            document.getElementById("inventoryChartContainer").innerHTML = "<canvas id='inventoryChart'></canvas>";
            let ctx = document.getElementById("inventoryChart").getContext("2d");
            let inventoryChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    datasets: [{
                        data: self.marketData.data.map(item => item.NRA),
                        backgroundColor: ['#063C62', '#0590AE', '#BDBF2E']
                    }],
                    labels: self.marketData.data.map(item => item.Class),
                }
            })
        })
    }

    self.getAbsorptionData = function (value) {
        DataService.getAbsorptionData(value).then(function () {
            document.getElementById("absorptionChartContainer").innerHTML = "<canvas id='absorptionChart'></canvas>";
            let ctx = document.getElementById("absorptionChart").getContext("2d");
            let year = [];
            let className = [];
            let dataObjects = [];

            //Object constructor for each type of building class to be plotted as a line
            let Item = function (data, label, fill) {
                this.data = data;
                this.label = label;
                this.fill = fill;
                this.borderColor = [];
                this.calcBorderColor = function () {
                    if (this.label === 'Class A') {
                        this.borderColor = ['#003865'];
                    } else if (this.label === 'Class B') {
                        this.borderColor = ['#0590AE'];
                    } else {
                        this.borderColor = ['#b5bd00'];
                    }
                };
            };

            //Create array of all years
            self.marketData.inventory.forEach(function (value) {
                if (year.indexOf(value.Time) < 0) {
                    year.push(value.Time);
                    year.sort();
                }
            });

            //Create array of all building Class Types
            self.marketData.inventory.forEach(function (value) {
                if (className.indexOf(value.Class) < 0) {
                    className.push(value.Class);
                    className.sort();
                }
            });

            //Add an object to an array for each building class type
            className.forEach(function (value) {
                let datapoint = new Item([], value, false);
                datapoint.calcBorderColor();
                dataObjects.push(datapoint);
            });

            //Add yearly absorption data to each building class object 
            self.marketData.inventory.forEach(function (value) {
                dataObjects.forEach(function (item) {
                    if (item.label === value.Class) {
                        item.data.push(value.Absorption);
                    }
                });
            });

            let absorptionChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: year,
                    datasets: dataObjects,
                }
            });

        });
    };

    self.getVacancyData = function (value) {
        DataService.getVacancyData(value).then(function () {
            document.getElementById("vacancyChartContainer").innerHTML = "<canvas id='vacancyChart'></canvas>";
            let ctx = document.getElementById("vacancyChart").getContext("2d");
            let year = [];
            let className = [];
            let dataObjects = [];

            //Object constructor for each type of building class to be plotted as a line
            let Item = function (data, label, fill) {
                this.data = data;
                this.label = label;
                this.fill = fill;
                this.backgroundColor = [];
                this.calcBackgroundColor = function () {
                    if (this.label === 'Class A') {
                        this.backgroundColor = ['#003865', '#003865', '#003865', '#003865', '#003865', '#003865', '#003865', '#003865', '#003865', '#003865'];
                    } else if (this.label === 'Class B') {
                        this.backgroundColor = ['#0590AE', '#0590AE', '#0590AE', '#0590AE', '#0590AE', '#0590AE', '#0590AE', '#0590AE', '#0590AE', '#0590AE'];
                    } else {
                        this.backgroundColor = ['#b5bd00', '#b5bd00', '#b5bd00', '#b5bd00', '#b5bd00', '#b5bd00', '#b5bd00', '#b5bd00', '#b5bd00', '#b5bd00'];
                    }
                };
            };

            //Create array of all years
            self.marketData.vacancy.forEach(function (value) {
                if (year.indexOf(value.Time) < 0) {
                    year.push(value.Time);
                    year.sort();
                }
            });

            //Create array of all building Class Types
            self.marketData.vacancy.forEach(function (value) {
                if (className.indexOf(value.Class) < 0) {
                    className.push(value.Class);
                    className.sort();
                }
            });

            //Add an object to an array for each building class type
            className.forEach(function (value) {
                let datapoint = new Item([], value, false);
                datapoint.calcBackgroundColor();
                dataObjects.push(datapoint);
            });

            //Add yearly absorption data to each building class object 
            self.marketData.vacancy.forEach(function (value) {
                dataObjects.forEach(function (item) {
                    if (item.label === value.Class) {
                        item.data.push(value.Squarefeet_Vacant);
                    }
                });
            });

            let vacancyChart = new Chart(ctx, {
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
            });
        });
    };

    self.getMarketPropertyData = function (value) {
        DataService.getMarketPropertyData(value).then(function (properties) {
            self.marketData.properties.map(function (property, index) {
                return Object.assign(property, { marker: Object.assign({}, self.marker, { fillColor: self.locationColor[property.Class] || 'red' }) }, { id: '' + index });
            });
        });
    };

    self.pageLoad = function (value) {
        self.getMarketData(value);
        self.getAbsorptionData(value);
        self.getVacancyData(value);
        self.getMarketPropertyData(value);
    };
    self.emailTrack();
    self.pageLoad(self.options);
});