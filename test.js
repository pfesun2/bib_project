//mysql connection
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'web',
  password : '1234',
  database : 'petdb'
});
 
connection.connect();

var dbTable = "petdb.pet_info";
var queryString = 'SELECT * FROM ' + dbTable + ' LIMIT 10';
var hbsObject = 0;

connection.query(queryString, function(err, res){
  if(err) {
    console.log(err);
  }
  hbsObject = {pet_info: res};
  console.log("hbsObject: " + hbsObject);
});

var express = require('express');
var app = express();
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
    defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');

connection.end();

app.get('/', function(req, res){
  res.json(hbsObject);
  //res.render('index', hbsObject);
});

var port = process.env.PORT || 3000;
app.listen(port);







