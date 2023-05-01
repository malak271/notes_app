const router=require('express').Router()
const verify=require('../helpers/verifyToken')
const TaskController=require("../controllers/taskController")


// router.get('/test',verify,(req,res)=>{
//     res.json(req.user)
// })

router.post('/task',TaskController.insertNewTask)

router.get('/tasks',TaskController.showAll)

router.get('/task/:id',TaskController.showByID)

router.put('/task/update/:id',TaskController.updateByID)

router.delete('/task/delete/:id',TaskController.deleteByID)

router.get('/calculateTaskCompletionPercentage/:id',TaskController.calculateTaskCompletionPercentage)

router.get('/completionPerDay/',TaskController.calculateCompletionPercentagePerDay)

router.post('/subTask/:id',verify,TaskController.insertNewSubTask)
router.post('/updatesubTask/:taskid/:subtaskid',verify,TaskController.updateSubTaskByID)
router.post('/deletesubTask/:taskid/:subtaskid',verify,TaskController.deleteSubTaskByID)
router.post('/completedTask/:taskid',verify,TaskController.taskCompleted)
router.post('/completedSubTask/:taskid/:subtaskid',verify,TaskController.subTaskCompleted)



module.exports=router