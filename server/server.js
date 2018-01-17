const {ObjectID} = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;

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

app.delete('/todos/:id',(req, res)=> {
  // get the id
  var id = req.params.id
  // validate id
    // if not valid return 404
  if (!ObjectID.isValid(id)) {
    return res.status(404).send(req.params.id + ' - ID not valid!');
  };


  // remove todo by id  
    // success
      // if no doc - send 404 
      // if doc back with 200
    // error
      // send 400 with MT body
  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo) {
      return res.status(404).send(req.params.id + ' - ID not found')
    }
      res.send({todo});
  }).catch((e) => {
    res.status(400).sendStatus();
  });    
  
});

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};