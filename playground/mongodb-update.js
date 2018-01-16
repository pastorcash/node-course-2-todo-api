const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server')
    } 
    console.log('Connected to MongoDB server on port 27017.');

    var query = {_id: new ObjectID('5a5e5da358e146c210d45369')};

    // findOneAndUpdate
      // db.collection('Todos').findOneAndUpdate({
      //   _id: new ObjectID('5a5e6b26d5d260c49c0ce109')
      //   }, { 
      //     $set: {
      //       completed: true
      //     }
      //   }, {
      //     returnOriginal: false
      //   })
      //   .then((result) => {
      //     console.log(result);
      // });
   
      db.collection('Users').findOneAndUpdate(query,
        {
          $set: {name: 'Cash Myers'},
          $inc: {age: 46}
        },
        {
          returnOriginal: false
        }
        )
        .then((result) =>{
          console.log(result);
        });

    // db.close();
}); 