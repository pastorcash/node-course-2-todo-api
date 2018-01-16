const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server')
    } 
    console.log('Connected to MongoDB server on port 27017.');

    var query = {name: 'Cash Myers'};

//    db.collection('Todos').find(query).toArray().then((docs) => {
//         console.log('Todos');
//         console.log(JSON.stringify(docs, undefined, 2));
//    }, (err) => {
//         console.log('Unable to fetch todos', err);
//    });

// db.collection('Todos').find().count().then((count) => {
//     console.log(`Todos count: ${count}`);
// }, (err) => {
//     console.log('Unable to fetch todos', err);
// })

db.collection('Users').find(query).toArray().then((docs) => {
    console.log(JSON.stringify(docs, undefined, 2));
    // console.log(`Users count: ${count}`);
}, (err) => {
    console.log('Unable to fetch todos', err);
});


    // db.close();
}); 