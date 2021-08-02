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

function getBalance(statement) {
  const balance = statement.reduce((acumulator, operation) => {
    if (operation.type === 'credit') {
      return acumulator + operation.amount;
    }

    return acumulator - operation.amount;
  }, 0);

  return balance;
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

app.get('/statement', verifyIfExistsAccountCPF, (request, response) => {
  const { customer } = request;
  return response.json({ statement: customer.statement });
});

app.get('/statement/date', verifyIfExistsAccountCPF, (request, response) => {
  const { customer, query } = request;

  const dateFormatted = new Date(`${query.date} 00:00`);

  const statementFiltered = customer.statement.filter(
    statement =>
      statement.created_at.toDateString() ===
      new Date(dateFormatted).toDateString(),
  );

  return response.json(statementFiltered);
});

app.post('/deposit', verifyIfExistsAccountCPF, (request, response) => {
  const { description, amount } = request.body;
  const { customer } = request;

  const statmentOperation = {
    description,
    amount,
    created_at: new Date(),
    type: 'credit',
  };

  customer.statement.push(statmentOperation);

  return response.status(201).send();
});

app.post('/withdraw', verifyIfExistsAccountCPF, (request, response) => {
  const { body, customer } = request;

  const balance = getBalance(customer.statement);

  if (balance < body.amount) {
    return response.status(400).json({ error: 'Insulficient founds' });
  }

  const statmentOperation = {
    description: 'withdraw',
    amount: body.amount,
    created_at: new Date(),
    type: 'debit',
  };

  customer.statement.push(statmentOperation);
  return response.status(201).send();
});

app.listen(3333);
