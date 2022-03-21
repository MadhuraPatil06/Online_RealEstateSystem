myApp.service('RealtyService', function($http) {
    console.log('realty service sourced');

    var self = this;
    self.rentals = [];
    self.listings = [];

    self.getRentals = function() {
        return $http.get('/rental').then(function(response) {
            console.log('found rentals', response);
            self.rentals.result = response.data.listings;
            self.rentals.admin = response.data.sessions;
            console.log('rental result in service', self.rentals.result);
            return response;
        }).catch(function(err) {
            console.log('get didn\'t work!', err);
        })
    }

    self.getListings = function() {
        return $http.get('/listing').then(function(response) {
            console.log('found listings', response);
            self.listings.result = response.data.listings;
            self.listings.admin = response.data.sessions;
            console.log('listing result in service', self.listings.result);
            return response;
        }).catch(function(err) {
            console.log('get didn\'t work!', err);
        })
    }

    self.addListing = function(newListing) {
        console.log('new listing: ', newListing);
        if (newListing.type === "Rent") {
            var rentalToSend = {
                rent: newListing.cost,
                sqft: newListing.sqft,
                city: newListing.city,
                pid: newListing.pid
            }
            console.log('it\'s a rental!');
             return $http.post('/rental', rentalToSend).then(function(response) {
                console.log('new rental post', response)
                self.getRentals();
                return response;
            }).catch(function(err) {
                console.log('rental post didn\'t work!', err);
            })
        } else if (newListing.type === "Cost") {
            var listingToSend = {
                cost: newListing.cost,
                sqft: newListing.sqft,
                city: newListing.city,
                pid: newListing.pid
            }
            console.log('it\'s for sale!', listingToSend);
            return $http.post('/listing', listingToSend).then(function(response) {
                console.log('new listing post', response)
                self.getListings();
                return response;
            }).catch(function(err) {
                console.log('listing post didn\'t work!', err);
            })
        }
        newListing.cost = '';
        newListing.sqft = '';
        newListing.city = '';
    }

    self.deleteListing = function(listingId) {
        return $http.delete('/listing/' + listingId).then(function (response) {
            console.log('Success!');
            self.getListings();
            return response;
        }).catch(function (error) {
            console.log('Failure!');
        });
    }

    self.deleteRental = function(rentalId) {
        return $http.delete('/rental/' + rentalId).then(function (response) {
            console.log('Success!');
            self.getRentals();
            return response;
        }).catch(function (error) {
            console.log('Failure!');
        });
    }
})

