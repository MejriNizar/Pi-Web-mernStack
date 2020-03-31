import axios from 'axios'
import {setAlert} from './alert'


import {
    GET_PROFILE,PROFILE_ERROR, UPDATE_PROFILE,ACCOUNT_DELETE,CLEAR_PROFILE, GET_PROFILES,GET_REPOS
} from './types'

export const getCurrentProfile = () => async dispatch =>{
    try {
        const res = await axios.get('/api/profile/me');

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg:error.response.statusText, status:error.response.status}
        });
    }
}

//get all profiles 
export const getallprofiles = () => async dispatch =>{
  dispatch({type: CLEAR_PROFILE});
    try {
        const res = await axios.get('/api/profile');

        dispatch({
            type: GET_PROFILES,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg:error.response.statusText, status:error.response.status}
        });
    }
}
// get profile by id
export const getProfileById = userId => async dispatch =>{
      try {
          const res = await axios.get(`/api/profile/user/${userId}`);
  
          dispatch({
              type: GET_PROFILE,
              payload: res.data
          });
      } catch (error) {
          dispatch({
              type: PROFILE_ERROR,
              payload: {msg:error.response.statusText, status:error.response.status}
          });
      }
  }
// get githubrepos
export const getGitHubRepos = username => async dispatch =>{
    try {
        const res = await axios.get(`/api/profile/github/${username}`);

        dispatch({
            type: GET_REPOS,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg:error.response.statusText, status:error.response.status}
        });
    }
}

export const createprofile = (FormData,history,edit= false) => async dispatch => {
  try {
      const config = {
          headers:{
              'Content-Type': 'application/json'
          }
      }
      const res = await axios.post('/api/profile',FormData,config);
      dispatch({
        type: GET_PROFILE,
        payload: res.data
    });
    dispatch(setAlert(edit ? 'Profile Updated': 'Profile created', 'success'));
if(!edit) {
    history.push('/dashboard');
}
      
  } catch (error) {
    const errors = error.response.data.errors;
    if(errors) {
        errors.forEach(error => dispatch(setAlert(error.msg,'danger')));
    }
    dispatch({
        type: PROFILE_ERROR,
        payload: {msg:error.response.statusText, status: error.response.status }
    });
  }


}

export const addExperience = (formData, history)=>async dispatch => {
    try {
        const config = {
            headers:{
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.post('/api/profile/experience',formData,config);
        dispatch({
          type: UPDATE_PROFILE,
          payload: res.data
      });
      dispatch(setAlert('expeience added', 'success'));

      history.push('/dashboard');
 
        
    } catch (error) {
      const errors = error.response.data.errors;
      if(errors) {
          errors.forEach(error => dispatch(setAlert(error.msg,'danger')));
      }
      dispatch({
          type: PROFILE_ERROR,
          payload: {msg:error.response.statusText, status: error.response.status }
      });
    }
  
} ;

export const addeducation = (formData, history)=>async dispatch => {
    try {
        const config = {
            headers:{
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.post('/api/profile/education',formData,config);
        dispatch({
          type: UPDATE_PROFILE,
          payload: res.data
      });
      dispatch(setAlert('education added', 'success'));

      history.push('/dashboard');
 
        
    } catch (error) {
      const errors = error.response.data.errors;
      if(errors) {
          errors.forEach(error => dispatch(setAlert(error.msg,'danger')));
      }
      dispatch({
          type: PROFILE_ERROR,
          payload: {msg:error.response.statusText, status: error.response.status }
      });
    }
  
}  

// Delete Exp
export const deleteExp = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/experience/${id}`);
        console.log('expe delet');
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
        dispatch(setAlert('Expirience Deleted', 'success'));
    } catch (error) {

         dispatch({
          type: PROFILE_ERROR,
          payload: {msg:error.response.statusText, status: error.response.status }
      });
    }
}
// Delete Exp
export const deleteEdu = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/education/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
        dispatch(setAlert('Education Deleted', 'success'));
    } catch (error) {

         dispatch({
          type: PROFILE_ERROR,
          payload: {msg:error.response.statusText, status: error.response.status }
      });
    }
}

// Delete account
export const deleteAccount = () => async dispatch => {
    if(window.confirm('AreYou sure ? This can Not be Undone!')) {
        try {
             await axios.delete(`/api/profile`);
    
            dispatch({
                type: CLEAR_PROFILE
            });
            dispatch({
                type: ACCOUNT_DELETE
            });
            dispatch(setAlert('Account has been permenetly Deleted'));
        } catch (error) {
    
             dispatch({
              type: PROFILE_ERROR,
              payload: {msg:error.response.statusText, status: error.response.status }
          });
        }
    }
   
}
