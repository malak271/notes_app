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
router.put('/cancelTask/:id',TaskController.cancelTask) //cancel task

// router.get('/taskCompletionPercentage/:id',TaskController.calculateTaskCompletionPercentage)

router.get('/completionPerDay/',TaskController.calculateCompletionPercentagePerDay)


module.exports=router