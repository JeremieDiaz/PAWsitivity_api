const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const userRouter = require('./user');
const adminRouter = require('./admin');

app.use('/user', userRouter);
app.use('/admin', adminRouter);

app.listen(3000, () => console.log('Your server is running on port 3000'));

//Db

const express=require('express');
var mysql=require('mysql');

var connection=mysql.createConnection
({
    host : 'localhost',
    user : 'root',
    password : '',
    port : '3306',        
    database : 'loginregister'  
});


connection.connect(function(err){
    if(err) throw err;
    console.log('db connected');
});


module.exports = connection;

//user

const express = require('express');
const router = express.Router();
const db = require('./db.js');

router.route('/register').post((req, res) => {
  var name = req.body.name;
  var email = req.body.email;
  var phone = req.body.phone;
  var password = req.body.password;

  var sqlQuery = "INSERT INTO user(name,email,phone,password) VALUES (?,?,?,?)";

  db.query(sqlQuery, [name, email, phone, password], function (error, data, fields) {
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