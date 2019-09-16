const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Person = require('../models/person');

const initialPersons = [
  {
    name: 'Ana',
    number: '040-1234556',
    id: '5d6958407c45fad44f58e408'
  },
  {
    name: 'Misa',
    number: '0000000000',
    id: '5d6ac39e3329bedbe9415b6f'
  }
];

beforeEach(async () => {
  await Person.deleteMany({});

  let personObject = new Person(initialPersons[0]);
  await personObject.save();

  personObject = new Person(initialPersons[1]);
  await personObject.save();
});

test('persons are returned as json', async () => {
  await api
    .get('/api/persons')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('there are five persons', async () => {
  const res = await api.get('/api/persons');
  expect(res.body.length).toBe(initialPersons.length);
});

test('the first person', async () => {
  const res = await api.get('/api/persons');
  const name = res.body.map(r => r.name);
  expect(name).toContain('Ana');
});

afterAll(() => {
  mongoose.connection.close();
});
