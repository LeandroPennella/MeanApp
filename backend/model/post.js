const mongoose = require('mongoose');
const postSchema = mongoose.Schema({
  titulo: {type: String, require: true},
  contenido:  {type: String, require: true},
  imagePath: {type: String, require: false} //supuesto
});

module.exports = mongoose.model('Post', postSchema);
