var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
var mongoose = require('mongoose');

var port = process.env.PORT || 5000;
var rental = require('./routes/rental.router.js')
var listing = require('./routes/listing.router.js');

var oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));
var session ;



var mongoURI = '';

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
app.use(bodyParser.urlencoded({
    extended: true
  }));

  var Schema = mongoose.Schema;
  var enquireSchema = new Schema({name: String, phone: Number, email: String , pid: Number , comment:String});
  var Enquire = mongoose.model('enquires', enquireSchema, 'enquire');
  
  app.post('/enquire', function(req, res) {
      var enquiryToAdd = new Enquire(req.body);
      console.log('req.body', req.body);
      console.log('Enquiry posted', enquiryToAdd);
      enquiryToAdd.save(function(err, data){
          if(err) {
              console.log(err);
              res.sendStatus(500);
          } else {
              res.redirect('/');
          }
      })
  })
//routers
app.use('/rental', rental);
app.use('/listing', listing);
// app.use("/enquire", enquire);


//spin up server
app.listen(port, function() {
    console.log('listening on port', port);
})

//mongoose
var mongoose = require('mongoose');
const router = require('./routes/rental.router.js');
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

app.get("/enquiry" , (req, res) => {
    console.log("checkin");
    Enquire.find({}, function (err, result) {
        if (err){
            console.log(err);
        }
        else{
            console.log("dede");
            console.log(result);
                }
                res.json(result);
    });   
    

});

app.post("/login", (req,res) => {
        var enteredEmail = req.body.username;
        var enteredPass = req.body.password;
        console.log(enteredEmail,enteredPass);
        mongoose.connect('mongodb://localhost:27017/realestate', {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
        });
  
// User model



var userschema = new Schema({ username: String ,password:  String });
var User = mongoose.model('user', userschema, 'admin');

User.find({ username: enteredEmail}, function (err, result) {
    if (err){
        console.log(err);
    }
    else{
        console.log(result);
        if (result.length == 0) res.json( "No such user exists");
            else if (result[0].password != enteredPass) res.json( "Incorrect password" );
            else if (result[0].password == enteredPass) {
                session=req.session;
                session.admin=true; 
        }
            res.json("success");
    }
    
});         
                   
});

// Logout functionality
app.get('/logout',(req,res) => {
    console.log("logged out");
    req.session.destroy();
    res.redirect('/');
});