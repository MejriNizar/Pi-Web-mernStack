import {

    GET_TASKS,
    ADD_TASK,
    TASK_ERROR
} from '../actions/types'
const initialState ={
    tasks:[],
    task:null,

    loading:true,
    error:{},
}
export default function(state = initialState,action){
    const {type,payload}= action;
    switch(type){
        case GET_TASKS:
            return {
                ...state,
                tasks:payload,
                loading:false
            };

        case ADD_TASK:
            return {
                ...state,
                tasks:[payload,...state.tasks  ],
                loading:false

            }
      
        case TASK_ERROR:
            return {
                ...state,
                error:payload,
                loading:false
            };
       
        default:{
            return state
        }
    }
}