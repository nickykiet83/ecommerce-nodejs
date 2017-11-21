var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
const port = 3000;
var ejs = require('ejs');
var engine = require('ejs-mate');

var app = express();

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

var mainRoutes = require('./routes/main');
var userRoutes = require('./routes/user');

app.use(mainRoutes);
app.use(userRoutes);


app.listen(port, function(err) {
    if (err) throw err;
    console.log("Server is Running at port: " + port);
});