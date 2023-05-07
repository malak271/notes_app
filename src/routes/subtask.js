const router=require('express').Router()
const verify=require('../helpers/verifyToken')
const subTaskController=require("../controllers/subtaskController")




router.post('/insert/:id',verify,subTaskController.insertNewSubTask) //add subtask 
router.put('/update/:taskid/:subtaskid',verify,subTaskController.updateSubTaskByID) //update subtask
router.delete('/delete/:taskid/:subtaskid',verify,subTaskController.deleteSubTaskByID) //delete subtask
router.put('/completedTask/:taskid',verify,subTaskController.checksubTasktocomletedtask)//complete task by check completed subtasl
router.put('/completedSubTask/:taskid/:subtaskid',verify,subTaskController.subTaskCompleted) //complete subtask
router.put('/completedAllTasks/:taskid',verify,subTaskController.comletedtask) //complete task and all its subtasks
router.put('/cancel/:taskid/:subtaskid',verify,subTaskController.subtaskCancel) //cancel subtask

module.exports=router