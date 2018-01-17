const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// // 5a5f7ce5ee9b0ff11b5e5d7f
// var id = '5a5f7ce5ee9b0ff11b5e5d7f11'; 

// if (!ObjectID.isValid(id)) {
//   console.log('Id not valid');
// };

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Matching Todos: ',todos);
// });

// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('One Todo: ',todo);
// });

// Todo.findById(id).then((todo) => {
//   if (!todo) {
//     return console.log('Id not found');
//   }
//   console.log('Todo by ID: ',todo);
// }).catch((e) => console.log(e));

var id = '5a5e8995a122adc8a4582a10'; 

User.findById(id).then((user) => {
  if (!user) {
    return console.log('User not found');
  }
  console.log('User by ID: ', user);
}).catch((e) => console.log(e));