myApp.controller('IndexController', function(RealtyService) {
    console.log('index controller created');

    var index = this;

    index.newListing = {type: "Rent"};

    index.addListing = function(newListing) {
        console.log('new listing', newListing);
        RealtyService.addListing(newListing).then(function() {
            swal('Posted!', 'Your listing has posted.', "success");
        }).catch(function() {
            swal('Something went wrong.');
        })
    }
})