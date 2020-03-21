import { GET_DOC, DOC_ERROR } from "../actions/types";

const initialState = {
    docs:[],
    doc: null,
    repos:[],
    loading:true,
    error:{}
}

export default function(state=initialState,action){
    const  {type, payload} = action;
    switch(type) {
      case  GET_DOC:
          return{
              ...state,
              docs:payload,
              loading:false
          }
      case DOC_ERROR:
          return {
              ...state,
              error:payload,
              loading:false
          }
    
        default:
            return state;
    }
}