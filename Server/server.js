var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');

var port = process.env.PORT || 5000;
var rental = require('./routes/rental.router.js')
var listing = require('./routes/listing.router.js');
var session ;
// var user = require("./routes/user.router.js");  

var mongoURI = '';
// process.env.MONGODB_URI will only be defined if you
// are running on Heroku
if(process.env.MONGODB_URI != undefined) {
    // use the string value of the environment variable
    mongoURI = process.env.MONGODB_URI;
} else {
    // use the local database server
    mongoURI = 'mongodb://localhost:27017/realestate';
}


//app.use
app.use(bodyParser.json());
app.use(express.static('server/public'));


//routers
app.use('/rental', rental);
app.use('/listing', listing);
// app.use('/user', user)

//spin up server
app.listen(port, function() {
    console.log('listening on port', port);
})

//mongoose
var mongoose = require('mongoose');
// 27017 is the default mongo port number

mongoose.connection.on('connected', function() {
    console.log('mongoose is connected!');
});

mongoose.connection.on('error', function() {
    console.log('mongoose connection failed');
});
mongoose.connect(mongoURI);
// Eventually, the mongoose code should be in a module

// Login
app.get("/login", (req, res) => {
    res.sendFile(__dirname+'Public/login.html');
});

app.post("/login", (req,res) => {
        var enteredEmail = req.body.username;
        var enteredPass = req.body.password;
        mongoose.connect('mongodb://localhost:27017/realestate', {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
        });
  
// User model
const User = mongoose.model('admin', {
    username: { type: String },
    password: { type: String }
});
  
User.find({ username: enteredEmail}, function (err, result) {
    if (err){
        console.log(err);
    }
    else{
        if (result.length == 0) res.json( "No such user exists");
            else if (result[0].password != enteredPass) res.json( "Incorrect password" );
            else if (result[0].password == enteredPass) {
                session=req.session;
                session.userid= req.body.username ;
            }
    }
    res.json("success");
});         
                   
});




// Logout functionality
app.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/');
});