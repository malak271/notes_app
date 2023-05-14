const express = require('express')
const cors = require('cors');

module.exports = (app) => {
    app.use(cors({
        origin: 'http://localhost:8080'
    }));
    app.use(express.json())
    app.use(express.urlencoded({extended:false}))
}