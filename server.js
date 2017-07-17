var http = require('http');
var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";
var path = require('path');
app.use(express.static(path.join(__dirname, 'front')));
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.listen(8080,function (req, res) {
	console.log('server started');
	app.get('/',function(req,res){
	 	res.sendFile(path.join(__dirname, '/front', 'index.html'))
	});
});

app.post('/locations', (req, res) => {
  	var name = req.body.location;
  	var long = req.body.long;
  	var lat = req.body.lat;
  	console.log(req.body);
  	var obj = {"name":name,"latitude":lat,"longitude":long};
  	MongoClient.connect(url, function(err, db) {
  		if (err) throw err;
  		insertLocation(obj,db);
  		res.send("success");
  	});
})


function insertLocation(obj,db){
	db.collection("locations").insertOne(obj, function(err, res) {
	    if (err) throw err;
	    console.log("1 record inserted");
	    db.close();
	});
}

