import React from 'react'
import Person from './Person'

function NameList() {

  const names = ['Tony', 'Steve', 'Thor', 'Tony']
  // const nameList = names.map(name => <h2>{name}</h2>)

  const persons = [
    {
      id: 1,
      name: 'Tony',
      age: 30,
      skill: 'React'
    },
    {
      id: 2,
      name: 'Steve',
      age: 25,
      skill: 'Angular'
    },
    {
      id: 3,
      name: 'Thor',
      age: 28,
      skill: 'Vue'
    }
  ]
  // const personList = persons.map(person => 
  //   <h2>
  //     I am {person.name}. I am {person.age} years old. I know {person.skill}
  //   </h2>
  // )
  const nameList = names.map((name, index) => <h2 key={index}>{index} {name}</h2>)
  return <div>{nameList}</div>
}

export default NameList