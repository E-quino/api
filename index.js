// EXPRESS API SETUP
const express = require('express')
const app = express()

const PORT = process.env.PORT || 8080


// MYSQL DATABASE CONNECTION
const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'equino'
})

// test
app.get('/ping', (req, res) => {
    res.send('pong')
})
