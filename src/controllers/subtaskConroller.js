
module.exports.insertNewSubTask = async(req,res)=>{

    const {id} = req.params


const task = await Task.findById(id)

  task.subtasks.push(req.body)

  const filter = { _id: id };

  const update = { $set: { subtasks: req.body } };
  
  const result = await Task.updateOne(filter, update)


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

 console.log('done')
  subtask[0].description = req.body.description
 

  console.log(subtask[0].description)
  console.log(subtask)



  
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

// console.log(task.subtasks)


const subtask = await task.subtasks.filter(subtask => subtask.subtaskId == subtaskid)

console.log(subtask)

await Task.findByIdAndUpdate(taskid,{$pull : { subtasks : subtask[0] }} , {new:true})
 

const utatask = Task.findById(taskid)
res.status(200).json(utatask)


}

}

//done
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
 }

 res.status(500).json("not all sub tasks are completed")


}

/*
module.exports.comletedtask = async(req,res)=>{


 const {taskid} = req.params

const task = await Task.findById(taskid)


 const filter = { _id: taskid };

 const update = { $set: { completed: 'true' } };
 
 const result = await Task.updateOne(filter, update)

 const completedTask = await Task.findById(taskid)


 //اغير قيم ال subtask
 
 res.status(200).json(completedTask)
}
*/

module.exports.subTaskCompleted = async(req,res)=>{
   try{
    const taskid = req.params.taskid
    const subtaskid = req.params.subtaskid
    const subTask = req.body 


    const task = await Task.findById(taskid)

  const subtask= task.subtasks.filter(subtask=>subtask.subtaskId == subtaskid )
 

  console.log(subtask)
  
      subtask[0].completed = true


      task.save()

  res.status(200).json(subtask)
}catch(error){
   console.log(error.message)
   res.status(500).json({message:error.message})
}


}


