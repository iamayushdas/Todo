var express = require('express');

var ejs = require('ejs');
var todoController = require('./controllers/todoController')

var app = express();

// setup template engine
app.set('view engine' , 'ejs');

// static files
app.use (express.static('./public'))

// fire controller
todoController(app);

// listen to port
app.listen(3000);
console.log('listening to port 3000')