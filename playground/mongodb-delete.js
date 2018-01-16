const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server')
    } 
    console.log('Connected to MongoDB server on port 27017.');

    var query = {name: 'Cash Myers'};

    // deleteMany
    // db.collection('Todos').deleteMany(query).then((result) => {
    //     console.log(result);
    // });

    // deleteOne
    // db.collection('Todos').deleteOne(query).then((result) => {
    //     console.log(result);
    // })

    // findOneAndDelete
    // db.collection('Todos').findOneAndDelete(query).then((result) => {
    //     console.log(result);
    // });

    // deleteMany
    // db.collection('Users').deleteMany(query).then((result) => {
    //     console.log(result);
    // });

    // deleteOne
    db.collection('Users')
        .findOneAndDelete({_id: new ObjectID("5a5e5c3e5462bfbab49273ea") })
        .then((result) => {
            console.log(result);
    })

    // db.close();
}); 