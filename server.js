var Raven = require('raven');
Raven.config('https://2a43b1e569ce4b6788bcc52500b6f3b4:0e4c9a6ade214d089f4531c77e473089@sentry.io/236518').install();

require('dotenv').config({path: __dirname + '/process.env'})

const app = require('./server/app.js'); 

//wasted hours - problem was that env var was missing on prod!
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_HOST, { useMongoClient: true }, 
  function(err, db) {
    if (err) {
      Raven.captureException(err);
    } else {
        console.log('Connected to Database successfully!');
    }
});


// app.app.listen(process.env.PORT || 5000, () => {
  app.app.listen(5000, () => {
    console.log('Server is running on http://localhost:8080 or http://127.0.0.1:8080 ');
  });