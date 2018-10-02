const http = require('http');

const server = http.createServer((request, response) => {
  response.end('responses ended');
});

server.listen (process.env.PORT || 3000);

