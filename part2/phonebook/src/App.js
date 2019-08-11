import React, { useState, useEffect } from "react";

import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameSearch, setSearchName] = useState("");

  useEffect(() => {
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons);
    });
  }, []);

  const handleNameChange = e => setNewName(e.target.value);

  const handleNumberChange = e => setNewNumber(e.target.value);

  const handleNameSearch = e => setSearchName(e.target.value);

  const addPerson = e => {
    e.preventDefault();
    const nameFilter = persons.filter(person => person.name === newName);
    if (nameFilter.length === 0) {
      const nameObj = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      };
      personService.create(nameObj).then(newPerson => {
        setPersons([...persons, newPerson]);
        setNewName("");
        setNewNumber("");
      });
    } else {
      if (window.confirm(`Update ${nameFilter[0].name}?`)) {
        const personFound = persons.find(p => p.id === nameFilter[0].id);
        const changedPerson = { ...personFound, number: newNumber };
        personService
          .update(changedPerson.id, changedPerson)
          .then(
            setPersons(
              persons.map(p => (p.id !== changedPerson.id ? p : changedPerson))
            )
          );
      }
    }
  };

  const deletePerson = person => {
    if (window.confirm(`Delete ${person.name}?`)) {
      const newPersons = persons.filter(p => p.id !== person.id);
      personService.deletion(person.id).then(() => {
        setPersons(newPersons);
      });
    }
  };

  const rows = persons
    .filter(person =>
      person.name.toLowerCase().includes(nameSearch.toLowerCase())
    )
    .map(person => (
      <li key={person.id}>
        {person.name} - {person.number}
        <button onClick={() => deletePerson(person)}>Delete</button>
      </li>
    ));

  return (
    <>
      <h2>Phonebook</h2>
      <Filter nameSearch={nameSearch} handleNameSearch={handleNameSearch} />
      <h3>Add a new person</h3>
      <PersonForm
        addPerson={addPerson}
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
