// EXPRESS API SETUP
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const { body, param, query, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const csrf = require('csurf');

// Load environment variables from .env
require('dotenv').config();

const PORT = process.env.PORT || 8080;
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

// Middleware
app.use(bodyParser.json());
app.use(csrf({ cookie: true }));

// Middleware de autenticação
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) return res.sendStatus(403);
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'An unexpected error occurred' });
});

// Test Endpoint
app.get('/ping', (req, res) => {
    res.send('pong');
});

// USUARIO ENDPOINTS (login)
app.post('/login', [
    body('username').isString(),
    body('password').isString()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;
    // Simular a verificação do usuário - substituir por lógica real
    if (username === 'user' && password === 'pass') {
        const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

// ATLETA ENDPOINTS
app.post('/atleta', [
    body('id').isInt(),
    body('userID').isInt(),
    body('nome').isString(),
    body('nascimento').isISO8601(),
    body('documento').isString()
], authenticateJWT, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { id, userID, nome, nascimento, documento } = req.body;
        const query = 'INSERT INTO atleta (id, usuario, nome, nascimento, documento) VALUES (?, ?, ?, ?, ?)';
        const [results] = await pool.execute(query, [id, userID, nome, nascimento, documento]);
        res.status(201).json({ message: 'Atleta created successfully', id: results.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create atleta' });
    }
});

// CAVALO ENDPOINTS
app.post('/cavalo', [
    body('id').isInt(),
    body('userID').isInt(),
    body('nome').isString()
], authenticateJWT, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { id, userID, nome } = req.body;
        const query = 'INSERT INTO cavalo (id, usuario, nome) VALUES (?, ?, ?)';
        const [results] = await pool.execute(query, [id, userID, nome]);
        res.status(201).json({ message: 'Cavalo created successfully', id: results.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create cavalo' });
    }
});

app.get('/cavalos/:userID', [
    param('userID').isInt()
], authenticateJWT, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { userID } = req.params;
        const query = 'SELECT * FROM cavalo WHERE usuario = ?';
        const [results] = await pool.execute(query, [userID]);
        res.status(200).json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch cavalos' });
    }
});

app.get('/cavalo', [
    query('nome').isString(),
    query('userID').isInt()
], authenticateJWT, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { nome, userID } = req.query;
        const query = 'SELECT * FROM cavalo WHERE nome = ? AND usuario = ?';
        const [results] = await pool.execute(query, [nome, userID]);
        res.status(200).json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch cavalo' });
    }
});

// ENTIDADE ENDPOINTS
app.post('/entidade', [
    body('id').isInt(),
    body('userID').isInt(),
    body('nome').isString(),
    body('endereco').isString()
], authenticateJWT, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { id, userID, nome, endereco } = req.body;
        const query = 'INSERT INTO entidade (id, usuario, nome, endereco) VALUES (?, ?, ?, ?)';
        const [results] = await pool.execute(query, [id, userID, nome, endereco]);
        res.status(201).json({ message: 'Entidade created successfully', id: results.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create entidade' });
    }
});

app.get('/entidades/:userID', [
    param('userID').isInt()
], authenticateJWT, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { userID } = req.params;
        const query = 'SELECT * FROM entidade WHERE usuario = ?';
        const [results] = await pool.execute(query, [userID]);
        res.status(200).json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch entidades' });
    }
});

app.get('/entidade', [
    query('nome').isString(),
    query('userID').isInt()
], authenticateJWT, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { nome, userID } = req.query;
        const query = 'SELECT * FROM entidade WHERE nome = ? AND usuario = ?';
        const [results] = await pool.execute(query, [nome, userID]);
        res.status(200).json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch entidade' });
    }
});

// INSCRICAO ENDPOINTS
app.post('/inscricao', [
    body('id').isInt(),
    body('atleta').isInt(),
    body('cavalo').isInt(),
    body('dia').isISO8601(),
    body('evento').isInt(),
    body('altura').isFloat(),
    body('categoria').isString()
], authenticateJWT, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { id, atleta, cavalo, dia, evento, altura, categoria } = req.body;
        const query = `INSERT INTO inscricao (id, atleta, cavalo, dia, evento, altura, categoria) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const [results] = await pool.execute(query, [id, atleta, cavalo, dia, evento, altura, categoria]);
        res.status(201).json({ message: 'Inscricao created successfully', id: results.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create inscricao' });
    }
});

// EVENTO ENDPOINTS
app.post('/evento', [
    body('id').isInt(),
    body('entidade').isInt(),
    body('nome').isString(),
    body('descricao').isString(),
    body('inicio').isISO8601(),
    body('fim').isISO8601()
], authenticateJWT, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { id, entidade, nome, descricao, inicio, fim } = req.body;
        const query = 'INSERT INTO evento (id, entidade, nome, descricao, inicio, fim) VALUES (?, ?, ?, ?, ?, ?)';
        const [results] = await pool.execute(query, [id, entidade, nome, descricao, inicio, fim]);
        res.status(201).json({ message: 'Evento created successfully', id: results.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create evento' });
    }
});

app.get('/evento/closest', async (req, res) => {
    try {
        const query = 'SELECT * FROM evento ORDER BY inicio ASC LIMIT 1';
        const [results] = await pool.execute(query);
        res.status(200).json(results[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch closest event' });
    }
});

app.get('/eventos', async (req, res) => {
    try {
        const query = 'SELECT * FROM evento ORDER BY inicio ASC';
        const [results] = await pool.execute(query);
        res.status(200).json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch events' });
    }
});

// DIA ENDPOINTS
app.post('/dia', [
    body('id').isInt(),
    body('evento').isInt(),
    body('data').isISO8601()
], authenticateJWT, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { id, evento, data } = req.body;
        const query = 'INSERT INTO dia (id, evento, data) VALUES (?, ?, ?)';
        const [results] = await pool.execute(query, [id, evento, data]);
        res.status(201).json({ message: 'Dia created successfully', id: results.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create dia' });
    }
});

// ALTURA ENDPOINTS
app.post('/altura', [
    body('id').isInt(),
    body('dia').isInt(),
    body('altura').isFloat()
], authenticateJWT, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { id, dia, altura } = req.body;
        const query = 'INSERT INTO altura (id, dia, altura) VALUES (?, ?, ?)';
        const [results] = await pool.execute(query, [id, dia, altura]);
        res.status(201).json({ message: 'Altura created successfully', id: results.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create altura' });
    }
});

// CATEGORIA ENDPOINTS
app.post('/categoria', [
    body('id').isInt(),
    body('nome').isString()
], authenticateJWT, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { id, nome } = req.body;
        const query = 'INSERT INTO categoria (id, nome) VALUES (?, ?)';
        const [results] = await pool.execute(query, [id, nome]);
        res.status(201).json({ message: 'Categoria created successfully', id: results.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create categoria' });
    }
});

// ATLETA ENDPOINTS
app.get('/atletas/:userID', [
    param('userID').isInt()
], authenticateJWT, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { userID } = req.params;
        const query = 'SELECT * FROM atleta WHERE usuario = ?';
        const [results] = await pool.execute(query, [userID]);
        res.status(200).json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch atletas' });
    }
});

app.get('/atleta', [
    query('nome').isString(),
    query('userID').isInt()
], authenticateJWT, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { nome, userID } = req.query;
        const query = 'SELECT * FROM atleta WHERE nome = ? AND usuario = ?';
        const [results] = await pool.execute(query, [nome, userID]);
        res.status(200).json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch atleta' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
