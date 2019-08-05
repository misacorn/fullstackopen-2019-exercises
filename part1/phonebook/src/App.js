import React, { useState, useEffect } from "react";

import axios from "axios";

const Persons = ({ rows }) => <ul>{rows}</ul>;

const Filter = ({ nameSearch, handleNameSearch }) => (
  <div>
    Filter shown with <input value={nameSearch} onChange={handleNameSearch} />
  </div>
);

const PersonForm = ({
  addName,
  newName,
  newNumber,
  handleNameChange,
  handleNumberChange
}) => (
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
);

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameSearch, setSearchName] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then(response => {
      setPersons(response.data);
    });
  }, []);

  const handleNameChange = e => setNewName(e.target.value);

  const handleNumberChange = e => setNewNumber(e.target.value);

  const handleNameSearch = e => setSearchName(e.target.value);

  const addName = e => {
    e.preventDefault();
    const nameFilter = persons.filter(person => person.name === newName);
    if (nameFilter.length === 0) {
      const nameObj = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      };
      setPersons([...persons, nameObj]);
      setNewName("");
      setNewNumber("");
    } else {
      window.alert(`${newName} is already added to phonebook!`);
    }
  };

  const rows = persons
    .filter(person =>
      person.name.toLowerCase().includes(nameSearch.toLowerCase())
    )
    .map(person => (
      <li key={person.id}>
        {person.name} - {person.number}
      </li>
    ));

  return (
    <>
      <h2>Phonebook</h2>
      <Filter nameSearch={nameSearch} handleNameSearch={handleNameSearch} />
      <h3>Add a new person</h3>
      <PersonForm
        addName={addName}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons rows={rows} />
    </>
  );
};

export default App;
