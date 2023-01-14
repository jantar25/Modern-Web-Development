import React from 'react'
import { courseProps } from '../types'

const Content = ({courseParts}:courseProps) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  return (
    <div>
      { courseParts.map((part,index) => {
              switch (part.type) {
                case "normal":
                  return (<div key={index}>
                          <h3>{part.name} {part.exerciseCount}</h3>
                          <p>{part.description}</p>
                        </div>)
                case "submission":
                  return (<div key={index}>
                            <h3>{part.name} {part.exerciseCount}</h3>
                            <p>{part.description}</p>
                            <p>Submit to {part.exerciseSubmissionLink}</p>
                        </div>)
                case "groupProject":
                  return (<div key={index}>
                          <h3>{part.name} {part.exerciseCount}</h3>
                          <p>project exercises {part.groupProjectCount}</p>
                        </div>)
                case "special":
                  return (<div key={index}>
                          <h3>{part.name} {part.exerciseCount}</h3>
                          <p>{part.description}</p>
                          <p>required skills: {`${part.requirements[0]},${part.requirements[1]}`}</p>
                        </div>)
                default:
                return assertNever(part);
              }
            })
          }
  </div>
)
}

export default Content