const router=require('express').Router()
const verify=require('../helpers/verifyToken')
const TaskController=require("../controllers/taskController")


// router.get('/test',verify,(req,res)=>{
//     res.json(req.user)
// })

router.post('/task',TaskController.insertNewTask)

router.get('/tasks',TaskController.showAll)

router.get('/task/:id',TaskController.showByID)

<<<<<<< HEAD

router.put('/task/update/:id',verify,TaskController.updateByID)
=======
router.put('/task/update/:id',TaskController.updateByID)
>>>>>>> 28ff63f81129a7386d238e7a9531393415eb6523

router.delete('/task/delete/:id',TaskController.deleteByID)


router.post('/subTask/:id',verify,TaskController.insertNewSubTask)
router.post('/updatesubTask/:taskid/:subtaskid',verify,TaskController.updateSubTaskByID)
router.post('/deletesubTask/:taskid/:subtaskid',verify,TaskController.deleteSubTaskByID)



module.exports=router