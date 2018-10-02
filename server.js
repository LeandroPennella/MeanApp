const http = require('http');
const port= process.env.PORT || 3000;
const app = require('./backend/app');
app.set('port', port)

/*
const server = http.createServer((request, response) => {
  response.end('responses ended');

});
*/


const server = http.createServer(app);

server.listen (port);

