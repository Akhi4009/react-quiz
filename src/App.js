import { useEffect, useReducer } from "react";
import Header from "./Header"
import Main from "./Main";

const initialState = {
  questions:[],
  // 'loading', 'error', 'ready', 'active', 'finished'
  status:"loading",
}

function reducer(state,{type,payload}){
  switch(type){
    case 'dataRecieved':
      return {...state,questions:payload,status:"ready"};
    case 'dataFailed':
      return {...state,status:'error'}
    default:
      throw new Error("Action unknown");
  }
}
function App() {
 const [state,dispatch] = useReducer(reducer,initialState);

  useEffect(()=>{
    fetch(`http://localhost:8000/questions`)
    .then(res=>res.json())
    .then(data=> dispatch({type:'dataRecieved',payload:data}))
    .catch(err=>dispatch({type:'dataFailed'}));
  },[])
  
  return (
    <div className="app">
   <Header/>
   <Main/>
    </div>
  );
}

export default App;
