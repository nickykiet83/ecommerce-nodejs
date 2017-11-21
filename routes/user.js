var router = require('express').Router();
var User = require('../models/user');

router.get('/signup', function(req, res) {
    res.render('accounts/signup', {
        errors: req.flash('errors')
    });
});

router.post('/signup', function(req, res, next) {
    var user = new User();

    user.profile.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    console.log(req.body);

    User.findOne({ email: req.body.email }, function(err, existingUser) {
        if (existingUser) {
            req.flash('errors', 'Account with that email address already exists');
            return res.redirect('/signup');
        } else {
            user.save(function(err) {
                if (err) return next(err);
        
                return res.redirect('/');
            });
        }
    });
});

module.exports = router;