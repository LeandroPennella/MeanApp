const express = require ('express');
const bodyParser = require('body-parser');

const Post = require('./model/post');
const mongoose = require('mongoose');

const app = express();

mongoose.connect(
  // "mongodb+srv://meanapp:CfU5gAhfFMmpI9kW@cluster0-xwx8a.mongodb.net/nodeangular?retryWrites=true"
  "mongodb://localhost/nodeapdb"
  )
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
  const post = new Post({
//    id = null,
    titulo: request.body.titulo,
    contenido: request.body.contenido
  });

  // console.log(post);
  post.save().then(resultado => {
    response.status(201).json({
      message: 'Posteo agregado',
      id: resultado._id
   });
  });
//para seguir
});
app.get('/api/posts', (request,response, next) =>   {

  Post.find().then((documents) => {
    console.log(documents);
    response.status(200).json({
      message: 'posteos pasados correctamente',
      posts: documents
    })
  });

});

app.delete('/api/posts/:id', (request, response, next) => {
  Post.deleteOne({_id:request.params.id}).then( resultado => {
    console.log(resultado);
    response.status(200).json({ message: 'post eliminado'});
  });
});

module.exports = app;

