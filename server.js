var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
const port = 3000;
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
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/create-user', function(req, res, next) {
    var user = new User();

    user.profile.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;

    user.save(function(err) {
        if (err) next(err);

        res.json('Successfully created a new user');
    });
});

app.listen(port, function(err) {
    if (err) throw err;
    console.log("Server is Running at port: " + port);
});