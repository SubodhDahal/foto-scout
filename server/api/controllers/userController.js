'use strict';

var mongoose = require('mongoose'),
  jwt = require('jsonwebtoken'),
  User = mongoose.model('User'),
  bcrypt = require('bcrypt'),
  {validator,check,validationResult} = require('express-validator/check'),
  fs = require('fs');

exports.create_a_user = [

  check('firstname','firstname required').isLength({min: 1}),
  check('lastname','lastname required').isLength({min:1}),
  check('email','email required').isLength({min: 1}),
  check('email','valid email required').isEmail(),
  check('passcode','atleast 6 charater code is required').isLength({min: 6}),

  (req, res)=> {

    var errors = validationResult(req);

    //console.log(errors);
    var new_user = new User({'firstname': req.body.firstname,'lastname': req.body.lastname,'email': req.body.email,
      'passcode': req.body.passcode,'user_profile':{profile_pic: {}}});
    if (!errors.isEmpty()) {
      return res.status(400).send({errors: errors.array()});
    }
    User.findOne({
      email: req.body.email
    }, (e, user) => {
      if (!user) {

        console.log('creating user');
        new_user.passcode = bcrypt.hashSync(req.body.passcode, 10);
        new_user.save(function (err, new_user) {
          if (err) return res.status(500).send({message: 'We are having problem at the moment please try again later'});
          return new_user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send({
              status: 'success',
              tokens: new_user.tokens
            });
          }).catch((e) => {
            res.status(400).send(e);
          })
        })
      }
      else {
        return res.status(400).send({
          status: 'error',
          message: 'Account already exists'
        })
      }
    });
  }
];

exports.sign_in =[

  check('email','email required').isLength({min: 1}),
  check('email','valid email required').isEmail(),
  check('passcode','valid passcode is required').isLength({min: 6}),

  (req, res)=>{

    var errors = validationResult(req);

    //console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(400).send({errors: errors.array()});
    }
    User.findByCredentials(req.body.email, req.body.passcode).then((user) => {
      return user.generateAuthToken().then((token) => {
        res.header('x-auth', token).send({
          status: 'success',
          tokens: user.tokens
        });
      });
    }).catch((e) => {
      res.status(401).send({message: 'sorry cant find you'});
    });
  }
];

exports.user_profile = (req, res) =>{

  var token = req.header('x-auth');

  User.findByToken(token).then((user) => {
	if (!user) {
      return Promise.reject();
    }
    //console.log('working');
    res.send(user);
  }).catch((e) => {
    res.status(401).send();
  });
};

exports.profile_edit = [

  check('firstname', 'Firstname is required').isLength({min: 1}),
  check('lastname', 'Lastname is required').isLength({min: 1}),

  (req, res) => {
    var token = req.header('x-auth');

    User.findByToken(token).then((user) => {
      if (!user) {
        return Promise.reject();
      }

      //console.log('working');
      user.firstname = req.body.firstname;
      user.lastname = req.body.lastname;
      user.user_profile[0].about_me = req.body.about_me;

      user.save(function(err){
        //console.log('updating');
        if (err) {
          return res.status(500).send({
            status: 'error',
            message: 'Issues while updating profile. Please try again later.'
          })
        }

        res.send({
          status: 'success',
          user
        });
      })
    }).catch((e) => {
      res.status(401).send({message: 'unauthorised user'});
    });
  }
]

exports.set_profile_pic = (req,res) =>{

  var token = req.header('x-auth');
  User.findByToken(token).then((user) => {
    if (!user) {
      return Promise.reject();
    }
    console.log('working');
    var file = req.files[0],
      imageName = file.filename,
      filePath = file.path.replace("public\\", "").replace('public/', '');   // remove public\ from filepath
      //console.log(filePath);
      user.user_profile[0].profile_pic[0].path = filePath;
      user.user_profile[0].profile_pic[0].original_name = imageName;
      user.save(function(err){
      if(err){
        return res.status(400).send({message: 'We are having problem, please try again later'})
      }
       res.status(200).send({success: 'true', message: 'profile pic changes sucessfully'})
    });
  }).catch((e) => {
    res.status(401).send({message: 'unauthorised user'});
  });
};

exports.log_out =(req, res) => {

  var token = req.header('x-auth');

  User.findByToken(token).then((user) => {
    if (!user) {
      return Promise.reject();
    }
      //console.log('working');
      user.removeToken(token).then(() => {
        res.status(200).send({
         success: 'true', message: 'Bye bye user'});
     },() => {
      res.status(500).send({message:'sorry we ar currently having problem please try again'});
    });
  }).catch((e) => {
    res.status(401).send({message: 'achtung'});
  });
};
