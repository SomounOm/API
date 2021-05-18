// creat server
const express=require("express");
const app=express();
app.listen(process.env.PORT || 5000,()=>console.log("running..."));
app.use(express.json());
app.get ("/",(req,res)=>res.send("Node JS"))
// create Data...........
let users=[
    {id:1, name:"kalab",password:"334"},
    {id:2, name:"sothoun",password:"334"},
    {id:3, name:"somoun",password:"334"}
]

// user get to get object
app.get("/api/users",(req,res)=>res.send(users));
app.get("/api/users/:id",(req,res)=>{
    let id =req.params.id   
    let index=users.findIndex(user=>user.id===parseInt(id));
        if (index>=0){
            let value= users[index];
            res.send([value]);
        }else{
            res.status(404);
            res.send({error:"user id not found"});
        }
    let user=users[index];
    res.send(user);

});
app.post("/api/users",(req,res)=>{
    if (!req.body.password){
        res.status(404)
        return res.send({error:"password requie"})
    }
    let user={
        name:req.body.name,
        password:req.body.password
    }
    users.push(user)
    res.send(users);

});
app.put('/api/users/:id',(req,res)=>{
    let id =req.params.id  
    let username = req.body.name;
    let pass=req.body.password 
    console.log(username)
    let index=users.findIndex(user=>user.id===parseInt(id));
    if (index>=0){
        let user=users[index];
        user.name=username;
        user.password=pass;
        res.send(user);
    }else{
        res.status(404);
        res.send({error:"user id not found"});
    }
    
})
app.delete("/api/users/:id",(req,res)=>{
    let id =req.params.id;
    let index=users.findIndex(user=>user.id===parseInt(id));
    if(index >=0){
        users.splice(index,1);
        res.send("Success")

    }else{
        res.status(404);
        res.send({error:"user id not found"})
    }
})
