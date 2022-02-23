import request from 'supertest';
import { Connection, createConnection } from 'typeorm';
import { hash } from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

import { app } from '@shared/infra/http/app';

let connection: Connection;

describe('Create category controller', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuidv4();
    const password = await hash('admin', 8);

    await (
      await connection
    ).query(
      `
      INSERT INTO USERS(id, name, email, password, is_admin, created_at, driver_license)
      values('${id}', 'admin123', 'admin@rentalx.com.br', '${password}', true, 'now()', 'XXXXXX')
      `,
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to list all available categories', async () => {
    const responseSession = await request(app)
      .post('/sessions')
      .send({ email: 'admin@rentalx.com.br', password: 'admin123' });

    const { token } = responseSession.body;

    await request(app)
      .post('/categories')
      .send({ name: 'Category supertest list', description: 'Category supertest list' })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const response = await request(app).get('/categories');

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });
});
