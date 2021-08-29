//PROBLEM STMT :GetAll: The API should return all the medicines in the database.

var http = require("http");
var express = require('express');
var app = express();
var mysql= require('mysql');
var bodyParser = require('body-parser');

//start mysql connection
var connection = mysql.createConnection({
  host     : 'localhost', 
  user     : 'root', 
  password : 'sheetal', 
  database : 'Health', 
  multipleStatements: true

});

connection.connect(function(err) {
  if (err) throw err
  console.log('You are now connected to DB!!!...')
})

app.use( bodyParser.json() );       
app.use(bodyParser.urlencoded({     
  extended: true
}));

//create app server
var server = app.listen(3000,  "127.0.0.1", function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

});

//rest api to get all results
app.get('/MedicineDataSet', function (req, res) {
   connection.query('select * from MedicineDataSet', function (error, results, fields) {
    if (error) throw error;
    res.send(results);

	});
});

//rest api to get a single  data
app.get('/MedicineDataSet/:c_name', function (req, res) {
   console.log(req);
   connection.query('select * from MedicineDataSet where c_name=?', [req.params.idUser], function (error, results, fields) {
    if (error) throw error
    res.send(results);

	});
});

app.post('/MedicineDataSet', function (req, res) {
   var postData  = req.body;
   connection.query('INSERT INTO MedicineDataSet SET ?', postData, function (error, results, fields) {
    if (error) throw error;
    res.send(results);

	});
});

app.put('/MedicineDataSet', function (req, res) {
   connection.query('UPDATE `MedicineDataSet` SET `c_name`=?,`c_batch_no`=?,`d_expiry_date`=? , `n_balance_qty`=?, `c_packaging`=?, `c_unique_code`=?, `c_schemes`=?, `n_mrp`=?,`c_manufacturer`=?,`hsn_code`=?,where `id`=?', [req.body.c_name,req.body.c_batch_no, req.body.d_expiry_date,req.body.n_balance_qty,req.body.c_packaging,req.body.c_unique_code,req.body.c_schemes,req.body.n_mrp,req.body.c_manufacturer,req.body.hsn_code,req.body.id], function (error, results, fields) {
    if (error) throw error;
    res.send(results);

	});
});

//rest api to delete record from database
app.delete('/MedicineDataSet', function (req, res) {
   console.log(req.body);
   connection.query('DELETE FROM `MedicineDataSet` WHERE `id`=?', [req.body.id], function (error, results, fields) {
	  if (error) throw error;
	  res.end('Record has been deleted!');
	});
});