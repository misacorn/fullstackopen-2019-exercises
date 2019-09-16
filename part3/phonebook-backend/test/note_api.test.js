const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

test('notes are returned as json', async () => {
  await api
    .get('/api/persons')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('there are five notes', async () => {
  const response = await api.get('/api/persons');
  expect(response.body.length).toBe(5);
});

test('the first note is about HTTP methods', async () => {
  const response = await api.get('/api/persons');
  expect(response.body[0].name).toBe('Ana');
});

afterAll(() => {
  mongoose.connection.close();
});
