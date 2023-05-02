const router=require('express').Router()
const Task=require("../models/Task")
const mongoose=require("mongoose");

const calculation = require("../helpers/calculation")



module.exports.insertNewSubTask = async(req,res)=>{
const {id} = req.params

const task = await Task.findById(id)
task.subtasks.push(req.body)


  task.save()
  console.log(task)

  res.status(200).json(task)

}

//done
module.exports.updateSubTaskByID = async(req,res)=>{

const taskid = req.params.taskid
const subtaskid = req.params.subtaskid


const task= await Task.findById(taskid)

if(task && task.subtasks){

  const subtask = await task.subtasks.filter(subtask => subtask.subtaskId == subtaskid) //return array of one object
//indexed array

console.log(subtask)

if(req.body.title)
  subtask[0].title = req.body.title

 if(req.body.description)
  subtask[0].description = req.body.description

  if(req.body.subtaskId)
   subtask[0].subtaskId = req.body.subtaskId
  
  if(req.body.completed)

  subtask[0].completed = req.body.completed

  console.log(task)
  task.save()
 

  res.status(200).json("found")

}


}

//done
module.exports.deleteSubTaskByID = async(req,res)=>{

    const taskid = req.params.taskid
const subtaskid = req.params.subtaskid

console.log(subtaskid)

const task= await Task.findById(taskid)

if(task && task.subtasks){

const subtask = await task.subtasks.filter(subtask => subtask.subtaskId == subtaskid)

console.log(subtask)

await Task.findByIdAndUpdate(taskid,{$pull : { subtasks : subtask[0] }} , {new:true})
 

const utatask = Task.findById(taskid)
res.status(200).json("done")


}

}

//completion percentage added 
module.exports.checksubTasktocomletedtask = async(req,res)=>{

const {taskid} = req.params

const task = await Task.findById(taskid)

const completedsubtasks= await task.subtasks.every(subtask=>subtask.completed === 1)

 console.log(completedsubtasks)

 if(completedsubtasks){

  console.log(completedsubtasks)

 const filter = { _id: taskid };

 const update = { $set: { completed: 'true'} };
 
 const result = await Task.updateOne(filter, update)

 const completedTask = await Task.findById(taskid)
 
 res.status(200).json(completedTask)

 const calcresult = calculation.overallCompletionPercentage(task)

task.completionPercentage = calcresult

 }

 res.status(500).json("not all sub tasks are completed")


}

//completion percentage added 
module.exports.comletedtask = async(req,res)=>{

const {taskid} = req.params

const task = await Task.findById(taskid)


//update every subtask of subtasks
 const subtaskUpdates = task.subtasks.map(subtask => ({
  updateMany: {
    filter: { 'subtasks._id': subtask._id },
    update: { $set: { 'subtasks.$.completed': 1 } }
  }
}));

//update on DB

Task.bulkWrite(subtaskUpdates)
  .then(result => {
    console.log('Subtasks updated:', result);
  })
  .catch(err => {
    console.error('Error updating subtasks:', err);
  });

  // update completion percentage after update all subtasks
  const result = calculation.overallCompletionPercentage(task)

task.completionPercentage = result


 
}

//done
//completion date added 
module.exports.subTaskCompleted = async(req,res)=>{
   try{
    const taskid = req.params.taskid
    const subtaskid = req.params.subtaskid
    const subTask = req.body 


    const task = await Task.findById(taskid)
    const subtask= task.subtasks.filter(subtask=>subtask.subtaskId == subtaskid )

  console.log(subtask)
  
      subtask[0].completed = true
      subtask[0].completionDate = Date.now()

      task.save()

  res.status(200).json(subtask)
}catch(error){
   console.log(error.message)
   res.status(500).json({message:error.message})
}


}


