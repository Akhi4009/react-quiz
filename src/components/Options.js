import React from 'react'
import { useQuiz } from '../context/QuizContext'

function Options({question}) {
const {answer,dispatch} = useQuiz();
  const hasAnswered = answer !== null

  return (
    <ul className='options'>
    {question.options.map((option,index)=>
      <button key={option}
       className={`btn btn-option ${index === answer ?
      "answer" : "" } ${ hasAnswered && index === question.correctOption ?
      "correct" : "wrong" }`}
      disabled={hasAnswered}
       onClick={()=>dispatch({type:'newAnswer',
       payload:index})}
       >{option}</button>
      )}
    </ul>
  
  )
}

export default Options