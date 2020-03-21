import { GET_GROUP,GROUP_ERROR,DELETE_GROUP,GET_GROUP_DETAILS } from "../actions/types";

const initialState = {
    group: null,
    groups:[],
    repos:[],
    loading:true,
    error:{}
}

export default function(state=initialState,action){
    const  {type, payload} = action;
    switch(type) {
      case  GET_GROUP:
          return{
              ...state,
              groups:payload,
              loading:false
          }
      case  GET_GROUP_DETAILS:
          return{
              ...state,
              group:payload,
              loading:false
          }
      case  DELETE_GROUP:
           return{
              ...state,
              groups:payload,
              loading:false
          }
      case GROUP_ERROR:
          return {
              ...state,
              error:payload,
              loading:false
          }
    
        default:
            return state;
    }
}