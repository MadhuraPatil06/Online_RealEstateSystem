var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var listingSchema = new Schema({cost: Number, sqft: Number, city: String, _v: Number , pid: Number});
var Listing = mongoose.model('Listing', listingSchema, 'listings');

//GET route
router.get('/', function(req, res) {
    Listing.find({}, null, {sort: {cost: +1}}, function(err, foundlistings) {
        if (err) {
            console.log('Error: ', err);
            res.sendStatus(500);
        } else {
            res.send(foundlistings);
            console.log('get route worked');
            }
        }); //end FIND
}); //end GET route

//POST route
router.post('/', function(req, res) {
    var listingToAdd = new Listing(req.body);
    console.log('req.body', req.body);
    console.log('listing posted', listingToAdd);
    listingToAdd.save(function(err, data){
        if(err) {
            console.log(err);
            res.sendStatus(500)
        } else {
            res.sendStatus(201);
        }
    })
})

// DELETE Route
router.delete('/:id', function (req, res) {
    var listingId = req.params.id;
    Listing.findByIdAndRemove({ "_id": listingId }, function (err, data) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            res.sendStatus(200);
        }
    });
}); // END DELETE Route

module.exports = router;