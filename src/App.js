import { useEffect, useReducer } from "react";
import Header from "./components/Header"
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen"
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
const initialState = {
  questions:[],
  // 'loading', 'error', 'ready', 'active', 'finished'
  status:"loading",
  index:0,
  answer:null,
  points:0,
  heighscore:0,
}

function reducer(state,{type,payload}){
  switch(type){

      case 'dataRecieved':
        return {...state,questions:payload,status:"ready"};

      case 'dataFailed':
        return {...state,status:'error'}
      
      case 'start':
      return {...state,status:'active'};
    
      case 'newAnswer':
        const question = state.questions.at(state.index);
      return {
        ...state,
        answer:payload,
        points: payload === question.correctOption ?
         state.points + 10 : state.points
      };

      case 'nextQuestion':
        return {...state,index:state.index + 1, answer:null};
      
        case 'finished':
        return {...state,status:"finished",heighscore:
      state.points > state.heighscore ? state.points : state.heighscore};
      
      case 'restart':
        return {...initialState,questions:state.questions,
        status:'ready'};
      
        default:
      throw new Error("Action unknown");
    
  }
}
function App() {
 const [{questions,status,index,answer,points,heighscore},dispatch] = useReducer(reducer,initialState);

 const numQuestion = questions.length;
 

 const maxPossiblePoints = questions.reduce((prev,cur)=> prev + cur.points,0);

  useEffect(()=>{
    fetch(`http://localhost:8000/questions`)
    .then(res=>res.json())
    .then(data=> dispatch({type:'dataRecieved',payload:data}))
    .catch(err=>dispatch({type:'dataFailed'}));
  },[])
  
  return (
    <div className="app">
   <Header/>
   <Main>
   {status === 'loading' && <Loader/>}
   {status === 'error' && <Error/>}
   {status === 'ready' && <StartScreen
    numQuestion={numQuestion} 
    dispatch={dispatch}
    />}
   {status === 'active' &&
   <>
   <Progress index={index} 
   numQuestion={numQuestion}
   points={points}
   maxPossiblePoints={maxPossiblePoints}
   answer={answer}
   />
    <Question
   question={questions[index]} 
   dispatch={dispatch}
   answer={answer}
   points={points}
   />
  
   <NextButton 
   dispatch={dispatch}
   answer={answer}
   index={index}
   numQuestion={numQuestion}
   />
   
   </>
  }
  {status === 'finished' && (
    <FinishScreen points={points}
     maxPossiblePoints={maxPossiblePoints}
     heighscore={heighscore}
     dispatch={dispatch}
     />
  )}
   
   </Main>
    </div>
  );
}

export default App;
