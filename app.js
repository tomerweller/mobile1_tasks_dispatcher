var express = require('express')
    , MongoClient = require('mongodb').MongoClient
    , app = express()
    , port = process.env.PORT || 5000
    , tasksCollection = null;

MongoClient.connect(process.env.MONGO_DB_URL, function(err, db) {
    if(!err) {
        console.log("mongo connection: success");
        tasksCollection = db.collection('tasks');
    } else {
        console.log("mongo connection: err: ", err);
    }
});

app.get('/task/random', function(req, res){
    tasksCollection.count(function(err, count){
        var random_i = Math.floor(Math.random()*count);
        console.log('Tasks count is: ' + count, 'Choosing task #' + random_i);
        //extremely inefficient
        tasksCollection.find().limit(-1).skip(random_i).toArray(function(err, docs){ 
            res.send(docs[0]);
        });
    });
});

app.listen(port);
console.log('Listening on port : ', port);