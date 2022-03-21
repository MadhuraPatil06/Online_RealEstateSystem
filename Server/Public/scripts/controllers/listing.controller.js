myApp.controller('ListingController', function(RealtyService) {
    console.log('listing controller created');

    var vm = this;
    
    vm.listings = RealtyService.listings; 
    refreshListings();

    // Question: Why did I have to move this into a new function instead of just calling RealtyService.getListings?
    function refreshListings() {
        RealtyService.getListings().then(function(response) {
            vm.listings = response.data;
        });
    }
    

    vm.deleteListing = function(listingId) {
        RealtyService.deleteListing(listingId);
    }
    vm.enquireListing = function(listingId) {
        RealtyService.enquireListing(listingId);
    }

})