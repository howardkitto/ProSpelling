var express = require('express')
var app = express()

// console.log('foo')

app.use(express.static('frontend/build')); 

// app.get('/', function (req, res) {
//   res.send('Hello World! ')
// })

app.listen(process.env.PORT || 8080, () => {
    console.log('Server is running on http://localhost:8080 or http://127.0.0.1:8080 ');
  });