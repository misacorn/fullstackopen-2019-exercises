const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");

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

let persons = [
  {
    name: "Arto Hellas",
    number: "0000000000",
    id: 1
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4
  }
];

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find(p => p.id === id);
  person ? res.json(person) : res.status(404).end();
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
  const maxId = Math.floor(Math.random() * Math.floor(1000));

  if (!req.body.name || !req.body.number) {
    return res.status(400).json({
      error: "content missing"
    });
  }

  const nameFilter = persons.filter(p => p.name === req.body.name);

  if (nameFilter.length > 0) {
    return res.status(400).json({
      error: "name must be unique"
    });
  }

  const newPerson = {
    name: req.body.name,
    number: req.body.number,
    id: maxId
  };

  persons = persons.concat(newPerson);
  res.json(newPerson);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
