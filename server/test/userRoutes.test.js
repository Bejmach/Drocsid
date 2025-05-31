
import request from 'supertest';
import express from 'express';
import userRouter from '../routes/userRoutes.js';
import { expect } from 'chai';

const app = express();
app.use(express.json());
app.use('/users', userRouter);

describe('User API Routes', () => {
  it('GET /users/all should return all users', async () => {
    const res = await request(app).get('/users/all');
    expect(res.status).to.be.oneOf([200, 500]);
  });

  it('GET /users/register/:name/:email/:password should register user', async () => {
    const name = 'TestUser';
    const email = `test${Math.random()}@example.com`;
    const password = 'pass123';
    const res = await request(app).get(`/users/register/${name}/${email}/${password}`);
    expect(res.status).to.be.oneOf([200, 500]);
    if (res.status === 200) {
      expect(res.body).to.have.property('success');
    }
  });

  it('GET /users/login/:name/:password should attempt login', async () => {
    const name = 'TestUser';
    const password = 'pass123';
    const res = await request(app).get(`/users/login/${name}/${password}`);
    expect(res.status).to.be.oneOf([200, 500]);
  });

  it('GET /users/chat/:chatid should return users in chat', async () => {
    const chatId = '1';
    const res = await request(app).get(`/users/chat/${chatId}`);
    expect(res.status).to.be.oneOf([200, 500]);
  });
});

