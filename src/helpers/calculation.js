
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
