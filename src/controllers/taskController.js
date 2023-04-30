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

module.exports.insertNewSubTask = async(req,res)=>{

        const {id} = req.params

        const subTask = req.body 

    const task = await Task.findById(id)

    task.subtasks.push(index,0,subTask)


        res.status(200).json(task)

}

module.exports.updateSubTaskByID = async(req,res)=>{
try{
    const {taskid} = req.params.taskid
    const {subtaskid} = req.params.subtaskid
    const subTask = req.body 


    const task = await Task.findById(taskid)

  const subtask= task.subtasks.findByIdAndUpdateById(subtaskid,req.body)
 
  res.status(200).json(subtask)
}catch(error){
   console.log(error.message)
   res.status(500).json({message:error.message})
}

}

module.exports.deleteSubTaskByID = async(req,res)=>{
    try{
        const {taskid} = req.params.taskid
        const {subtaskid} = req.params.subtaskid
        const subTask = req.body 
    
    
        const task = await Task.findById(taskid)
    
      const subtask= task.subtasks.findByIdAndDelete(subtaskid)
     
      res.status(200).json(subtask)
    }catch(error){
       console.log(error.message)
       res.status(500).json({message:error.message})
    }
    
    }


    module.exports.taskCompleted = async(req,res)=>{


        const {taskid} = req.params

        const task = await Task.findById(taskid)


     const completedsubtasks= task.subtasks.every(subtask=>subtask.completed)

     if(!completedsubtasks){

        res.status(500).json("not all sub tasks are completed")

     }


     const filter = { _id: taskid };
     
     const update = { $set: { completed: 'true' } };
     
     const result = await Task.updateOne(filter, update)

     const completedTask = await Task.findById(taskid)
     
     res.status(200).json(completedTask)

     /*
     const completedTask = await Task.findByIdAndUpdate(taskid,req.body)
     res.status(200).json("task with id ${taskid}  completed")
*/

    }

    module.exports.subTaskCompleted = async(req,res)=>{
       try{
        const {taskid} = req.params.taskid
        const {subtaskid} = req.params.subtaskid
        const subTask = req.body 
    
    
        const task = await Task.findById(taskid)
    
      const subtask= task.subtasks.findByIdAndUpdate(subtaskid)
     
      res.status(200).json(subtask)
    }catch(error){
       console.log(error.message)
       res.status(500).json({message:error.message})
    }


    }