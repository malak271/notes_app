const router = require('express').Router()
const Task = require("../models").Task
const mongoose = require("mongoose");
const calculation = require("../helpers/calculation")

module.exports.insertNewSubTask = async (req, res) => {
try{
  const { id } = req.params

  const task = await Task.findById(id)
  task.subtasks.push(req.body)

  task.save()
  console.log(task)

  res.status(200).json(task)} catch (error) {
    console.log(error.message)
    res.status(500).json({ message: error.message })
}

}

//done
module.exports.updateSubTaskByID = async (req, res) => {

 try{

  const taskid = req.params.taskid
  const subtaskid = req.params.subtaskid
  const task = await Task.findById(taskid)

const subtask = await task.subtasks.filter(subtask => subtask._id == subtaskid) //return array of one object
    //indexed array

    console.log(subtask)

    if (req.body.title)
      subtask[0].title = req.body.title

    if (req.body.description)
      subtask[0].description = req.body.description

    // if (req.body.subtaskId)
    //   subtask[0].subtaskId = req.body.subtaskId

    if (req.body.completed)
      subtask[0].completed = req.body.completed

    console.log(task)
    task.save()

    res.status(200).json("found") }catch (error) {
      console.log(error.message)
      res.status(500).json({ message: error.message })
  }
  }


//done
module.exports.deleteSubTaskByID = async (req, res) => {

try{
  const taskid = req.params.taskid
  const subtaskid = req.params.subtaskid

  const task = await Task.findById(taskid)
    const subtask = await task.subtasks.filter(subtask => subtask._id == subtaskid)

    console.log(subtask)

    await Task.findByIdAndUpdate(taskid, { $pull: { subtasks: subtask[0] } }, { new: true })

    const utatask = Task.findById(taskid)
    res.status(200).json("done")
} catch (error) {
  console.log(error.message)
  res.status(500).json({ message: error.message })
}

  }



//completion percentage added 
module.exports.checksubTasktocomletedtask = async (req, res) => { //call this when check task, convert all sub tasks to completed

  try{
  const { taskid } = req.params
  const task = await Task.findById(taskid)
  const completedsubtasks = await task.subtasks.every(subtask => subtask.completed === 1)
  console.log(completedsubtasks)

  if (completedsubtasks) {
    console.log(completedsubtasks)
    const filter = { _id: taskid };
    const update = { $set: { completed: 'true' } };
    const result = await Task.updateOne(filter, update)
    const completedTask = await Task.findById(taskid)
    res.status(200).json(completedTask)
    const calcresult = calculation.overallCompletionPercentage(task)
    task.completionPercentage = calcresult
  }

  res.status(500).json("not all sub tasks are completed") 
} catch (error) {
  console.log(error.message)
  res.status(500).json({ message: error.message })
}
}


//done
//completion date added 
module.exports.subTaskCompleted = async (req, res) => {
  try {
    const taskid = req.params.taskid
    const subtaskid = req.params.subtaskid
    const subTask = req.body
    const task = await Task.findById(taskid)
    const subtask = task.subtasks.filter(subtask => subtask._id == subtaskid)
    console.log(subtask)

    subtask[0].completed = true
    subtask[0].completionDate = Date.now()

    //when check subtask the task completion percentage will change
    const calcresult = calculation.calculateTaskCompletionPercentage(task)

    task.completionPercentage = calcresult

    //if cp=100 front end check it to color the line and check the box
    
    if(calcresult==100)
       task.completionDate=Date.now()

    task.save()

    res.status(200).json(subtask)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: error.message })
  }
}


module.exports.subtaskCancel = async(req,res)=>{
try{
    const taskid = req.params.taskid
    const subtaskid = req.params.subtaskid
    const task = Task.findById(taskid)
    const subtask = await task.subtasks.filter(subtask => subtask._id == subtaskid) //return array of one object

    //console.log(subtask)
    // subtask.status = "cancelled"

    subtask.softdelete= Date.now()

    task.save()

   res.status(200).json(subtask)
} catch (error) {
  console.log(error.message)
  res.status(500).json({ message: error.message })
}
}

