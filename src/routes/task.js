const router=require('express').Router()
const verify=require('../helpers/verifyToken')
const TaskController=require("../controllers/taskController")


// router.get('/test',verify,(req,res)=>{
//     res.json(req.user)
// })

router.post('/task',verify,TaskController.insertNewTask)

router.get('/tasks',verify,TaskController.showAll)

router.get('/task/:id',verify,TaskController.showByID)

router.put('/task/update/:id',verify,TaskController.updateByID)

router.delete('/task/delete/:id',verify,TaskController.deleteByID)


module.exports=router