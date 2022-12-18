import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')
 
  // Button reset hook and remove reset destructuring still pending
  // const reset = () => {
  //   setValue('')
  // }

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}