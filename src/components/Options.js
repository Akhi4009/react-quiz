import React from 'react'

function Options({question}) {
  return (

    <ul className='options'>
    {question.options.map(option=>
      <button key={option} className='btn btn-option'>{option}</button>
      )}
    </ul>
  
  )
}

export default Options