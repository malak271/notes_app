const router=require('express').Router()
const Task=require("../models/Task")

module.exports.insertNewTask=async (req,res)=>{
    try{
        console.log(req.user._id)
        req.body.user_id=req.user._id;
        console.log(req.body)
        const task= await Task.create(req.body)
        res.status(200).json(task)
    }catch(error){
       console.log(error.message)
       res.status(500).json({message:error.message})
    }
}

module.exports.showAll=async (req,res)=>{
    try{
        console.log(req.user)
        const tasks= await Task.find({user_id:req.user._id})
        res.status(200).json(tasks)
    }catch(error){
       console.log(error.message)
       res.status(500).json({message:error.message})
    }
}

module.exports.showByID=async (req,res)=>{
    try{
        const {id}=req.params
        const task= await Task.findById(id)
        res.status(200).json(task)
    }catch(error){
       console.log(error.message)
       res.status(500).json({message:error.message})
    }
}

module.exports.updateByID=async (req,res)=>{
    try{
        const {id}=req.params
        const task= await Task.findByIdAndUpdate(id,req.body)
        if(!task){
            res.status(404).json({message:`${id} not found`})
        }
        const updatedTask=await Task.findById(id)
        res.status(200).json(updatedTask)
    }catch(error){
       console.log(error.message)
       res.status(500).json({message:error.message})
    }
}

module.exports.deleteByID=async (req,res)=>{
    try{
        const {id}=req.params
        const task= await Task.findByIdAndDelete(id,req.body)
        if(!task){
            res.status(404).json({message:`${id} not found`})
        }
        res.status(200).json(task)
    }catch(error){
       console.log(error.message)
       res.status(500).json({message:error.message})
    }
}


//14785256