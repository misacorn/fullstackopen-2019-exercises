const personsRouter = require('express').Router();
const Person = require('../models/person');

personsRouter.get('/', (req, res) => {
  Person.find({}).then(person => {
    res.json(person);
  });
});

personsRouter.get('/info', (req, res) => {
  const date = new Date();
  res.send(
    `<div>
      <p>Phonebook has info for ${Person.length} people</p>
      <p>${date}</p>
    </div>`
  );
});

personsRouter.get('/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      person ? res.json(person.toJSON()) : res.status(404).end();
    })
    .catch(error => next(error));
});

personsRouter.post('/', (req, res, next) => {
  const body = req.body;
  if (body.name === undefined || body.number === undefined) {
    return res.status(400).json({ error: 'content missing' });
  }
  const person = new Person({
    name: body.name,
    number: body.number
  });
  person
    .save()
    .then(savedPerson => {
      res.json(savedPerson.toJSON());
    })
    .catch(error => next(error));
});

personsRouter.delete('/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end();
    })
    .catch(error => next(error));
});

personsRouter.put('/:id', (req, res, next) => {
  const body = req.body;
  const person = {
    name: body.name,
    number: body.number
  };
  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatedPerson => {
      res.json(updatedPerson.toJSON());
    })
    .catch(error => next(error));
});

module.exports = personsRouter;
