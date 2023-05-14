const mongoose = require("mongoose");
//const calculation = require("../")

const subtaskSchema = mongoose.Schema({
  // subtaskId: { type: Number, required: true },
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: Number,
    validate: {
      validator: function (v) {
        return v == 0 || v == 1;
      },
      message: 'Value must be either 0 or 1'
    },
    default: 0
  },
  completionDate: { type: Date, default: null },
  softdelete: {
    type: Date,
    default: null
  },
  // status: {
  //   type: String,
  //   default: "active"
  // }


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
    completionDate: { type: Date, default: null },
    subtasks: [subtaskSchema],
    softdelete: {
      type: Date,
      default: null
    },

    // status: {
    //   type: String,
    //   default: "active"
    // }

  },
  {
    timestamps: true,
  },


);

const Task = mongoose.model("Task", TaskSchema);
module.exports = Task;