const express = require ('express');

const app = express();

app.use('/api/posts', (request,response, next) =>   {
  const posts = [
    {
      id:'asd09a8',
      title:'titulo 1 ',
      content:'contenido 1'
    },
    {
      id:'rty09rty',
      title:'titulo 2',
      content:'contenido 2'
    }
  ];
  return response.status(200).json({
    message: 'posteos pasados correctamente',
    posts: posts
  })
});

module.exports = app;

