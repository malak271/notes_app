const router=require('express').Router()
const verify=require('../helpers/verifyToken')
const TaskController=require("../controllers/taskController")
const subTaskController=require("../controllers/subtaskController")


// router.get('/test',verify,(req,res)=>{
//     res.json(req.user)
// })

router.post('/store',TaskController.insertNewTask)

router.get('/tasks',TaskController.showAll)

router.get('/show/:id',TaskController.showByID)

router.put('/update/:id',TaskController.updateByID)

router.delete('/delete/:id',TaskController.deleteByID)

// router.get('/taskCompletionPercentage/:id',TaskController.calculateTaskCompletionPercentage)

router.get('/completionPerDay/',TaskController.calculateCompletionPercentagePerDay)

router.post('/subTask/:id',verify,subTaskController.insertNewSubTask)
router.post('/updatesubTask/:taskid/:subtaskid',verify,subTaskController.updateSubTaskByID)
router.delete('/deletesubTask/:taskid/:subtaskid',verify,subTaskController.deleteSubTaskByID)
router.put('/completedTask/:taskid',verify,subTaskController.checksubTasktocomletedtask)
router.put('/completedSubTask/:taskid/:subtaskid',verify,subTaskController.subTaskCompleted)



module.exports=router