const verify=require('../helpers/verifyToken')


module.exports = (app) => {
    const authRoute = require("./auth")
    app.use('/api/user', authRoute)  //any auth route should prefix with api/user

    const taskRoute = require('./task')
    app.use('/api/task', verify, taskRoute)  //any task route should prefix with api/task


    const subtaskRoute = require('./subtask');
    app.use('/api/subtask', verify, subtaskRoute)  //any subtask route should prefix with api/subtask
} 

