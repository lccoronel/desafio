const express = require('express');
const { v4: uuidV4 } = require('uuid');

const app = express();

const custumers = [];

app.use(express.json());

app.post('/account', (request, response) => {
  const { cpf, name } = request.body;

  const customerAlreadyExists = custumers.some(
    customer => customer.cpf === cpf,
  );

  if (customerAlreadyExists) {
    return response.status(400).json({ erro: 'costumer already exists' });
  }

  custumers.push({ cpf, name, id: uuidV4(), statement: [] });

  return response.status(201).send();
});

app.get('/stetment/:cpf', (request, response) => {
  const { cpf } = request.params;

  const { statement } = custumers.find(user => user.cpf === cpf);

  return response.json({ statement });
});

app.listen(3333);
