const express=require("express")
const app=express()
const routes = require('./src/routes')
const middleware = require('./src/middlewares')
const dbConnection=require('./config.js');

middleware(app);

routes(app)

dbConnection(
  
  app.listen(3000,()=>{
    console.log("listening")
      })
      
);

