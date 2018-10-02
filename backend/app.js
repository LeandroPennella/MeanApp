const express = require ('express');

const app = express();

app.use((request,response, next) =>   {
  console.log('log 1');
  next();
});

app.use((request,response, next) =>   {
  response.send('sending from xp');
});

module.exports = app;

