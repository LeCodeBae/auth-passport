const db = require('../models');
var bcrypt= require('bcrypt');
var jwt = require('jsonwebtoken');
let getAllUser = function (req, res){
  db.User.findAll({order: '"id" ASC'}).then((users)=>{
    res.send(users)
  })
}
let getUser = function(req, res){
  db.User.findOne({where: {id : req.params.id}})
  .then((user)=>{
    res.send(user)
  })
}
let createUser = function(req,res){
  db.User.create({
  username: req.body.username,
  password: bcrypt.hashSync(req.body.password, 10),
  role: req.body.role
  })
  .then((newuser)=>{
    res.send(newuser)
  })
}
let deleteUser= function(req,res){
  db.User.destroy({where: {id: req.params.id}}).then(()=>{
    db.User.findAll({order: '"id" ASC'}).then((users)=>{
      res.send(users)
    })
  })
}
let updateUser= function(req,res){
  let u = req.body.username
  let p = bcrypt.hashSync(req.body.password, 10)
  let r = req.body.role
  db.User.findOne({where: {id: req.params.id}})
  .then((user)=>{
    user.updateAttributes({
      username: u,
      password: p,
      role: r,
      updatedAt: new Date()
    })
    .then((user)=>{
      res.send(user)
    })
  })
}
let createToken= function(req, res){
  let user = req.user
      res.send(jwt.sign({
        id: user.id,
        username: user.username,
        role: user.role
      }, 'secret', {expiresIn: '1h'}))
}
let signUp= function(req,res){
  db.User.create({
  username: req.body.username,
  password: bcrypt.hashSync(req.body.password, 10)
  })
  .then((newuser)=>{
    res.send(newuser)
  })
}
module.exports={ 
  getAllUser, getUser, createUser, deleteUser, updateUser, createToken, signUp
}