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



// USUARIO ENDPOINTS (login)

app.post('/', (req, res) =>{

})


// ATLETA ENDPOINTS

app.post('/', (req, res) =>{

})


// CAVALO ENDPOINTS

app.post('/', (req, res) =>{

})


// ENTIDADE ENDPOINTS

app.post('/', (req, res) =>{

})


// INSCRICAO ENDPOINTS

app.post('/', (req, res) =>{

})


// EVENTO ENDPOINTS

app.post('/', (req, res) =>{

})


// DIA ENDPOINTS

app.post('/', (req, res) =>{

})


// ALTURA ENDPOINTS

app.post('/', (req, res) =>{

})



// CATEGORIA ENDPOINTS

app.post('/', (req, res) =>{

})




