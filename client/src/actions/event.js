import axios from 'axios'
import {setAlert} from './alert'


import {
    GET_EVENT, GET_EVENT_DETAILS,DELETE_EVENT, EVENT_ERROR
} from './types'

export const getallevents = () => async dispatch =>{
    try {
        const res = await axios.get('/api/event/all');
        console.log("response object",res)
        console.log("response data",res.data)
        dispatch({
            type: GET_EVENT,
            payload: res.data
        });
        
    } catch (error) {
        console.log("err response",error)
        dispatch({
            type: EVENT_ERROR,
            payload: {msg:error.response.statusText, status: error.response.status }
        });
    }
}


export const getevent = id => async dispatch =>{
    try {
        console.log(id)
        const res = await axios.get(`/api/event/details/${id}`);
        console.log(id)
        console.log("response object",res)
        console.log("response data",res.data)
        dispatch({
            type: GET_EVENT_DETAILS,
            payload: res.data
        });
        
    } catch (error) {
        console.log("err response",error)
        dispatch({
            type: EVENT_ERROR,
            payload: {msg:error.response.statusText, status: error.response.status }
        });
    }
}




export const addevent = (FormData,history,edit= false) => async dispatch => {
    try {
        const config = {
            headers:{
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.post('/api/event',FormData,config);
        dispatch({
          type: GET_EVENT,
          payload: res.data
      });
      dispatch(setAlert(edit ? 'event Updated': 'event added', 'success'));
  if(!edit) {
      history.push('/dashboard');
  }
        
    } catch (error) {
      const errors = error.response.data.errors;
      if(errors) {
          errors.forEach(error => dispatch(setAlert(error.msg,'danger')));
      }
      dispatch({
          type: EVENT_ERROR,
          payload: {msg:error.response.statusText, status: error.response.status }
      });
    }
  
  
  }



  export const editEvent = (FormData,history,edit= false,id) => async dispatch => {
    try {
        const config = {
            headers:{
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.put(`/api/event/${id}`,FormData,config);
        dispatch({
          type: GET_EVENT,
          payload: res.data
      });
      dispatch(setAlert(edit ? 'Event Updated': 'Event created', 'success'));
  if(!edit) {
      history.push('/dashboard');
  }
        
    } catch (error) {
      const errors = error.response.data.errors;
      if(errors) {
          errors.forEach(error => dispatch(setAlert(error.msg,'danger')));
      }
      dispatch({
          type: EVENT_ERROR,
          payload: {msg:error.response.statusText, status: error.response.status }
      });
    }
  
  
  }

  export const deleteevent = id => async dispatch =>{
    try {
        console.log(id)
        const res = await axios.delete(`/api/event/${id}`);
        console.log(id)
        console.log("response object",res)
        console.log("response data",res.data)
        dispatch({
            type: DELETE_EVENT,
            payload: id
        });
        dispatch(setAlert('Event Removed', 'success'));
        
    } catch (error) {
        console.log("err response",error)
        dispatch({
            type: EVENT_ERROR,
            payload: {msg:error.response.statusText, status: error.response.status }
        });
    }
}
