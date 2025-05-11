import React, {useContext} from 'react'
import { CountContext } from '../App'

function ComponentF2() {
  const countCountext = useContext(CountContext)
  return ( 
    <div>
      Component F2 - {countCountext.countState}
      <button onClick={() => countCountext.countDispatch('increment')}>Increment</button>
      <button onClick={() => countCountext.countDispatch('decrement')}>Decrement</button>
      <button onClick={() => countCountext.countDispatch('reset')}>Reset</button>
    </div>
  )
}

export default ComponentF2