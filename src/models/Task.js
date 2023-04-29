const mongoose=require("mongoose");

const subtaskSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false
  }
})

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
        completed: {
          type: Boolean,
          default: false
        },
        dueDate: Date,
        subtasks: [subtaskSchema]
      },
      {
        timestamps: true,
      }
);

const Task= mongoose.model("Task", TaskSchema);
module.exports=Task;