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


module.exports=router