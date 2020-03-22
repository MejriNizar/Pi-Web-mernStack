import { GET_EVENT,GET_EVENT_DETAILS, DELETE_EVENT, EVENT_ERROR } from "../actions/types";


const initialState = {
    event: null,
    events:[],
    repos:[],
    loading:true,
    error:{}
}

export default function(state=initialState,action){
    const  {type, payload} = action;
    switch(type) {
      case  GET_EVENT:
          return{
              ...state,
              events:payload,
              loading:false
          }
      case  GET_EVENT_DETAILS:
          return{
              ...state,
              event:payload,
              loading:false
          }
      case  DELETE_EVENT:
          return{
              ...state,
              events:state.events.filter(e => e._id !== payload),
              loading:false
          }
      case EVENT_ERROR:
          return {
              ...state,
              error:payload,
              loading:false
          }
    
        default:
            return state;
    }
}