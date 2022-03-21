var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var listingSchema = new Schema({cost: Number, sqft: Number, city: String, _v: Number , pid: Number});
var Listing = mongoose.model('Listing', listingSchema, 'listings');

const sessions = require('express-session');

var oneDay = 1000 * 60 * 60 * 24;
router.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));
var session ;

//GET route
router.get('/', function(req, res) {
    var returnObj = {};
    session = req.session;
    console.log(session);
    returnObj.sessions = session.admin ? session.admin : null;
    Listing.find({}, null, {sort: {cost: +1}}, function(err, foundlistings) {
        if (err) {
            console.log('Error: ', err);
            res.sendStatus(500);
        } else {
            returnObj.listings = foundlistings;
            console.log(returnObj);
            res.json(returnObj);
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