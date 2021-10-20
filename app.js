const db=require("./db.js");
const path=require("path")
const express=require("express");
const app=express();
app.use(express.json())
app.use(express.static('public'));
const collection="todo";

//db connection 
db.connect((err)=>{
    if(err)
    {
        console.log("Unable to connect the database");
        process.exit();
    }
    else{
//         app.listen(3000,()=>{
//             console.log("Connected to database and listening on port 3000 http://localhost:3000");
//         });

        // Establishing the port
        const PORT = process.env.PORT ||3000;

        // Executing the server on given port number
        app.listen(PORT, ()=>{console.log(`Server started on port ${PORT}`)});



    }
});


//routes starts 
app.get('/',(req,res)=>{
    // console.log(__dirname)
 res.sendFile(path.join(__dirname,"todo.html"));

});

app.get('/getTodos',(req,res)=>{
db.getDB().collection(collection).find().toArray((err,documents)=>{
                        if(err)
                        {
                            console.log(err+"Error at line 30");
                        }
                        else{
                            console.log(documents);
                            res.json(documents);
                        }
                        });
});

// create a new 
app.post('/',(req,res)=>{
const userInput=req.body;
db.getDB().collection(collection).insertOne(userInput,(err,result)=>{
    if(err){
        console.log(err);
    }
    else{
        res.json({result:result});
    }
});

});

//update or replace 
app.put('/:id',(req,res)=>{
    const todoID=req.params.id;
    const userInput=req.body;
    console.log(todoID);
    db.getDB().collection(collection).findOneAndUpdate({_id:db.getPrimaryKey(todoID)},{$set:{todo:userInput.todo}},{returnOriginal: false},(err,result)=>{
        if(err)
        {
            alert(err);
        }
        else{
            res.json(result);
        }
    });
});

//delete something 

app.delete('/:id',(req,res)=>{
    const todoID=req.params.id;
    db.getDB().collection(collection).findOneAndDelete({_id:db.getPrimaryKey(todoID)},(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.json(result);
        }
    });
});
