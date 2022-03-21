var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var rentalSchema = new Schema({rent: Number, sqft: Number, city: String,  pid: Number , _v: Number ,});
var Rental = mongoose.model('Rental', rentalSchema, 'rentals');

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
    Rental.find({} , null, {sort: {rent: +1}},  function(err, foundRentals) {
        if (err) {
            console.log('Error: ', err);
            res.sendStatus(500);
        } else {
            returnObj.listings = foundRentals;
            console.log(returnObj);
            res.json(returnObj);
            // res.send(foundRentals);
            console.log('get route worked');
            }
        }); //end FIND
}); //end GET route

//POST route
router.post('/', function(req, res) {
    var rentalToAdd = new Rental(req.body);
    console.log('rental posted', rentalToAdd);
    rentalToAdd.save(function(err, data){
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
    var rentalId = req.params.id;
    Rental.findByIdAndRemove({ "_id": rentalId }, function (err, data) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            res.sendStatus(200);
        }
    });
}); // END DELETE Route



module.exports = router; 