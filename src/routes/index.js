const verifyToken=require('../helpers/verifyToken')
const router=require('express').Router()

module.exports = (app) => {
    const authRoute = require("./auth")
    app.use('/api/user', authRoute)  //any auth route should prefix with api/user

    const taskRoute = require('./task')
    app.use('/api/task', verifyToken, taskRoute)  //any task route should prefix with api/task


    const subtaskRoute = require('./subtask')
    app.use('/api/subtask', verifyToken, subtaskRoute)  //any task route should prefix with api/task

} 

