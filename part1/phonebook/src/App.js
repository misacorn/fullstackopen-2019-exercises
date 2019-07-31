import React, { useState } from "react";
import "./App.css";

const Name = ({ person }) => <li>{person.name}</li>;

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleNameChange = e => {
    setNewName(e.target.value);
  };

  const addName = e => {
    e.preventDefault();
    const nameObj = { name: newName };
    setPersons(persons.concat(nameObj));
    setNewName("");
  };

  const rows = () =>
    persons.map(person => <Name key={person.name} person={person} />);

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
