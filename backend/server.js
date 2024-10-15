const { configDotenv } = require("dotenv");
const express = require("express");
const dotenv = require("dotenv")
const { default: mongoose } = require("mongoose");


const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(express.json()) // a middleware to parse the json file

// middleware to parse incoming URL-encoded payloads
app.use(express.urlencoded({extended:true}))

// custom middleware

app.use((req,res,next)=>{
    console.log(`${req.method} request for ${req.url}`);
    next();
    
})


// To connect to DB{mernlearning} from the backend.
const MONGO_URL = 'mongodb://localhost:27017/mernlearning'; //DB url
mongoose.connect(MONGO_URL, {useNewUrlParser:true, useUnifiedTopology:true})
.then(()=>{console.log('Connected to DB.');
}).catch(()=>{
    console.error('DB connection failed!');
})


const taskSchema = new mongoose.Schema({
    title: String,
    completed : Boolean
})

const Task = mongoose.model("Task",taskSchema)


// Routes

app.get("/api/greet", (req,res)=>{
    const name = req.query.name || "Guest";
    res.json({message: `Hello, ${name}`})
    
})

app.post("/api/echo", (req,res)=>{
    res.json({echo:req.body})
})

// to create task
app.post("/api/tasks", async (req,res)=>{
    try {
        const newTask = new Task(req.body)
        await newTask.save();
        res.status(201).json(newTask)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

// to list tasks
app.get("/api/tasks", async(req,res)=>{
    try {
        const tasks = await Task.find()
        res.status(201).json(tasks);
    } catch (k) {
       res.status(400).json({error:error.message}) 
    }
})

// update tasks
app.put("/api/tasks/:id", async(req,res)=>{
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {new:true});
        if(!updatedTask){
            res.status(404).json({error:error.message})
        }
        res.json(updatedTask)
    } catch (error) {
        res.status(404).json({error: error.message})
    }
})


// delete tasks
app.delete("/api/tasks/:id", async(req,res)=>{
    try {
        const deleteTask = await Task.findByIdAndDelete(req.params.id)
        if(!deleteTask){
            res.status(404).json({error:error.message})
        }
        res.json({message:"Task Has Been succesfully deleted."})
    } catch (error) {
        res.status(404).json({error:error.message})
    }
})




// 404 Handler---
app.use((req,res)=>{
    res.status(404).json({error: "Not Found"})
})


// server listern
app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}/`)
})