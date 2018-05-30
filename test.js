var FirstName = "";
var LastName = "";
var Address = "";
var Zipcode = parseInt("30318".substr(0,3));
var PetName = '';
var PetKind = '';
var Gender = '';
var dbTable = "petdb.pet_info";

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

console.log(queryString);








