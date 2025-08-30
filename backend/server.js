// /wishlist-app/backend/server.js

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3002;

// 1. Middlewares: Configurações que rodam em toda requisição
// Devem ser definidos ANTES das rotas.
app.use(cors());
app.use(express.json());

// 2. Configuração do "Banco de Dados" em arquivo JSON
const DB_PATH = path.join(__dirname, 'db.json');

const initializeDatabase = () => {
  if (fs.existsSync(DB_PATH)) {
    return; // O arquivo já existe, não faz nada.
  }
  const initialData = {
    items: [
      { id: 1, name: 'Mangá One Piece Vol.1', link: 'https://www.amazon.com.br/One-Piece-Ed-Eiichiro-Oda/dp/8573516976', purchased: false },
      { id: 2, name: 'Fone de ouvido', link: 'https://www.mercadolivre.com.br/fone-de-ouvido-com-mic-sem-fio-wave-beam-2-jbl-preto/p/MLB43943907', purchased: false },
    ],
    nextId: 3
  };
  fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2));
  console.log('Arquivo db.json não encontrado, criando com dados iniciais.');
};

const readData = () => {
    const data = fs.readFileSync(DB_PATH);
    return JSON.parse(data);
};

const writeData = (data) => {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
};

// 3. Rotas da API (Endpoints)
app.get('/items', (req, res) => {
    console.log('Recebida requisição GET para /items');
    const data = readData();
    res.json(data.items);
});

app.post('/items', (req, res) => {
    const { name, link } = req.body; 
    if (!name) {
        return res.status(400).json({ message: 'O nome do item é obrigatório.' });
    }
    const data = readData();
    const newItem = {
        id: data.nextId,
        name: name,
        link: link,
        purchased: false
    };
    data.items.push(newItem); 
    data.nextId++;
    writeData(data);
    console.log('Item adicionado:', newItem);
    res.status(201).json(newItem); 
});

app.delete('/items/:id', (req, res) => {
    const id = parseInt(req.params.id); 
    const data = readData();
    const itemsBefore = data.items.length;
    data.items = data.items.filter(item => item.id !== id);
    if (data.items.length === itemsBefore) {
        return res.status(404).json({ message: 'Item não encontrado para deletar.' });
    }
    writeData(data);
    console.log(`Item com ID ${id} deletado.`);
    res.status(204).send(); 
});

// Rota para ATUALIZAR UM ITEM (PATCH) - unificada
app.patch('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, link, purchased } = req.body;

    const data = readData();
    const itemIndex = data.items.findIndex(item => item.id === id);

    if (itemIndex === -1) {
        res.status(404).json({ message: 'Item não encontrado para atualizar.' });
        return;
    }

    const itemToUpdate = data.items[itemIndex];

    // Atualiza os campos se eles foram fornecidos no corpo da requisição
    if (name !== undefined) {
        if (typeof name !== 'string' || name.trim() === '') {
            return res.status(400).json({ message: "O nome do item não pode ser vazio." });
        }
        itemToUpdate.name = name;
    }
    if (link !== undefined) {
        itemToUpdate.link = link;
    }
    if (purchased !== undefined) {
        if (typeof purchased !== 'boolean') {
            return res.status(400).json({ message: "O campo 'purchased' deve ser um valor booleano." });
        }
        itemToUpdate.purchased = purchased;
    }

    writeData(data);
    console.log(`Item com ID ${id} atualizado.`);
    res.json(itemToUpdate);
});

// 4. Inicia o servidor. Esta deve ser a última parte do arquivo.
app.listen(PORT, () => {
    initializeDatabase();
    console.log(`Servidor backend rodando em http://localhost:${PORT}`);
});
