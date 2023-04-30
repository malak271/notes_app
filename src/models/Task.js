const mongoose=require("mongoose");

const subtaskSchema = mongoose.Schema({
  subtaskId: { type: Number, required: true, unique: true },
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: Number,
    validate: {
      validator: function(v) {
        return v === 0 || v === 1;
      },
      message: 'Value must be either 0 or 1'
    },
    default:0
  },
  completionDate: {type:Date,default:null},
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
        completionPercentage: {
          type: Number,
          default: false
        },
        completionPercentagePerDay: {
          type: Number,
          default: false
        },
        dueDate: Date,
        completionDate: {type:Date,default:null},
        subtasks: [subtaskSchema]
      },
      {
        timestamps: true,
      }
);

const Task= mongoose.model("Task", TaskSchema);
module.exports=Task;