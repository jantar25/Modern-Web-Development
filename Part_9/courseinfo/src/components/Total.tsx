import React from 'react'
import { courseProps } from '../types'


const Total = ({courseParts}:courseProps) => {
  return (
    <p>
    Number of exercises{" "}
    {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </p>
  )
}

export default Total