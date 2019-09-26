const express = require ("express");
const multer = require ("multer");

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
}

const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("tipo MIME invalido");
    if (isValid) {
      error=null;
    }
    callback(error, "backend/images");
  },
  filename: (request, file, callback) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    callback(null, name + '-' + Date.now() + '.' + ext);
  }
});

const router = express.Router();
//const router = require ("express").Router;
const Post = require('../model/post');



router.get('', (request,response, next) =>   { //todo: que hace?
  
  const pageSize=+request.query.pagesize; //+ > cast int
  const currentPage=+request.query.page;
  const postQuery = Post.find();
  if (pageSize && currentPage) {
    postQuery
      .skip(pagesize*(currentPage - 1))
      .limit(pagesize);
  }

  postQuery.then((documents) => {
    mensaje = 'api > posteos obtenidos de servidor -------------------------------------------';
    console.log(mensaje);
    console.log(documents);
    console.log(mensaje + ' > fin ');
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

router.post('', multer({storage: storage}).single("imagen"), (request,response, next) =>   {
  const url = request.protocol + '://'+ request.get ("host");
  const post = new Post({
//    id = null,
    titulo: request.body.titulo,
    contenido: request.body.contenido,
    imagenPath: url + "/images/" + request.file.filename
  });

  // console.log(post);
  post.save().then(resultado => {
    mensaje = 'api>post ' + resultado._id + ' agregado en servidor';

    console.log(mensaje)
    response.status(201).json({
      message: mensaje,
      post: {
        /*
        titulo: resultado.titulo,
        contenido: resultado.contenido,
        imagePath: resultado.imagePath
        */
        ...resultado,
        id: resultado._id,
      }
   });
  });
//para seguir
});

router.put('/:id', multer({storage: storage}).single("imagen"), (request, response, next) =>   {
  console.log('api > put');
  console.log('body-id: ' + request.body.id);
  console.log('body-titulo: ' + request.body.titulo);
  console.log('body-contenido: ' + request.body.contenido);
  console.log('body-imagenPath: ' + request.body.imagenPath);
  
  let imagenPath=request.body.imagenPath;
  if(request.file){//new file was uploaded
    console.log('body-contenido: ' + request.body.imagenPath);
    const url = request.protocol + '://'+ request.get ("host");
    imagenPath = url + "/images/" + request.file.filename;
  }
  console.log('file: ' +  request.file);
  
  Post.updateOne({_id: request.params.id},
    new Post({
      _id: request.body.id,
      titulo: request.body.titulo,
      contenido: request.body.contenido,
      imagenPath: imagenPath 
    }))
    .then((resultado) => {
      mensaje = 'api> put ' + request.body.id + ' editado en servidor';
      console.log(mensaje);
      console.log(resultado);
      response.status(200).json({message: mensaje});
    });
    //console.log('post: ' + post);
  console.log ('api > put > end')
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
