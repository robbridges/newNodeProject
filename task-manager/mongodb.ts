


import mongodb = require('mongodb');


const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectId;

// const id = new ObjectID();

// console.log(id);

// console.log(id.getTimestamp());


const connectionUrl : string ='mongodb://127.0.0.1:27017';

const databaseName : string = 'task-manager'


MongoClient.connect(connectionUrl,  (error,client) => {
  if (error) {
    return console.log('Unable to connect to database!');
  }
  const db = client!.db(databaseName);

  // db.collection('users').findOne({ _id: new ObjectID("6152601c853ccb2fe493c20f") }, (error, user) => {
  //   if (error) {
  //     return console.log('Unable to find user');
  //   }
  //   console.log(user)
  // });

  // db.collection('users').find({name: 'Rob'}).count((error, count) => {
  //   console.log(count);
  // })

  db.collection('tasks').findOne({_id: new ObjectID("61512dcbf9633da7d253dbdb")}, (error, task) => {
    console.log(task);
  });

  db.collection('tasks').find({ completed: false}).toArray((error, tasks) => {
    console.log(tasks);
  })
})

