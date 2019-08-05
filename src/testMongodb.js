

const MongoClient = require('mongodb').MongoClient, assert = require('assert');
var url = 'mongodb://localhost:27017/myproject';

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
  
  db.createCollection("customers", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    
  });
  
  db.close();
});

