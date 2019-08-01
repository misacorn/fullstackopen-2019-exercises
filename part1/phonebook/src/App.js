import React, { useState } from "react";
import "./App.css";

const Person = ({ person }) => (
  <li>
    {person.name} - {person.number}
  </li>
);

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "0401234567", id: 0 }
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleNameChange = e => setNewName(e.target.value);

  const handleNumberChange = e => setNewNumber(e.target.value);

  const addName = e => {
    e.preventDefault();
    const nameFilter = persons.filter(person => person.name === newName);
    if (nameFilter.length === 0) {
      const nameObj = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      };
      setPersons(persons.concat(nameObj));
      setNewName("");
    } else {
      window.alert(`${newName} is already added to phonebook!`);
    }
  };

  const rows = () =>
    persons.map(person => <Person key={person.id} person={person} />);

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          Name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          Number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>{rows()}</ul>
    </div>
  );
};

export default App;
