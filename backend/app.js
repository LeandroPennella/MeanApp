const path = require("path");
const express = require ('express');
const bodyParser = require('body-parser');

const postsRoutes = require('./routes/posts');

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

app.use("/images", express.static(path.join("backend/images")))

app.use((request,response, next) =>  {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  next();
});

app.use('/api/posts',postsRoutes);

module.exports = app;

