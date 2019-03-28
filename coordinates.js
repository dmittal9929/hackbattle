var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');


var filePath = path.join(__dirname, '\\Spaceports.csv');
// Read CSV
var f = fs.readFileSync(filePath, {encoding: 'utf-8'},
    function(err){console.log(err);});

// Split on row
f = f.split("\n");

// Get first row for column headers
headers = f.shift().split(",");

var json = [];
f.forEach(function(d){
    // Loop through each row
    tmp = {};
    row = d.split(",");
    for(var i = 0; i < headers.length; i++){
        tmp[headers[i]] = row[i];
    }
    // Add object to list
    json.push(tmp);
});

var coor = [];

for (var i =0 ; i<100 ; i++){
    coor[i]={"lat" : json[i]["Latitude"], "lon" : json[i]["Longitude"]}
}
console.log(coor);
app.get('/api/lat',function(req,res){
    res.json(coor)
});

app.listen(3000);
console.log('listening to port 3000');
