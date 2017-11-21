var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
const port = 3000;
var ejs = require('ejs');
var engine = require('ejs-mate');

var app = express();

var User = require('./models/user');

mongoose.connect('mongodb://root:123456@ds113906.mlab.com:13906/ecommerce', function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Connected to the database");
    }
});

//Middleware
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.engine('ejs', engine);
app.set('view engine', 'ejs');

app.post('/create-user', function(req, res, next) {
    var user = new User();

    user.profile.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;

    user.save(function(err) {
        if (err) return next(err);

        res.json('Successfully created a new user');
    });
});

app.get('/', function (req, res){
    res.render('main/home');
});

app.get('/about', function(req, res) {
    res.render('main/about');
});

app.listen(port, function(err) {
    if (err) throw err;
    console.log("Server is Running at port: " + port);
});