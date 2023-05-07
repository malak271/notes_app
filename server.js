const express=require("express")
const mongoose=require("mongoose")
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


const subtaskRoute = require('./src/reoutes/subtask')

app.use('/api/subtask',verify,subtaskRoute) //anu subtask route should prefix with api/subtask




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


