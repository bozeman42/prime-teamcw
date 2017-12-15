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
        markets: ''
    };
    self.userObject = {};

    //Retrieve State Dropdown on Homepage
    self.getStates = function () {
        return $http.get('/data/states').then(function (response) {
            self.data.states = response.data;
            console.log('Succesfully retrieved states', self.data.states);
        }).catch(function (err) {
            console.log('Error retrieving all states', err);
        });
    }

    //Retrieve Market Dropdown on Homepage
    self.getMarkets = function (value) {
        return $http.get(`/data/markets/${value}`).then(function (response) {
            self.data.markets = response.data;
            console.log('Succesfully retrieved markets', self.data.markets);
        }).catch(function (err) {
            console.log('Error retrieving all markets', err);
        });
    }

    //Retrieve data for table and inventory on Market Page
    self.getMarketData = function (value) {
        console.log('THIS IS THE MARKET DATA VALUE', value)
        return $http.get(`/data/all?state=${value.state}&year=${value.year}&quarter=${value.quarter}&market=${value.market}`).then(function (response) {
            self.data.data = response.data;
            console.log('Succesfully retrieved market data', response.data);
        }).catch(function (err) {
            console.log('Error retrieving market data', err)
        })
    }

    //Return time-based absorption information for chart
    self.getAbsorptionData = function (value) {
        return $http.get(`/data/absorption?state=${value.state}&market=${value.market}`).then(function (response) {
            self.data.inventory = response.data;
            console.log('Succesfully retrieved absorption', self.data.inventory);
        }).catch(function (err) {
            console.log('Error retrieving absorption', err)
        })
    }

    //Return time-based vacancy information for chart
    self.getVacancyData = function (value) {
        return $http.get(`/data/vacancy?state=${value.state}&market=${value.market}`).then(function (response) {
            self.data.vacancy = response.data;
            console.log('Succesfully retrieved vacancy', self.data.vacancy);
        }).catch(function (err) {
            console.log('Error retrieving vacancy', err)
        })
    }

    //Return properties for market page map
    self.getMarketPropertyData = function (value) {
        return $http.get(`/data/marketproperties?state=${value.state}&year=${value.year}&quarter=${value.quarter}&market=${value.market}`).then(function (response) {
            self.data.properties = response.data;
            console.log('Success', self.data.properties);
        }).catch(function (err) {
            console.log('Error retrieving property data', err)
        })
    }

});