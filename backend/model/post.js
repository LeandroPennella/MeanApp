const mongoose = require('mongoose');
const postSchema = mongoose.Schema({
  titulo: {type: String, require: true},
  contenido:  {type: String, require: true},
  imagenPath: {type: String, require: true} //supuesto
});

module.exports = mongoose.model('Post', postSchema);
