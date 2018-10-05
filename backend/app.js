const express = require ('express');

const app = express();

app.use((request,response, next) =>  {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  response.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});

app.use('/api/posts', (request,response, next) =>   {
  const posts = [
    {
      id:'asd09a8',
      titulo:'titulo 1 ',
      contenido:'contenido 1'
    },
    {
      id:'rty09rty',
      titulo:'titulo 2',
      contenido:'contenido 2'
    }
  ];
  return response.status(200).json({
    message: 'posteos pasados correctamente',
    posts: posts
  })
});

module.exports = app;

