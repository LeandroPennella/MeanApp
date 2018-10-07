const mongoose = require('mongoose');
const postSchema = mongoose.Schema({

  titulo: {type: String, require: true},
  contenido:  {type: String, require: true}

});

module.exports = mongoose.model('Post', postSchema); 