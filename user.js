//user

const express = require('express');
const router = express.Router();
const db = require('./db.js');

router.route('/register').post((req, res) => {
  var IDclient = req.body.IDclient;
  var surname = req.body.surname;
  var fname = req.body.fname;
  var lname = req.body.lname;
  var mname = req.body.mname;
  var address = req.body.address;
  var suffix = req.body.suffix;
  var sex = req.body.sex;
  var contactNumber = req.body.contactNumber;
  var password = req.body.password;
  var email = req.body.email;
  var role = req.body.role;

  var sqlQuery = "INSERT INTO user(IDclient,surname,fname,lname,mname,address,suffix,sex,contactNumber,password,email,role) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";

  db.query(sqlQuery, [IDclient,surname,fname,lname,mname,address,suffix,sex,contactNumber,password,email,role], function (error, data, fields) {
    if (error) {
      res.send(JSON.stringify({ success: false, message: error }));
    } else {
      res.send(JSON.stringify({ success: true, message: 'User registered successfully' }));
    }
  });
})


router.route('/login').post((req, res) => {
    var email = req.body.email;
    var password = req.body.password;
  
    var sql = "SELECT * FROM user WHERE email=? AND password=?";
  
    if (email != "" && password != "") {
      db.query(sql, [email, password], function (err, data, fields) {
        if (err) {
          res.send(JSON.stringify({ success: false, message: err }));
        } else {
          if (data.length > 0) {
            res.send(JSON.stringify({ success: true, user: data }));
          } else {
            res.send(JSON.stringify({ success: false, message: 'Empty Data' }));
          }
        }
      });
    } else {
      res.send(JSON.stringify({ success: false, message: 'Email and password required!' }));
    }
  });
  
  module.exports = router;


module.exports =router;