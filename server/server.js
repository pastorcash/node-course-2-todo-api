const _ = require('lodash');
const {ObjectID} = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// ----- POST todos route ---- //
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

// ----- GET toods route ----- //
app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

// ----- GET /todos/id route ----- //
app.get('/todos/:id', (req, res) => {
  var id = req.params.id
  //validate id using isValid
  if (!ObjectID.isValid(id)) {
    return res.status(404).send(req.params.id + ' - ID not valid!');
  };

  // now Query the db using findById
  Todo.findById(id).then((todo) => {
    if (!todo) {
      res.status(404).send(req.params.id + ' - ID not found'); 
    }
    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });    
});

// ----- DELETE /todos/id route -----/
app.delete('/todos/:id',(req, res)=> {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send(req.params.id + ' - ID not valid!');
  };

  // remove todo by id  
  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo) {
      return res.status(404).send(req.params.id + ' - ID not found')
    }
      res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });    

});

// ----- PATCH todos route ----- //
app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send(req.params.id + ' - ID not valid!');
  };

  // if it is a boolean AND it is true ...
  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  };

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      return res.status(404).send(req.params.id + ' - ID not found');
    }
    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  })

})

// ----- Activate listener ----- //
app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};