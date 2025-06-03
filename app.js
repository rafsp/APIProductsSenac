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

app.put('/produtos/:id', (req, res) => {
  const { nome, preco } = req.body;
  const index = produtos.findIndex(p => p.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ erro: "Produto não encontrado" });
  }

  if (!nome || preco == null || preco <= 0) {
    return res.status(400).json({ erro: "Nome e preço válidos são obrigatórios" });
  }

  produtos[index] = { ...produtos[index], nome, preco };
  res.status(200).json(produtos[index]);
});

app.patch('/produtos/:id', (req, res) => {
  const produto = produtos.find(p => p.id === req.params.id);
  if (!produto) {
    return res.status(404).json({ erro: "Produto não encontrado" });
  }

  Object.assign(produto, req.body);
  res.status(200).json(produto);
});

app.delete('/produtos/:id', (req, res) => {
  const index = produtos.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ erro: "Produto não encontrado" });
  }

  produtos.splice(index, 1);
  res.status(204).send();
});



app.get('/produtos', (req, res) => {
  const { nome } = req.query;
  let lista = produtos;

  if (nome) {
    lista = produtos.filter(produto =>
      produto.nome.toLowerCase().includes(nome.toLowerCase())
    );
  }

  if (lista.length === 0) {
    return res.status(204).send();
  }

  return res.status(200).json(lista);
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});