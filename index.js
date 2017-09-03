var express=require("express");
var todos_db = require("./seed.js");
var bodyParser=require("body-parser");

var app= express();
app.use(require('res-error'));
app.use("/", express.static(__dirname+"/public"));
app.use("/", bodyParser.urlencoded({extended:false}));
app.get("/api/todos", function(req, res){
    res.json(todos_db.todos);
});

app.get("/",function(req,res){
    res.send("sup people");
});

app.post("/api/todos",function(req,res){
    var todo_title=req.body.todo_title;
    console.log(req.body);
    if(!todo_title||todo_title==""||todo_title.trim()==""){
        res.error(404,'sorry cant post it');
    }
    else
    {
        var new_todo_object = {
            title : req.body.todo_title,
            status : todos_db.StatusENUMS.ACTIVE
        }

        todos_db.todos[todos_db.next_todo_id] = new_todo_object;
        todos_db.next_todo_id = todos_db.next_todo_id + 1;
        res.json(todos_db.todos);
    }
});

app.put("/api/todos/:id",function(req,res){

    var id=req.params.id;
    var todo=todos_db.todos[id];
    console.log(todo);
    if(!todo)
    {
        res.error(404,"Task doesnt exist");
    }
    else
    {
        var todo_title = req.body.todo_title;

        if(todo_title && todo_title!="" && todo_title.trim()!=""){
            todo.title=todo_title;
        }

        var todo_status = req.body.todo_status;

        if(todo_status &&
            (todo_status == todos_db.StatusENUMS.ACTIVE ||
                todo_status== todos_db.StatusENUMS.COMPLETE )
        ) {
            todo.status = todo_status;
        }

        res.json(todos_db.todos);
    }
});

app.delete("/api/todos/:id",function(req,res){
    var id=req.params.id;
    var todo=todos_db.todos[id];
    console.log(todo);
    if(!todo)
    {
        res.error(404,"Task doesnt exist");
    }
    else
    {
        todo.status = todos_db.StatusENUMS.DELETED;
        res.json(todos_db.todos);
    }
});
app.listen(3000,function(req,res){
console.log("server");
});

