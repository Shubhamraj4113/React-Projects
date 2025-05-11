import React, {useState, useEffect} from 'react'

function IntervalHookCounter() {
  const [count, setCount] = useState(0)

  const tick = () => {
    // setCount(count + 1)
    setCount(prevCount => prevCount + 1)
  }
  
  useEffect(() => {
    function doSomething() {
      console.log(someProp)
    }
    doSomething()

    const interval = setInterval(tick, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [someProp]) // dependency list [count]

  return (
    <div>
      {count}
    </div>
  )
}

export default IntervalHookCounter

// A sample of using multiple useEffect.
// function FriendStatusWithCounter(props) {
//   const [count, setCount] = useState(0)
//   useEffect(() => {
//     document.title = `You clicked ${count} times`
//   })

//   const [isOnline, setIsOnline] = useState(null)
//   useEffect(() => {
//     function handleStatusChange(status) {
//       setIsOnline(status.isOnline)
//     }

//     ChatAPI.subscribrtoFriendStatus(props.friend.id, handleStatusChange)
//     return () => {
//       ChatAPI.subscribrtoFriendStatus(props.friend.id, handleStatusChange)
//     }
//   })
// }