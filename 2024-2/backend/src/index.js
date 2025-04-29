const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const pool = new Pool({
    user: 'postgres', // Seu usuário do PostgreSQL
    host: 'localhost',
    database: 'SAEP24-livros', // Nome da sua database
    password: 'postgre', // Sua senha
    port: 5432,
});

app.use(cors());
app.use(express.json());

// Rotas para Estudantes (mantidas conforme já definidas)

// Rotas para Livros

// Listar todos os livros
app.get('/livros', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM livros');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao buscar livros' });
    }
});

// Buscar livro por código
app.get('/livros/:codigo', async (req, res) => {
    const { codigo } = req.params;
    try {
        const result = await pool.query('SELECT * FROM livros WHERE codigo = $1', [codigo]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Livro não encontrado' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao buscar livro' });
    }
});

// Adicionar novo livro
app.post('/livros', async (req, res) => {
    const { titulo, autor, editora, ano, status } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO livros (titulo, autor, editora, ano, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [titulo, autor, editora, ano, status]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao adicionar livro' });
    }
});

// Atualizar livro
app.put('/livros/:codigo', async (req, res) => {
    const { codigo } = req.params;
    const { titulo, autor, editora, ano, status } = req.body;
    try {
        const result = await pool.query(
            'UPDATE livros SET titulo = $1, autor = $2, editora = $3, ano = $4, status = $5 WHERE codigo = $6 RETURNING *',
            [titulo, autor, editora, ano, status, codigo]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Livro não encontrado' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao atualizar livro' });
    }
});

// Deletar livro
app.delete('/livros/:codigo', async (req, res) => {
    const { codigo } = req.params;
    try {
        const result = await pool.query('DELETE FROM livros WHERE codigo = $1 RETURNING *', [codigo]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Livro não encontrado' });
        }
        res.json({ message: 'Livro deletado com sucesso' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao deletar livro' });
    }
});

// Rotas para Empréstimos (mantidas conforme já definidas)

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
