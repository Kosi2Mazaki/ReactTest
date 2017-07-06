const path = require('path')
const express = require('express')
const app = express()
var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/TestProjectDB');

// Create a schema
var TestSchema = new mongoose.Schema({
  name: String,
  completed: Boolean,
  note: String,
  updated_at: { type: Date, default: Date.now },
});

// Create a model based on the schema
var DB = mongoose.model('DB', TestSchema);

app.use((request, response, next) => {
  // console.log(request.headers)
  next()
})

app.get('/', function (req, res) {
  var todo = new DB({ name: 'Master NodeJS', completed: false, note: 'Getting there...' });
  todo.save(function (err) {
    if (err) {
      console.log("You are fucked!");
    } else {
      console.log(todo);
    }
  })
  res.send(todo)
})

// ERROR Handler
app.use((err, request, response, next) => {
  console.log(err)
  response.status(500).send('Ups! You have some nasty Error!')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})