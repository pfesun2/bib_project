
//mysql connection
var mysql = require("mysql");

//DB connection (clearDB)
//var connection;
//if (process.env.DATABASE_URL) {
//	  // DB is clearDB on Heroku
//	  connection = mysql.createConnection(process.env.DATABASE_URL);
//} else {
//    connection = mysql.createConnection({
//    //port    : 3306,
//    host    : 'us-cdbr-iron-east-04.cleardb.net',
//    user    : 'bae56c5bc919a5',
//    password: 'e3244ab9',
//    database: 'heroku_d6129f995c862b0'
//});
//}

//DB connection (MySQL)
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'web',
  password : '1234',
  database : 'petdb'
});

connection.connect();

//DB info
//var dbTable = "heroku_d6129f995c862b0.pet_info";
var dbTable = "petdb.pet_info";
var queryString = '';
var myhbsObject = '';  //for personal inro
var hbsObject = 0;    //for search 

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



const bodyParser= require("body-parser");
app.use(bodyParser.urlencoded({extended:true}))

app.get('/', function(req, res){
  res.render('index');
});


app.get('/search', function(req, res){
  
  var myEmail = req.query.email;
  var myZipcode = req.query.zipcode;

  //DB query
  var queryString = 'SELECT * FROM ' + dbTable + ' WHERE first_name = "'+ myEmail+ '" and zipcode = '+ myZipcode + ';';
  connection.query(queryString, function(err, res){
    if(err) {console.log(err);}
    //handlebar object
    myhbsObject = {myInfo: res};
  });
  res.render('search', myhbsObject);
});

app.get('/create', function(req, res){
  res.render('create');
});

app.get('/result',function(req,res){
  var FirstName = req.query.first_name;
  var LastName = req.query.last_name;
  var Address = req.query.address;
  var Zipcode = parseInt(req.query.zipcode.substr(0,3));
  var PetName = req.query.pet_name;
  var PetKind = parseInt(req.query.pet_kind);
  var Gender = req.query.gender;

  var queryString = 'SELECT * FROM ' + dbTable;
  if (FirstName){
    queryString+=' WHERE first_name = "' + FirstName + '"';
  }

  if (LastName){
    queryString+=' WHERE last_name = "' + LastName + '"';
  }

  if (Address){
    queryString+=' WHERE address = "' + Address + '"';
  }

  if (Zipcode){
    queryString+=' WHERE zipcode LIKE "' + Zipcode + '__"';
  }

  if (PetName){
    queryString+='and pet_name = "' + PetName + '" ';
  }

  if (PetKind){
    queryString+='and pet_kind = "' + PetKind + '" ';
  }

  if (Gender){
    queryString+='and gender = "' + Gender + '" ';
  }
  

  connection.query(queryString, function(err, res){
    if(err) {console.log(err);}
    
    hbsObject = {pet_info: res};
  });
  res.render('result', hbsObject);
});

app.post('/create', function(req, res){
  var myFirstName = req.body.first_name;
  var myLastName = req.body.last_name;
  var myAddress = req.body.address;
  var myZipcode = parseInt(req.body.zipcode);
  var myPetName = req.body.pet_name;
  var myPetKind = parseInt(req.body.pet_kind);
  var myGender = req.body.gender;

  var queryString = 'INSERT INTO '+ dbTable + 
        ' (first_name, last_name, address, zipcode, pet_name, pet_kind, gender) VALUES ("'+ 
        myFirstName + '", "' + myLastName + '", "' + myAddress + '", ' + myZipcode + ', "' +myPetName + '", ' +myPetKind + ', "' +myGender + '")';
        
  connection.query(queryString, function(err, res){
    if(err) {console.log(err);}
    console.log("db created!")
  });
  res.send('successfully registered');
  
});


app.put('/update',function(req, res){

});


app.delete('/delete', function(req, res){

});


var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Listening on " + port);
});

