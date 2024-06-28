// EXPRESS API SETUP
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 8080

// Body Parsing Middleware
app.use(bodyParser.json())

// MYSQL DATABASE CONNECTION
const mysql = require('mysql2/promise')

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'equino'
})

// Test Endpoint
app.get('/ping', (req, res) => {
    res.send('pong')
})

// USUARIO ENDPOINTS (login)
app.post('/', (req, res) => {
    // Handle login logic here
})

// ATLETA ENDPOINTS
app.post('/atleta', async (req, res) => {
    try {
        const { id, userID, nome, nascimento, documento } = req.body

        const query = 'INSERT INTO atleta (id, usuario, nome, nascimento, documento) VALUES (?, ?, ?, ?, ?)'
        const [results] = await connection.execute(query, [id, userID, nome, nascimento, documento])

        res.status(201).json({ message: 'Atleta created successfully', id: results.insertId })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Failed to create atleta' })
    }
})

// CAVALO ENDPOINTS
app.post('/cavalo', async (req, res) => {
    try {
        const { id, userID, nome } = req.body

        const query = 'INSERT INTO cavalo (id, usuario, nome) VALUES (?, ?, ?)'
        const [results] = await connection.execute(query, [id, userID, nome])

        res.status(201).json({ message: 'Cavalo created successfully', id: results.insertId })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Failed to create cavalo' })
    }
})

// Get all cavalos owned by a user based on that user's ID
app.get('/cavalos/:userID', async (req, res) => {
    try {
        const { userID } = req.params

        const query = 'SELECT * FROM cavalo WHERE usuario = ?'
        const [results] = await connection.execute(query, [userID])

        res.status(200).json(results)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Failed to fetch cavalos' })
    }
})

// Get all information about a specific cavalo based on its name and owner
app.get('/cavalo', async (req, res) => {
    try {
        const { nome, userID } = req.query

        const query = 'SELECT * FROM cavalo WHERE nome = ? AND usuario = ?'
        const [results] = await connection.execute(query, [nome, userID])

        res.status(200).json(results)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Failed to fetch cavalo' })
    }
})

// ENTIDADE ENDPOINTS
app.post('/entidade', async (req, res) => {
    try {
        const { id, userID, nome, endereco } = req.body

        const query = 'INSERT INTO entidade (id, usuario, nome, endereco) VALUES (?, ?, ?, ?)'
        const [results] = await connection.execute(query, [id, userID, nome, endereco])

        res.status(201).json({ message: 'Entidade created successfully', id: results.insertId })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Failed to create entidade' })
    }
})

// Get all entidades owned by a user based on that user's ID
app.get('/entidades/:userID', async (req, res) => {
    try {
        const { userID } = req.params

        const query = 'SELECT * FROM entidade WHERE usuario = ?'
        const [results] = await connection.execute(query, [userID])

        res.status(200).json(results)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Failed to fetch entidades' })
    }
})

// Get all information about a specific entidade based on its name and owner
app.get('/entidade', async (req, res) => {
    try {
        const { nome, userID } = req.query

        const query = 'SELECT * FROM entidade WHERE nome = ? AND usuario = ?'
        const [results] = await connection.execute(query, [nome, userID])

        res.status(200).json(results)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Failed to fetch entidade' })
    }
})

// INSCRICAO ENDPOINTS
app.post('/inscricao', async (req, res) => {
    try {
        const { id, atleta, cavalo, dia, evento, altura, categoria } = req.body

        const query = `INSERT INTO inscricao (id, atleta, cavalo, dia, evento, altura, categoria) 
                       VALUES (?, ?, ?, ?, ?, ?, ?)`
        const [results] = await connection.execute(query, [id, atleta, cavalo, dia, evento, altura, categoria])

        res.status(201).json({ message: 'Inscricao created successfully', id: results.insertId })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Failed to create inscricao' })
    }
})

// EVENTO ENDPOINTS
app.post('/evento', async (req, res) => {
    try {
        const { id, entidade, nome, descricao, inicio, fim } = req.body

        const query = 'INSERT INTO evento (id, entidade, nome, descricao, inicio, fim) VALUES (?, ?, ?, ?, ?, ?)'
        const [results] = await connection.execute(query, [id, entidade, nome, descricao, inicio, fim])

        res.status(201).json({ message: 'Evento created successfully', id: results.insertId })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Failed to create evento' })
    }
})

// Get the event with the closest date to the current date
app.get('/evento/closest', async (req, res) => {
    try {
        const query = 'SELECT * FROM evento ORDER BY inicio ASC LIMIT 1'
        const [results] = await connection.execute(query)

        res.status(200).json(results[0])
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Failed to fetch closest event' })
    }
})

// Get all events, ordered by closest date first
app.get('/eventos', async (req, res) => {
    try {
        const query = 'SELECT * FROM evento ORDER BY inicio ASC'
        const [results] = await connection.execute(query)

        res.status(200).json(results)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Failed to fetch events' })
    }
})

// DIA ENDPOINTS
app.post('/dia', async (req, res) => {
    try {
        const { id, evento, data } = req.body

        const query = 'INSERT INTO dia (id, evento, data) VALUES (?, ?, ?)'
        const [results] = await connection.execute(query, [id, evento, data])

        res.status(201).json({ message: 'Dia created successfully', id: results.insertId })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Failed to create dia' })
    }
})

// ALTURA ENDPOINTS
app.post('/altura', async (req, res) => {
    try {
        const { id, dia, altura } = req.body

        const query = 'INSERT INTO altura (id, dia, altura) VALUES (?, ?, ?)'
        const [results] = await connection.execute(query, [id, dia, altura])

        res.status(201).json({ message: 'Altura created successfully', id: results.insertId })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Failed to create altura' })
    }
})

// CATEGORIA ENDPOINTS
app.post('/categoria', async (req, res) => {
    try {
        const { id, nome } = req.body

        const query = 'INSERT INTO categoria (id, nome) VALUES (?, ?)'
        const [results] = await connection.execute(query, [id, nome])

        res.status(201).json({ message: 'Categoria created successfully', id: results.insertId })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Failed to create categoria' })
    }
})

// Get all atletas owned by a user based on that user's ID
app.get('/atletas/:userID', async (req, res) => {
    try {
        const { userID } = req.params

        const query = 'SELECT * FROM atleta WHERE usuario = ?'
        const [results] = await connection.execute(query, [userID])

        res.status(200).json(results)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Failed to fetch atletas' })
    }
})

// Get all information about a specific atleta based on its name and owner
app.get('/atleta', async (req, res) => {
    try {
        const { nome, userID } = req.query

        const query = 'SELECT * FROM atleta WHERE nome = ? AND usuario = ?'
        const [results] = await connection.execute(query, [nome, userID])

        res.status(200).json(results)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Failed to fetch atleta' })
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
