// EXPRESS API SETUP
const express = require('express')
const app = express()

const PORT = process.env.PORT || 8080

//

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

app.post('/atleta', (req, res) =>{

    let id =  undefined;
    let userID = undefined;
    let nome = undefined;
    let nascimento = undefined;
    let documento = undefined;


    let query = `INSERT INTO atleta(id, usuario, nome, nascimento, documento) VALUES();`

    connection.query(query, (err, results, fields) => {
        console.log(err)
        console.log(results)
        console.log(fields)

        if(err == null){
            res.json(results)
        }else{
            res.send('ERROR')
        }
    })


})


// CAVALO ENDPOINTS

app.post('/cavalo', (req, res) =>{

})


// ENTIDADE ENDPOINTS

app.post('/entidade', (req, res) =>{

})


// INSCRICAO ENDPOINTS

app.post('/inscricao', (req, res) =>{

})


// EVENTO ENDPOINTS

app.post('/evento', (req, res) =>{

})


// DIA ENDPOINTS

app.post('/dia', (req, res) =>{

})


// ALTURA ENDPOINTS

app.post('/altura', (req, res) =>{

})



// CATEGORIA ENDPOINTS

app.post('/categoria', (req, res) =>{

})




