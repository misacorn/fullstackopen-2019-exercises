require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");

const app = express();

app.use(express.static("build"));
app.use(cors());
app.use(bodyParser.json());

morgan.token("post", function(req, res) {
  return JSON.stringify(req.body);
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :post")
);

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons.map(person => person.toJSON()));
  });
});

app.get("/api/persons/:id", (req, res) => {
  Person.findById(req.params.id).then(person => {
    res.json(person.toJSON());
  });
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter(p => p.id !== id);
  res.status(204).end();
});

app.get("/info", (req, res) => {
  const date = new Date();
  res.send(
    `<div>
      <p>Phonebook has info for ${persons.length} people</p>
      <p>${date}</p>
    </div>`
  );
});

app.post("/api/persons/", (req, res) => {
  const body = req.body;
  if (body.name === undefined || body.number === undefined) {
    return res.status(400).json({ error: "content missing" });
  }
  const person = new Person({
    name: body.name,
    number: body.number
  });
  person.save().then(savedPerson => {
    res.json(savedPerson.toJSON());
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
