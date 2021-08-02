const express = require('express');
const { v4: uuidV4 } = require('uuid');

const app = express();

const customers = [];

app.use(express.json());

function verifyIfExistsAccountCPF(request, response, next) {
  const { cpf } = request.headers;

  const customer = customers.find(user => user.cpf === cpf);

  if (!customer) {
    return response.status(400).json({ error: 'Customer not found' });
  }

  request.customer = customer;

  return next();
}

app.post('/account', (request, response) => {
  const { cpf, name } = request.body;

  const customerAlreadyExists = customers.some(
    customer => customer.cpf === cpf,
  );

  if (customerAlreadyExists) {
    return response.status(400).json({ erro: 'costumer already exists' });
  }

  customers.push({ cpf, name, id: uuidV4(), statement: [] });

  return response.status(201).send();
});

app.get('/stetment', verifyIfExistsAccountCPF, (request, response) => {
  const { customer } = request;
  return response.json({ statement: customer.statement });
});

app.listen(3333);
