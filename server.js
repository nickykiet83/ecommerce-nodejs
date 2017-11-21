var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
const port = 3000;
var app = express();

mongoose.connect('mongodb://root:123456@ds113906.mlab.com:13906/ecommerce', function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Connected to the database");
    }
});

//Middleware
app.use(morgan('dev'));

app.get('/', function (req, res) {
    let name = "Kiet Pham";
    res.json("My name is: " + name);
});

app.get('/catname', function(req, res) {
    res.json('batman');
});

app.listen(port, function(err) {
    if (err) throw err;
    console.log("Server is Running at port: " + port);
});