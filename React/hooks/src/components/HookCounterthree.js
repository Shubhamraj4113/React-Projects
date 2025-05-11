import React, { useState } from 'react'

function HookCounterthree() {

  const [name, setName] = useState({fristName: '', lastName: ''})
  return (
    <form>
      <input 
        type="text" 
        placeholder='Frist Name'
        value={name.fristName} 
        onChange={e => setName({ ...name, fristName: e.target.value })} 
      />
      <input 
        type="text"
        placeholder='Last Name'
        value={name.lastName} 
        onChange={e => setName({ ...name, lastName: e.target.value })} 
      />
      <h2>Your first name is - {name.fristName}</h2>
      <h2>Your last name is - {name.lastName}</h2>
      <h2>{JSON.stringify(name)}</h2>
    </form>
  )
}

export default HookCounterthree