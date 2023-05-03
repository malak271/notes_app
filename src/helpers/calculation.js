const Task = require("../models/Task")

module.exports.overallCompletionPercentage = (tasks) => {

    // calculate the sum of all completion percentages
    const sumCompletionPercentages = tasks.reduce((sum, task) => {
        return sum + task.completionPercentage
    }, 0);

    console.log(sumCompletionPercentages)
    // calculate the total weight (i.e., sum of all completion percentages)
    const overallCompletionPercentage = (sumCompletionPercentages / (tasks.length * 100)) * 100;

    return overallCompletionPercentage;

}


module.exports.calculateTaskCompletionPercentage =  (task) => { 
    try {
        // const { id } = req.params
        // const task = await Task.findById(id)
        const subtasks = task.subtasks;
        const totalSubtasks = subtasks.length;

        // if (totalSubtasks === 0) {
        //     return task.completed ? 100 : 0;
        // }

        const completedSubtasks = subtasks.filter(subtask => subtask.completed);
        const completedSubtasksCount = completedSubtasks.length;

        const subtasksCompletionPercentage = completedSubtasksCount / totalSubtasks;

        const x = Math.round(subtasksCompletionPercentage * 100)

        // task.completionPercentage = x;
        // await task.save();

        // res.status(200).json({ CompletionPercentage: Math.round(subtasksCompletionPercentage * 100) })

        return x

    } catch (error) {
        console.log(error.message)
        // res.status(500).json({ message: error.message })
    }
}