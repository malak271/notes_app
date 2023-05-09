const mongoose=require("mongoose");
//const calculation = require("../")


// router.get('/test',verify,(req,res)=>{
//     res.json(req.user)
// })

router.post('/store',TaskController.insertNewTask)

router.get('/tasks',TaskController.showAll)

const TaskSchema = mongoose.Schema(
    {
        title: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        user_id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
        completionPercentage: {
          type: Number,
          default: false
        },
        // dueDate: Date,
        completionDate: {type:Date,default:null},
        subtasks: [subtaskSchema],
        softdelete : {
          type : Date,
          default : null 
        } ,

        cancelled : {
          type : String ,
          default : null 
        }
      
      },
      {
        timestamps: true,
      },
);

  
const Task= mongoose.model("Task", TaskSchema);
module.exports=Task;


module.exports=router
