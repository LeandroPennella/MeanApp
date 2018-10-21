const express = require ("express");

const router = express.Router();
//const router = require ("express").Router;

const Post = require('../model/post');



router.get('', (request,response, next) =>   {

  Post.find().then((documents) => {
    mensaje = 'api > posteos obtenidos de servidor';
    console.log(mensaje)
    console.log(documents);
    response.status(200).json({
      message: mensaje,
      posts: documents
    })
  });

});

router.get('/:id', (request,response, next) =>   {

  Post.findById(request.params.id).then((post) => {
    if (post) {
       mensaje = 'api > post ' + request.params.id   + ' obtenidos de servidor';
      console.log(mensaje)
      console.log(post);
      response.status(200).json({
        message: mensaje,
        post: post
      })
    } else {
      response.status(404).json({message: 'Post inexistente'});
    }
  });

});

router.post('', (request,response, next) =>   {
  const post = new Post({
//    id = null,
    titulo: request.body.titulo,
    contenido: request.body.contenido
  });

  // console.log(post);
  post.save().then(resultado => {
    mensaje = 'api>post ' + resultado._id + ' agregado en servidor';

    console.log(mensaje)
    response.status(201).json({
      message: mensaje,
      id: resultado._id
   });
  });
//para seguir
});

router.put('/:id', (request, response, next) =>   {
  Post.updateOne({_id: request.params.id},
    new Post({
      _id: request.body.id,
      titulo: request.body.titulo,
      contenido: request.body.contenido
    }))
    .then((resultado) => {
      mensaje = 'api> post ' + request.body.id + ' editado en servidor';
      console.log(mensaje);
      console.log(resultado);
      response.status(200).json({message: mensaje});
    });
});

router.delete('/:id', (request, response, next) => {
  Post.deleteOne({_id:request.params.id}).then( resultado => {
    mensaje = 'api> post ' + request.body.id + ' eliminado en servidor';
    console.log(mensaje);
    console.log(resultado);
    response.status(200).json({mensaje});
  });
});

module.exports = router;
