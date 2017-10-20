//cd frontend && npm run build && cd .. && NODE_ENV=production node server

const app = require('./server/app.js')


app.app.listen(process.env.PORT || 8080, () => {
    console.log('Server is running on http://localhost:8080 or http://127.0.0.1:8080 ');
  });