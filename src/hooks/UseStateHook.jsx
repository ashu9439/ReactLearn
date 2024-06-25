import {useState} from 'react'

function useStateHook() {
  const [state, setState] = useState(1)
  setState(state +1)
  return (
    <>
    <h1>useStateHook : </h1>
    <div>{state}</div>
    </>
    
  )
}

export default useStateHook