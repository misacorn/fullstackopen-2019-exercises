import React, { useState } from "react";
import "./App.css";

const Name = ({ person }) => <li>{person.name}</li>;

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas", id: 0 }]);
  const [newName, setNewName] = useState("");

  const handleNameChange = e => {
    setNewName(e.target.value);
  };

  const addName = e => {
    e.preventDefault();
    const nameFilter = persons.filter(person => person.name === newName);
    if (nameFilter.length === 0) {
      const nameObj = {
        name: newName,
        date: new Date().toISOString(),
        // important: Math.random() > 0.5,
        id: persons.length + 1
      };
      setPersons(persons.concat(nameObj));
      setNewName("");
    } else {
      window.alert(`${newName} is already added to phonebook!`);
    }
  };

  const rows = () =>
    persons.map(person => <Name key={person.id} person={person} />);

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          Name: <input value={newName} onChange={handleNameChange} />
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
