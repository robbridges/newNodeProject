


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

  //find with callbacks below

  // db.collection('tasks').findOne({_id: new ObjectID("61512dcbf9633da7d253dbdb")}, (error, task) => {
  //   console.log(task);
  // });

  // db.collection('tasks').find({ completed: false}).toArray((error, tasks) => {
  //   console.log(tasks);
  // })

  // db.collection('users').updateOne({
  //   _id: new ObjectID("6152601c853ccb2fe493c20f"),
  // }, {
  //   $set: {
  //     name: 'Doug'
  //   }
  // }).then((result) => {
  //   console.log(result);
  // }).catch((error) => {
  //   console.log(error);
  // });


  // db.collection('users').updateOne({
  //   _id: new ObjectID("61512c72e3599696343f8680")
  // }, {
  //   $inc: {
  //     age: 1
  //   }
  // }).then((result) => {
  //   console.log(result);
  // }).catch((error) => {
  //   console.log(error);
  // });

  // db.collection('tasks').updateMany({
  //   completed: false,
  // }, {
  //   $set: {
  //     completed: true,
  //   }
  // }).then((result) => {
  //   console.log(result);
  // }).catch((error) => {
  //   console.log(error);
  // });


  // db.collection('users').deleteMany({
  //   age: 23,
  // }).then((result) => {
  //   console.log(result);
  // }).catch((error) => {
  //   console.log(error);
  // });

  // db.collection('users').deleteOne({
  //   _id: new ObjectID("61512c72e3599696343f867f")
  // }).then((result) => {
  //   console.log(result);
  // }).catch((error) => {
  //   console.log(error);
  // })

  db.collection('tasks').deleteOne({
    _id: new ObjectID("61512dcbf9633da7d253dbda")
  }).then((result) => {
    console.log(result);
  }).catch((error) => {
    console.log(error);
  });
})

