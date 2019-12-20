const router = require('express').Router();
const model = require("./Auth-Model.js");

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/register', (req, res) => {
  // implement registration
  const username = req.body.username;
  const givenpassword = req.body.password;
  const rounds = process.env.SALT;
  bcrypt.hash(givenpassword, 8)
  .then(password=>{
    const body={
      username,
      password
    }
    model.insert(body)
    .then((id)=>{
      res.status(200).json({id})
    })
    .catch(err=>{
      console.log(err)
      res.status(500).json({err})
    })
  })
 
});

router.post('/login', (req, res) => {
  // implement login
  const body = req.body;

  model.loggin(body)
  .then(user=>{
    if(bcrypt.compareSync(body.password, user.password)){
      const token = SignToken(user)
      res.status(200).json({token,
        message: `succesfully logged in ${user.username}`})
    }else{
      res.status(500).json({message: "invalid credentials"})
    }
  })
  .catch(err=>{
    res.status(500).json({err})
  })
});


function SignToken(user){

  const payload={
    user: user.username
  }

  const secret = process.env.SECRET

  const options={
    expiresIn: "1h"
  }

  return jwt.sign(payload,secret,options)

}

module.exports = router;
