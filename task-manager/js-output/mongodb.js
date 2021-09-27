"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongodb = require("mongodb");
var MongoClient = mongodb.MongoClient;
var ObjectID = mongodb.ObjectId;
var id = new ObjectID();
console.log(id);
console.log(id.getTimestamp());
var connectionUrl = 'mongodb://127.0.0.1:27017';
var databaseName = 'task-manager';
MongoClient.connect(connectionUrl, function (error, client) {
    if (error) {
        return console.log('Unable to connect to database!');
    }
    var db = client.db(databaseName);
    db.collection('users').insertOne({
        _id: id,
        name: 'Whitney',
        age: 26
    }, function (error, result) {
        if (error) {
            return console.log('Unable to insert user');
        }
        console.log(result === null || result === void 0 ? void 0 : result.insertedId);
    });
    // db.collection('users').insertMany([
    //   {
    //     name: 'Jen',
    //     age: 28,
    //   },
    //   {
    //     name: "Ryann",
    //     age: 21,
    //   }
    // ], (error, result) => {
    //   if (error) {
    //     return console.log('unable to insert document');
    //   }
    //   console.log(result?.insertedIds);
    // })
    // db.collection('tasks').insertMany([
    //   {
    //     description: 'Study',
    //     completed: true
    //   },
    //   {
    //     description: 'Interview',
    //     completed: false,
    //   },
    //   {
    //     description: 'Succeed',
    //     completed: true,
    //   }
    // ], (error, result) => {
    //   if (error) {
    //     return console.log('error inserting documents');
    //   }
    //   console.log(result?.insertedIds);
    // })
});
