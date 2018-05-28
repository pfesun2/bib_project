//mysql connection
var express = require("express");
var mysql = require('mysql2');

var app = express();

var connection = mysql.createConnection({
    port    : 3306,
    host    : 'us-cdbr-east-04.cleardb.com',
    user    : 'b6d6c6e874',
    password: 'b3f7###',
    database: 'heroku_1daa39da0'
});

connection.connect(function(err) {
    if (err) {
      console.error('ERROR: MySQL connection error -- ' + err.stack + '\n\n');
      return;
    }
    console.log('Connected to MySQL database as id ' + connection.threadId + '\n\n');
  });






  /////////////////////////
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var port = process.env.PORT || 3000;

var app = express();

// Serve static content for the app from the 'public' directory
app.use(express.static(process.cwd() + '/public'));

app.use(bodyParser.urlencoded({ extended: false }));

// Override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

// Set Handlebars as the view engine
var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Import routes and give the server access to them
var routes = require('./controllers/burgers_controller.js');

app.use('/', routes);

app.listen(port);
