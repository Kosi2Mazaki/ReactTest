const path = require('path')
const express = require('express')
const app = express()
var MongoClient = require("mongodb").MongoClient


var url = 'mongodb://localhost:27017/TestProjectDB';

app.use((request, response, next) => {
  // console.log(request.headers)
  next()
})

app.get('/', function (req, res) {
  MongoClient.connect(url, function (err, db) {
    console.log("Connected successfully to server");

    db.close();
  });
  res.send('Hello World!')
})

// ERROR Handler
app.use((err, request, response, next) => {
  console.log(err)
  response.status(500).send('Ups! You have some nasty Error!')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})