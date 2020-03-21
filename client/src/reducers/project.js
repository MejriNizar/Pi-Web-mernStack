import { GET_PROJECT, PROJECT_ERROR, GET_PROJECT_DETAILS, DELETE_PROJECT } from "../actions/types";

const initialState = {
    project: null,
    projects:[],
    repos:[],
    loading:true,
    error:{}
}

export default function(state=initialState,action){
    const  {type, payload} = action;
    switch(type) {
      case  GET_PROJECT:
          return{
              ...state,
              projects:payload,
              loading:false
          }
      case  GET_PROJECT_DETAILS:
          return{
              ...state,
              project:payload,
              loading:false
          }
      case  DELETE_PROJECT:
           return{
              ...state,
              projects:payload,
              loading:false
          }
      case PROJECT_ERROR:
          return {
              ...state,
              error:payload,
              loading:false
          }
    
        default:
            return state;
    }
}