import { createContext, useContext, useReducer, useEffect } from "react";
const SEC_PER_QES = 30;
const initialState = {
  questions:[],
  // 'loading', 'error', 'ready', 'active', 'finished'
  status:"loading",
  index:0,
  answer:null,
  points:0,
  heighscore:0,
  secondsRemaining: null,
}

function reducer(state,{type,payload}){
  switch(type){

      case 'dataRecieved':
        return {...state,questions:payload,status:"ready"};

      case 'dataFailed':
        return {...state,status:'error'}
      
      case 'start':
      return {...state,status:'active',
    secondsRemaining:state.questions.length * SEC_PER_QES
        };
    
      case 'newAnswer':
        const question = state.questions.at(state.index);
      return {
        ...state,
        answer:payload,
        points: payload === question.correctOption ?
         state.points + question.points : state.points
      };

      case 'nextQuestion':
        return {...state,index:state.index + 1, answer:null};
      
        case 'finished':
        return {...state,status:"finished",heighscore:
      state.points > state.heighscore ? state.points : state.heighscore};
      
      case 'restart':
        return {...initialState,questions:state.questions,
        status:'ready'};
      
      case 'tick':
        return {...state,
          secondsRemaining:state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? 'finished' : state.status};
        
        default:
      throw new Error("Action unknown");
    
  }
}

const QuizContext = createContext();

function QuizProvider({children}){
    const [{questions,status,index,answer,points,heighscore,secondsRemaining},dispatch] = useReducer(reducer,initialState);
    const numQuestion = questions.length;
    const maxPossiblePoints = questions.reduce((prev,cur)=> prev + cur.points,0);

  useEffect(()=>{
    fetch(`http://localhost:8000/questions`)
    .then(res=>res.json())
    .then(data=> dispatch({type:'dataRecieved',payload:data}))
    .catch(err=>dispatch({type:'dataFailed'}));
  },[])

    return (
      <QuizContext.Provider value={{
        status,
        questions,
        index,
        answer,
        points,
        heighscore,
        secondsRemaining,
        numQuestion,
        maxPossiblePoints,
        dispatch


      }}>
      {children}
      </QuizContext.Provider>  
    )
}


function useQuiz(){
   const context = useContext(QuizContext);
   if(context === undefined) throw new Error("You used QuizContext outside of QuizProvider");
   return context;
}

export {QuizProvider,useQuiz};