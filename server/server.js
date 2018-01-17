const {ObjectID} = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text,
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

// GET /todos/id
app.get('/todos/:id', (req, res) => {
  var id = req.params.id
  //validate id using isValid
    // stop function and respond with 404 & send back an empty body
    // eg: res.status(404).send();
  if (!ObjectID.isValid(id)) {
    return res.status(404).send(req.params.id + ' - ID not valid!');
  };

  // now Query the db using findById
    // success case
      // if todo found send back data
      // if no todo - ID not found send (404) & MT body
    // reject case
      // 400 - send back empty body
  Todo.findById(id).then((todo) => {
    if (!todo) {
      res.status(404).send(req.params.id + ' - ID not found'); 
    }
    res.send({todo});
  }).catch((e) => {
    res.status(400).sendStatus();
  });    
});

app.listen(3000, () => {
  console.log('Started on port 3000');
});

module.exports = {app};