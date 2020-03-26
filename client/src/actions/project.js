import axios from 'axios'
import {setAlert} from './alert'


import {
    GET_PROJECT,PROJECT_ERROR,GET_PROJECT_DETAILS, DELETE_PROJECT
} from './types'

export const getallprojects = () => async dispatch =>{
    try {
        const res = await axios.get('/api/project/all');
        console.log("response object",res)
        console.log("response data",res.data)
        dispatch({
            type: GET_PROJECT,
            payload: res.data
        });
        
    } catch (error) {
        console.log("err response",error)
        dispatch({
            type: PROJECT_ERROR,
            payload: {msg:error.response.statusText, status: error.response.status }
        });
    }
}
export const getallprojectslimit = () => async dispatch =>{
    try {
        const res = await axios.get('/api/project/alllimit');
        console.log("response object",res)
        console.log("response data",res.data)
        dispatch({
            type: GET_PROJECT,
            payload: res.data
        });
        
    } catch (error) {
        console.log("err response",error)
        dispatch({
            type: PROJECT_ERROR,
            payload: {msg:error.response.statusText, status: error.response.status }
        });
    }
}
export const getproject = id => async dispatch =>{
    try {
        console.log(id)
        const res = await axios.get(`/api/project/details/${id}`);
        console.log(id)
        console.log("response object",res)
        console.log("response data",res.data)
        dispatch({
            type: GET_PROJECT_DETAILS,
            payload: res.data
        });
        
    } catch (error) {
        console.log("err response",error)
        dispatch({
            type: PROJECT_ERROR,
            payload: {msg:error.response.statusText, status: error.response.status }
        });
    }
}

export const addProject = (FormData,history,edit= false) => async dispatch => {
    try {
        const config = {
            headers:{
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.post('/api/project/',FormData,config);
        dispatch({
          type: GET_PROJECT,
          payload: res.data
      });
      dispatch(setAlert(edit ? 'Project Updated': 'Project created', 'success'));
  if(!edit) {
      history.push('/dashboard');
  }
        
    } catch (error) {
      const errors = error.response.data.errors;
      if(errors) {
          errors.forEach(error => dispatch(setAlert(error.msg,'danger')));
      }
      dispatch({
          type: PROJECT_ERROR,
          payload: {msg:error.response.statusText, status: error.response.status }
      });
    }
  
  
  }

  export const editProject = (FormData,history,edit= false,id) => async dispatch => {
    try {
        const config = {
            headers:{
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.put(`/api/project/${id}`,FormData,config);
        dispatch({
          type: GET_PROJECT,
          payload: res.data
      });
      dispatch(setAlert(edit ? 'Project Updated': 'Project created', 'success'));
  if(!edit) {
      history.push('/dashboard');
  }
        
    } catch (error) {
      const errors = error.response.data.errors;
      if(errors) {
          errors.forEach(error => dispatch(setAlert(error.msg,'danger')));
      }
      dispatch({
          type: PROJECT_ERROR,
          payload: {msg:error.response.statusText, status: error.response.status }
      });
    }
  
  
  }

  export const deleteproject = id => async dispatch =>{
    try {
        console.log(id)
        const res = await axios.delete(`/api/project/${id}`);
        console.log(id)
        console.log("response object",res)
        console.log("response data",res.data)
        dispatch({
            type: DELETE_PROJECT,
            payload: res.data
        });
        dispatch(setAlert('Project Removed', 'success'));
        
    } catch (error) {
        console.log("err response",error)
        dispatch({
            type: PROJECT_ERROR,
            payload: {msg:error.response.statusText, status: error.response.status }
        });
    }
}



export const affectproject = (idg,idp) => async dispatch => {
    try {
        const config = {
            headers:{
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.post(`/api/group/assign/${idg}/${idp}/`,config);
        dispatch({
          type: GET_PROJECT,
          payload: res.data
      });
      dispatch(setAlert( 'Project affected', 'success'));
        
    } catch (error) {
      const errors = error.response.data.errors;
      if(errors) {
          errors.forEach(error => dispatch(setAlert(error.msg,'danger')));
      }
      dispatch({
          type: PROJECT_ERROR,
          payload: {msg:error.response.statusText, status: error.response.status }
      });
    }
  
  
  }





