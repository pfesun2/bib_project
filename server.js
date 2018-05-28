
//mysql connection
var mysql = require("mysql");

//DB connection (clearDB)
var connection;
if (process.env.DATABASE_URL) {
	  // DB is clearDB on Heroku
	  connection = mysql.createConnection(process.env.DATABASE_URL);
} else {
    connection = mysql.createConnection({
    //port    : 3306,
    host    : 'us-cdbr-iron-east-04.cleardb.net',
    user    : 'bae56c5bc919a5',
    password: 'e3244ab9',
    database: 'heroku_d6129f995c862b0'
});
}

//DB connection (MySQL)
//var connection = mysql.createConnection({
//  host     : 'localhost',
//  user     : 'web',
//  password : '1234',
//  database : 'petdb'
//});

connection.connect();


// DB query
var dbTable = "heroku_d6129f995c862b0.pet_info";
//var dbTable = "petdb.pet_info";
var queryString = 'SELECT * FROM ' + dbTable + ' LIMIT 10';
var hbsObject = 0;

connection.query(queryString, function(err, res){
  if(err) {
    console.log(err);
  }
  //handlebar object
  hbsObject = {pet_info: res};
  console.log("hbsObject: " + hbsObject);
});

connection.end();


//display
var express = require("express");
var app = express();

// Set Handlebars as the view engine
var hbs = require( 'express-handlebars' );
app.engine( 'handlebars', hbs( { 
  extname: 'handlebars', 
  defaultLayout: 'main', 
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/'
} ) );
app.set( 'view engine', 'handlebars' );


app.get('/', function(req, res){
  res.render('index', hbsObject);
});


var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Listening on " + port);
});


// Serve static content for the app from the 'public' directory
//app.use(express.static(process.cwd() + '/public'));


