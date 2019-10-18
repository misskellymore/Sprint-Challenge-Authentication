const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const model = require('../models/userModel.js');
const secret = require('../secrets/secret.js');




router.post('/register', validateUser, (req, res) => {
  // implement registration

  const user = req.body;

  const hash = bcrypt.hashSync(user.password, 8);

  user.password = hash;

  model.insert(user)
       .then(user => {

    const token = createToken(user)

    res.status(201).json({token});

  })

        .catch(err => {
          console.log(err)
          res.status(500).json({err: 'server err'});
        })


});

router.post('/login', (req, res) => {
  // implement login

  const {username, password} = req.body;

  model.findBy({username})
  .first()
  .then(user => {
    if (user && bcrypt.compareSync(password, user.password)) {

      const token = createToken(user);

      res.status(200).json({token});

    } else {

      res.status(401).json({message: 'invalid username and or pwd'})
    }
  })

  .catch(err => {

    res.status(500).json({err: 'server err'})
  })


});



// functions

function createToken(user) {

  const payload = {
    username: user.username
  }

  const options = {
    expiresIn: '1d'
  }

  return jwt.sign(payload, secret.JWT_SECRET, options);
}



function validateUser(req, res, next) {

  const {username, password} = req.body;

  if (username && password) {
    next();
  } else {
    res.status(400).json({message: 'enter username and pwd'})
  }
}


module.exports = router;
