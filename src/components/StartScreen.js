import React from 'react'
import { useQuiz } from '../context/QuizContext'

function StartScreen() {
const {dispatch,numQuestion} = useQuiz();
  return (
    <div className='start'>
    <h2>Welcome to The React Quiz!</h2>
    <h3>{numQuestion} questions to test your mastery</h3>
    <button className='btn btn-ui'
    onClick={()=>dispatch({type:'start'})}
    >Let's Start</button>
    </div>
  )
}

export default StartScreen