//user

const express = require('express');
const router = express.Router();
const db = require('./db.js');

router.route('/register').post((req, res) => {
  var surname = req.body.surname;
  var first_name = req.body.first_name;
  var middle_name = req.body.middle_name;
  var suffix = req.body.suffix;
  var address = req.body.address;
  var sex = req.body.sex;
  var email = req.body.email;
  var contact = req.body.contact;
  var username = req.body.username;
  var password = req.body.password;
  var role = req.body.role;

  var sqlQuery = "INSERT INTO user(surname,first_name,middle_name,suffix,address,sex,email,contact,username,password,role) VALUES (?,?,?,?,?,?,?,?,?,?,?)";

  db.query(sqlQuery, [surname,first_name,middle_name,suffix,address,sex,email,contact,username,password,role], function (error, data, fields) {
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