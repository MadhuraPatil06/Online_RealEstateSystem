myApp.controller('RentalController', function(RealtyService) {
    console.log('Rental controller created');
   
    var rental = this;
   
    RealtyService.getRentals();
    rental.rentals = RealtyService.rentals; 
   
    rental.deleteRental = function(rentalId) {
        RealtyService.deleteRental(rentalId);console.log('rental result in service', self.rentals.result);
        console.log('delete');
    }

    rental.enquireRental = function(rentalId) {
        RealtyService.enquireRental(rentalId);
        console.log('Enquired Rental');
    }
    

    
})