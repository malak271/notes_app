const express=require("express")
const mongoose=require("mongoose")
const app=express()
const dotenv=require("dotenv")
const verify=require('./src/helpers/verifyToken')
const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:8080'
}));
app.use(express.json())
app.use(express.urlencoded({extended:false}))

dotenv.config();

//import routes
const authRoute=require("./src/routes/auth")

//route middlewares
app.use('/api/user',authRoute)  //any auth route should prefix with api/user

//try private routes
const taskRoute=require('./src/routes/task')
app.use('/api/task',verify,taskRoute)  //any task route should prefix with api/task


const subtaskRoute = require('./src/reoutes/subtask')

app.use('/api/subtask',verify,subtaskRoute) //any subtask route should prefix with api/subtask


// app.use(cors());


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

