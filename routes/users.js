var express = require('express');
var router = express.Router();
var jwtHelper = require('../helpers/jwt_helpers');
var jwt = require('jsonwebtoken');
var api = require('../controllers/userController')
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
var db = require('../models')
var app = express()
var bcrypt = require('bcrypt')


passport.use(new LocalStrategy(
  function(username, password, done) {
    console.log(username)
    db.User.findOne({where: { username: username }}).then(function (user) {
      if(bcrypt.compare(password, user.password))
      done(null, user)
    }) ;
  }
));
app.use(passport.initialize());
/* GET users listing. */
router.post('/signup', api.signUp)
router.post('/signin', passport.authenticate('local', {session: false}), api.createToken)
router.get('/users', jwtHelper.authenticateAdmin, api.getAllUser)
router.get('/users/:id', jwtHelper.authenticateUser, api.getUser)
router.post('/users',jwtHelper.authenticateAdmin, api.createUser)
router.delete('/users/:id',jwtHelper.authenticateAdmin, api.deleteUser)
router.put('/users/:id',jwtHelper.authenticateUpdate, api.updateUser)

module.exports = router;
