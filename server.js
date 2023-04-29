const express=require("express")
const mongoose=require("mongoose")
const Task=require("./src/models/Task")
const app=express()
const dotenv=require("dotenv")
const verify=require('./src/helpers/verifyToken')

app.use(express.json())
app.use(express.urlencoded({extended:false}))

dotenv.config();

//import routes
const auhRoute=require("./src/routes/auth")

//route middlewares
app.use('/api/user',auhRoute)  //any auth route should prefix with api/user

//try private routes
const taskRoute=require('./src/routes/task')
app.use('/api/task',verify,taskRoute)  //any task route should prefix with api/task



mongoose
.connect(process.env.DB_CONNECT)
.then(()=>{
    console.log("connect");
    app.listen(3000,()=>{
        console.log("listening")
    });
})
.catch((error)=>{
    console.log(error);
})

