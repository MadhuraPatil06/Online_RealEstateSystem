myApp.controller('ListingController', function(RealtyService) {
    console.log('listing controller created');

    var listing = this;
    
    
    RealtyService.getListings();
    listing.listings = RealtyService.listings;

    // refreshListings();

    // function refreshListings() {
    //     RealtyService.getListings().then(function(response) {
    //         console.log("bhai",vm.listings);
    //         console.log("jelsda" , response.data);
    //         vm.listings = response.data.listings;
    //     });
    // }
    

    listing.deleteListing = function(listingId) {
        RealtyService.deleteListing(listingId);
    }
    listing.enquireListing = function(listingId) {
        RealtyService.enquireListing(listingId);
    }

})