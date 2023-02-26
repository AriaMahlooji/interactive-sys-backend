const fs = require("fs/promises");
const express = require("express");
const cors = require("cors");
const _ = require("lodash");
const{ v4 : uuid, v4 } = require("uuid");
const { json } = require("express");

let tasks = [
    /*{
        id: uuid(),
        content: "Register for the exam!!!",
        progress:"completed"
    },
    {
        id: uuid(),
        content: "Prepare a survey for Interactive system",
        progress:"inprogress"
    },
    {
        id: uuid(),
        content: "Develop a backend for Interactive System Course using node.js and express ",
        progress:"todo"
    },
    {
        id: uuid(),
        content: "Develop a frontend for Interactive System Course using React ",
        progress:"todo"
    }*/
]

const app= express();
app.use(express.json());
app.use(cors());

app.get("/tasks", (req,res)=>{
    res.json(tasks);
    console.log("tasks fetched successfully")
});

app.get("/tasks/:id", (req,res)=>{
    res.json(tasks);
    console.log("task with the id of "+ req.params.id +" fetched successfully")
});

app.post("/tasks", (req,res)=>{
    const _id= uuid();
    const _content= req.body.content;
    const _progress= "todo";
    tasks = [...tasks,{id:_id, content:_content, progress:_progress}];
    res.json(tasks);
});

app.put("/tasks/:id", (req,res)=>{

    let _task = tasks.find(t => t.id === req.params.id);
    if(!_task)
    {
        res.sendStatus(404);
        return;
    }
    if(req.body.progress)
    {
        _task.progress = req.body.progress;
    }
    if(req.body.content)
    {
        _task.content = req.body.content;
    }
    console.log("task with the Id of "+  req.params.id+ " has been updated successfully");
    res.json(tasks);
    res.status(204);
});

app.delete("/tasks/:id", (req,res)=>{
    let _taskIndex = tasks.findIndex(t => t.id === req.params.id);
    if(_taskIndex>-1)
    {
        tasks.splice(_taskIndex, 1);
        console.log("task with the Id of "+  req.params.id+ " was deleted successfully");
        res.json(tasks);
    }
    else{
        console.log("task with the Id of "+  req.params.id+ " was not found");
        res.status(404);
        res.send({
            error:"404",
            message:"task was not found"
        })
    }
})

app.listen(3333, ()=> console.log("Server is listening on port:3333"));