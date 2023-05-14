const mongoose=require("mongoose")
const dotenv=require("dotenv")

dotenv.config();

module.exports = (onSuccess)=>{mongoose
.connect(process.env.DB_CONNECT) 
.then(()=>{
    onSuccess;
})
.catch((error)=>{
    console.log(error);
})}