var jwt = require('jsonwebtoken');


let authenticateUser = function(req, res, next){
  jwt.verify(req.headers.token, 'secret', function(err, decoded){
    if (err){
      return err
    } else {
      next()
    }
  })
}

let authenticateAdmin = function(req, res, next){
  jwt.verify(req.headers.token, 'secret', function(err, decoded){
    console.log(decoded)
    if (err){
      return err
    } else if (!err && decoded.role === "admin"){
      next()
    } else {
      res.send( "You do not have access to this feature")
    }
  })
}

let authenticateUpdate = function(req, res, next){
  let id = Number(req.params.id)
  console.log(req.params.id)
  jwt.verify(req.headers.token, 'secret', function(err, decoded){
    if (err){
      return err
    } else if (decoded.id === id || decoded.role === 'admin'){
      next()
    } else {
      res.send( "You do not have access to this feature")
    }
  })
}

module.exports = {authenticateAdmin, authenticateUser, authenticateUpdate};