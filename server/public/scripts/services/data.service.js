myApp.service('DataService', function ($http, $location, $q) {
    console.log('DataService Loaded');
    var self = this;
    self.data = {
        data: '',
        inventory: '',
        vacancy: '',
        properties: '',
        allProperties: '',
        states: '',
        markets: '',
        property: ''
    };

    self.comments = {
        messages: ''
    }
    
    self.userObject = {};
    self.uploaderOptions = {
        property: {
            url: '/data/csv/property/',
            onSuccess: function(response, status, headers) {
                console.log('property data uploaded');
            }
        },
        city: {
            url: '/data/csv/city/',
            onSuccess: function(response, status, headers) {
                console.log('city data uploaded');
            }
        },
        dataset: {
            url: '/data/csv/dataset/',
            onSuccess: function(response, status, headers) {
                console.log('dataset data uploaded');
            }
        }
    };


    //Retrieve all properties
    self.getAllProperties = function() {
        // get the cache data instead of doing another call to the server
        if (self.data.allProperties) {
            return $q(function (resolve, reject) {
                resolve(self.data.allProperties);
            });
        }
    };

    //Retrieve State Dropdown on Homepage
    self.getStates = function () {
        return $http.get('/data/states').then(function (response) {
            self.data.states = response.data;
            console.log('Succesfully retrieved states', self.data.states);
        }).catch(function (err) {
            console.log('Error retrieving all states', err);
        });
    };

    //Retrieve Market Dropdown on Homepage
    self.getMarkets = function (value) {
        return $http.get(`/data/markets/${value}`).then(function (response) {
            self.data.markets = response.data;
            console.log('Succesfully retrieved markets', self.data.markets);
        }).catch(function (err) {
            console.log('Error retrieving all markets', err);
        });
    };

    //Retrieve data for table and inventory on Market Page
    self.getMarketData = function (value) {
        console.log('THIS IS THE MARKET DATA VALUE', value);
        console.log(`Request URL: /data/all?state=${value.state}&year=${value.year}&quarter=${value.quarter}&market=${value.market}`);
        return $http.get(`/data/all?state=${value.state}&year=${value.year}&quarter=${value.quarter}&market=${value.market}`).then(function (response) {
            self.data.data = response.data;
            console.log('Succesfully retrieved market data', response.data);
        }).catch(function (err) {
            console.log('Error retrieving market data', err);
        });
    };

    //Return time-based absorption information for chart
    self.getAbsorptionData = function (value) {
        return $http.get(`/data/absorption?state=${value.state}&market=${value.market}`).then(function (response) {
            self.data.inventory = response.data;
            console.log('Succesfully retrieved absorption', self.data.inventory);
        }).catch(function (err) {
            console.log('Error retrieving absorption', err);
        });
    };

    //Return time-based vacancy information for chart
    self.getVacancyData = function (value) {
        return $http.get(`/data/vacancy?state=${value.state}&market=${value.market}`).then(function (response) {
            self.data.vacancy = response.data;
            console.log('Succesfully retrieved vacancy', self.data.vacancy);
        }).catch(function (err) {
            console.log('Error retrieving vacancy', err);
        });
    };

    //Return properties for market page map
    self.getMarketPropertyData = function (value) {
        return $http.get(`/data/marketproperties?state=${value.state}&year=${value.year}&quarter=${value.quarter}&market=${value.market}`).then(function (response) {
            self.data.properties = response.data;
            console.log('Success', self.data.properties);
        }).catch(function (err) {
            console.log('Error retrieving property data', err);
        });
    };

    //Return properties for market page map
    self.getProperty = function (value) {
        return $http.get(`/data/propertydata?state=${value.state}&year=${value.year}&quarter=${value.quarter}&market=${value.market}&propid=${value.id}`).then(function (response) {
            self.data.property = response.data;
            console.log('Success', self.data.property);
        }).catch(function (err) {
            console.log('Error retrieving property data', err)
        })
    }

    //Post a comment on contact page
    self.postComment = function(value) {
        return $http.post(`/data/contact`, value).then(function (response){
        }).catch(function(err){
            console.log('Error posting comment', err);
        })
    }

    //Retrieve comments on administration page
    self.getComments = function() {
        $http.get(`/data/contact`).then(function(response){
            self.comments.messages = response.data;
            console.log('Success', self.comments.messages);
        }).catch(function(err){
            console.log('Error retrieving messages', err)
        })
    }

    //Delete a message from the Administration Messages view
    self.deleteMessage = function (message) {
        return $http.delete('/data/contact/' + message.id).then(function(response){
            console.log('Office deleted');
        }).catch(function(err){
            console.log('Error deleting message', err)
        })
    }

});
