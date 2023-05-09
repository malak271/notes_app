const Task = require("../models/Task")
const { overallCompletionPercentage } = require("../helpers/calculation");
const { json } = require("express");

module.exports.insertNewTask = async (req, res) => {
    try {
        console.log(req.user._id)
        req.body.user_id = req.user._id;
        console.log(req.body)
        const task = await Task.create(req.body)
        res.status(200).json({ message: "task added successfully" })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
}

module.exports.showAll = async (req, res) => {
    try {
        const tasks = await Task.find({ user_id: req.user._id })
        

        const x = overallCompletionPercentage(tasks)
        // const y= calculateCompletionPercentagePerDay(tasks)
        res.status(200).json({ "tasks": tasks, "OverallCompletionPercentage": x })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports.showByID = async (req, res) => {
    try {
        const { id } = req.params
        const task = await Task.findById(id)
        res.status(200).json(task)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
}

module.exports.updateByID = async (req, res) => {
    try {
        const { id } = req.params
        const task = await Task.findByIdAndUpdate(id, req.body)
        if (!task) {
            res.status(404).json({ message: `${id} not found` })
        }
        const updatedTask = await Task.findById(id)
        res.status(200).json(updatedTask)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
}

module.exports.deleteByID = async (req, res) => {
    try {
        const { id } = req.params
        const task = await Task.findByIdAndDelete(id, req.body)
        if (!task) {
            res.status(404).json({ message: `${id} not found` })
        }
        res.status(200).json(task)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
}

//14785256

module.exports.calculateCompletionPercentagePerDay = async (req, res) => {
    try {
        // Group the tasks by date
        const tasks = await Task.find({ user_id: req.user._id })

        length=tasks.length

        tasksByDate = tasks.flatMap(item => {
            if (item.subtasks.length == 0 & item.completionPercentage == 100)
                return [ {
                    "description": item.description,
                    "_id": item._id,
                    "completionDate":item.completionDate,
                    "completed":1
                     }]

            item.subtasks.forEach(element => {
                element.completed=1/item.subtasks.length //subtask weight at the level of all tasks
            });
            return item.subtasks
        });

        tasksByDate=tasksByDate.reduce((acc, task) => {
            if (task.completionDate == null) return acc;
            const completionDate = task.completionDate.toISOString();
            const dateOnly = completionDate.substring(0, completionDate.indexOf('T'));
            if (!acc[dateOnly]) { //if the date is new add new row to the array
                acc[dateOnly] = [];
            }
            acc[dateOnly].push(task); 
            return acc;

        }, {});

        console.log(tasksByDate)

        //   Calculate the average completion rate for each date
        const averageCompletionRatesPerDay = Object.entries(tasksByDate).map(([date, tasks]) => {
            const totalCompletionRate = tasks.reduce((acc, task) => acc + task.completed, 0);
            const averageCompletionRate = (totalCompletionRate) / length * 100;
            return { date, averageCompletionRate };
        });
        
        res.status(200).json({ "averageCompletionRatesPerDay": averageCompletionRatesPerDay })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
}

module.exports.cancelTask = async(req,res)=>{
   
    try{
    const {id} = req.params
    const task = await Task.findById(id)
    task.status = "cancelled"
    task.save()
    res.status(200).json(task)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }

}