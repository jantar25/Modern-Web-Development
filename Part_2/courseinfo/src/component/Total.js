import React from 'react'

const Total = ({ parts }) =>{
    const calculTotal = parts.reduce((sum,part)=> sum + part.exercises,0)
    return ( 
    <strong>total of {calculTotal} exercises </strong>
    ) }

export default Total