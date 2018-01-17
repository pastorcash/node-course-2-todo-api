const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result) => {
//   console.log(result);
// });

Todo.findOneAndRemove({query}).then((todo) => {
  console.log(todo);
});

Todo.findByIdAndRemove('5a5fb7edfcac10a0bdbefb60').then((todo) => {
  console.log(todo);
});