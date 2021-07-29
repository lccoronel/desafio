const express = require('express');
const { v4: uuidV4 } = require('uuid');

const app = express();

const costumers = [];

app.use(express.json());

app.post('/account', (request, response) => {
  const { cpf, name } = request.body;

  const customerAlreadyExists = costumers.some(
    customer => customer.cpf === cpf,
  );

  if (customerAlreadyExists) {
    return response.status(400).json({ erro: 'costumer already exists' });
  }

  costumers.push({ cpf, name, id: uuidV4(), statement: [] });

  return response.status(201).send();
});

app.listen(3333);
