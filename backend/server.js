const express = require("express")

const app = express();


app.use(express.json()) // a middleware to parse the json file

// middleware to parse incoming URL-encoded payloads
app.use(express.urlencoded({extended:true}))

// custom middleware

app.use((req,res,next)=>{
    console.log(`${req.method} request for ${req.url}`);
    next();
    
})


// Routes

app.get("/api/greet", (req,res)=>{
    const name = req.query.name || "Guest";
    res.json({message: `Hello, ${name}`})
    
})

app.post("/api/echo", (req,res)=>{
    res.json({echo:req.body})
})

app.use((req,res)=>{
    res.status(404).json({error: "Not Found"})
})


app.listen(8000,()=>{
    console.log("Listining on 8000")
})