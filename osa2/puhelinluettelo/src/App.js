import React, { useState, useEffect } from 'react';
import personService from './services/persons'
import './index.css'

const Filter = ({ showAll, handleShowChange }) => {
  return (
    <div>
      rajaa näytettäviä: <input value={showAll} onChange={handleShowChange} />
    </div>
  )
}

const PersonForm = ({ addPerson, newPerson, handlePersonChange, newNumber, handleNumberChange }) => {
  return (
    <form onSubmit={addPerson}>
      <div>nimi: <input value={newPerson} onChange={handlePersonChange} /></div>
      <div>numero: <input value={newNumber} onChange={handleNumberChange} /></div>
      <div>
        <button type="submit">lisää</button>
      </div>
    </form>
  )
}

const Persons = ({ persons, setPersons, personsToShow, setMessage }) => {

  const deletePerson = (id) => {
    const personToDelete = persons.find(person => person.id === id)

    if (window.confirm(`Poistetaanko ${personToDelete.name}?`)) {
      personService.remove(id)
      setPersons(persons.filter(person => person.id !== id))

      setMessage({
        text: `Poistettiin '${personToDelete.name}`,
        state: 'info'
      })
      setTimeout(() => {
        setMessage({ text: null })
      }, 5000)
    }
  }

  return (
    personsToShow.map(person =>
      <div key={person.id}>
        {person.name}
        {' '}
        {person.number}
        {' '}
        <button onClick={() => deletePerson(person.id)}>poista</button>
      </div>
    ))
}

const Notification = ({ message, state }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={state}>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState('')
  const [message, setMessage] = useState({ text: null, state: null })

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    const names = persons.map(person => person.name)
    event.preventDefault()
    const personObject = {
      name: newPerson,
      number: newNumber,
    }

    if (names.includes(newPerson)) {
      if (window.confirm(`${newPerson} on jo luettelossa, korvataanko vanha numero uudella?`)) {
        const personToUpdate = persons.find(person => person.name === newPerson)
        const changedPerson = { ...personToUpdate, number: newNumber }

        personService
          .update(personToUpdate.id, changedPerson).then(returnedPerson => {
            setPersons(persons.map(person => person !== personToUpdate ? person : returnedPerson.data))
            setMessage({
              text: `Henkilön '${newPerson}' numero päivitetty`,
              state: 'info'
            })
            setTimeout(() => {
              setMessage({ text: null })
            }, 5000)
          })
          .catch(error => {
            setMessage({
              text: `Henkilö '${newPerson} oli jo poistettu`,
              state: 'error'
            })
            setTimeout(() => {
              setMessage({ text: null })
            }, 5000)
            setPersons(persons.filter(person => person.id !== personToUpdate.id))
          })
      }
    } else {
      personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setMessage({
            text: `Lisättiin '${newPerson}'`,
            state: 'info'
          })
          setTimeout(() => {
            setMessage({ text: null })
          }, 5000)
        })
        .catch(error => {
          setMessage({
            text: error.response.data.error,
            state: 'error'
          })
          setTimeout(() => {
            setMessage({ text: null })
          }, 5000)
        })
    }

    setNewPerson('')
    setNewNumber('')
  }

  const handlePersonChange = (event) => {
    setNewPerson(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleShowChange = (event) => {
    setShowAll(event.target.value)
  }

  const personsToShow = showAll
    ? persons.filter(person => person.name.toUpperCase().includes(showAll.toUpperCase()))
    : persons

  return (
    <div>
      <h2>Puhelinluettelo</h2>

      <Notification message={message.text} state={message.state} />

      <Filter
        showAll={showAll}
        handleShowChange={handleShowChange}
      />

      <h3>lisää uusi</h3>

      <PersonForm
        addPerson={addPerson}
        newPerson={newPerson}
        handlePersonChange={handlePersonChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numerot</h3>

      <Persons
        persons={persons}
        setPersons={setPersons}
        personsToShow={personsToShow}
        setMessage={setMessage}
      />
    </div>
  )
}

export default App;