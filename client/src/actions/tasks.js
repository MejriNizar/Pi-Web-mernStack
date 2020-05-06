import { GET_TASKS, TASK_ERROR } from "./types";
import { setAlert } from "./alert";
import axios from 'axios';

export const addTask = (idg,idp,formdata) => async dispatch=>{
    const  config={
        headers:{
            'Content-Type': 'application/json'
        }
    }
      try {
  
         const res=  await axios.post(`/api/task/${idg}/${idp}`,formdata,config);
          dispatch({
              type:GET_TASKS,
              payload: res.data
          });
          dispatch(setAlert('task Added','success'))
      } catch (error) {
          dispatch({
              type: TASK_ERROR,
              payload: {msg:error.response.statusText, status: error.response.status }
          });
      }
      
  }
  export const GetTasks = (idg) => async dispatch=>{
    
      try {
  
         const res=  await axios.get(`/api/task/${idg}`);
          dispatch({
              type:GET_TASKS,
              payload: res.data
          });
      } catch (error) {
          dispatch({
              type: TASK_ERROR,
              payload: {msg:error.response.statusText, status: error.response.status }
          });
      }
      
  }