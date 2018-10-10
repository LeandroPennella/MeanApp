const express = require ('express');
const bodyParser = require('body-parser');

const Post = require('./model/post');
const mongoose = require('mongoose');

const app = express();

mongoose.connect("mongodb+srv://meanapp:CfU5gAhfFMmpI9kW@cluster0-xwx8a.mongodb.net/test?retryWrites=true")
  .then(() => {
    console.log('Conectado');
  })
  .catch(err => { // mongoose connection error will be handled here
    console.error('App starting error:', err.stack);
    process.exit(1);
  });

//mongodb atlas
// https://cloud.mongodb.com/v2/5b53808496e821402dade07e#clusters
// meanapp:CfU5gAhfFMmpI9kW

// middlewares

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: false }));

app.use((request,response, next) =>  {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  response.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});

app.post('/api/posts', (request,response, next) =>   {
  const httpPost = new Post({
//    id = null,
    titulo: request.body.titulo,
    contenido: request.body.contenido
  });

  console.log(httpPost);
  // post.save();
  response.status(201).json({
     message: 'Posteo agregado'
  }); //para seguir
});
app.get('/api/posts', (request,response, next) =>   {
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

