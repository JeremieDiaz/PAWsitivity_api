const express = require('express');
const router = express.Router();
const db = require('./db.js');


router.route('/register').post((req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const licenseID = req.body.licenseID;


  const sqlQuery = "INSERT INTO admin(name, email, password,licenseID) VALUES (?, ?, ?)";

  db.query(sqlQuery, [name, email, password,licenseID], function (error, data, fields) {
    if (error) {
      res.send(JSON.stringify({ success: false, message: error }));
    } else {
      res.send(JSON.stringify({ success: true, message: 'Admin registered successfully' }));
    }
  });
});

module.exports = router;
