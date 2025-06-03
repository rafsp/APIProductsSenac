const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let produtos = [];

app.post('/produtos', (req, res) => {
  const { nome, preco } = req.body;

  if (!nome || preco == null) {
    return res.status(400).json({ erro: "Campos 'nome' e 'preco' são obrigatórios" });
  }

  if (typeof preco !== 'number' || preco <= 0) {
    return res.status(400).json({ erro: "'preco' deve ser um número positivo" });
  }

  const novoProduto = {
    id: Date.now().toString(),
    nome,
    preco
  };

  produtos.push(novoProduto);
  res.status(201).json(novoProduto);
});

app.get('/produtos', (req, res) => {
  if (produtos.length === 0) return res.status(204).send();
  res.status(200).json(produtos);
});


app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});