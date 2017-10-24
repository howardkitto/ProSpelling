//cd frontend && npm run build && cd .. && NODE_ENV=production node server

require('dotenv').config({path: __dirname + '/process.env'})

const app = require('./server/app.js'); 



// var mongoose = require('mongoose');
// mongoose.connect(process.env.DB_URI, { useMongoClient: true });
// mongoose.Promise = global.Promise;

app.app.listen(process.env.PORT || 8080, () => {
    console.log('Server is running on http://localhost:8080 or http://127.0.0.1:8080 ');
  });