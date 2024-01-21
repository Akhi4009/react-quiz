import React from 'react'

function NextButton({dispatch,answer,index}) {
    if(answer === null) return null;
  return (
    <button 
    className='btn btn-ui'
    onClick={()=>dispatch({type:"nextQuestion"})}
    >
    Next
    </button>
  )
}

export default NextButton