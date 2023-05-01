const router=require('express').Router()
const verify=require('../helpers/verifyToken')
const TaskController=require("../controllers/taskController")


// router.get('/test',verify,(req,res)=>{
//     res.json(req.user)
// })

router.post('/store',TaskController.insertNewTask)

router.get('/tasks',TaskController.showAll)

router.get('/show/:id',TaskController.showByID)

router.put('/update/:id',TaskController.updateByID)

router.delete('/delete/:id',TaskController.deleteByID)

router.get('/taskCompletionPercentage/:id',TaskController.calculateTaskCompletionPercentage)

router.get('/completionPerDay/',TaskController.calculateCompletionPercentagePerDay)

router.post('/subTask/:id',verify,TaskController.insertNewSubTask)
router.post('/updatesubTask/:taskid/:subtaskid',verify,TaskController.updateSubTaskByID)
router.delete('/deletesubTask/:taskid/:subtaskid',verify,TaskController.deleteSubTaskByID)
router.put('/completedTask/:taskid',verify,TaskController.checksubTasktocomletedtask)
router.put('/completedSubTask/:taskid/:subtaskid',verify,TaskController.subTaskCompleted)



module.exports=router