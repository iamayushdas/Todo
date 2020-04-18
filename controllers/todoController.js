var bodyParser= require('body-parser');
var mongoose = require('mongoose');

// connect to database
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true); 
mongoose.connect('mongodb+srv://test:test@todo-xpvus.mongodb.net/test?retryWrites=true&w=majority');


//create a schema - this is like a blue print
var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);

//var data = [{item:'get milk'},{item:'code'},{item:'get some sleep'}];
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){
   app.get('/todo', function(req,res){
   //get data from mongodb and pass it to view
   Todo.find({},function(err , data){
       if (err) throw err;
       res.render('todo' ,{todos:data});
   });
   
   }) ;

   app.post('/todo',urlencodedParser, function(req,res){
    // get data from the view and add it to mongodb
    var newTodo = Todo(req.body).save(function(err ,data){
        if(err) throw err ;
        res.json(data);
    });
   
   }) ;

   app.delete('/todo/:item', function(req , res){

    // delete an item from mongodb
    Todo.find({item: req.params.item.replace(/\-/g, " ")}).deleteOne(function(err, data){
        if(err) throw err;
        res.json(data);
    })
   
   });
};