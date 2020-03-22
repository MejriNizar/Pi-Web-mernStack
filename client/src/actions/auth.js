import axios from 'axios';
import {RGISTER_SUCCESS, RGISTER_FAIL,LOGOUT, USER_LOADED, AUTH_ERROR,LOGIN_FAIL,LOGIN_SUCCESS, ENABELD_ACCOUNT, DISABELD_ACCOUNT, CLEAR_PROFILE,GET_USERS} from './types';

import {setAlert} from './alert';
import setAuthToken from '../utils/setAuthToken';

// load user

export const loadUser = () => async dispatch => {
    if(localStorage.token) {
        setAuthToken(localStorage.token);
    }
    try {
        const res = await axios.get('/api/auth');
        dispatch({
            type:USER_LOADED,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        })
        
    }
}

export const loadUsers = () => async dispatch => {
    try {
        const res = await axios.get('/api/users/all');
        dispatch({
            type:GET_USERS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        })
        
    }
}
// REGISTER
export const register = ({name, email, password}) => async dispatch => {
    const config =  {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({name, email, password});
    try {
        const res = await axios.post('/api/users', body, config);

        dispatch({
            type: RGISTER_SUCCESS,
            payload: res.data
        });
        dispatch(loadUser());

    } catch (error) {

        const errors = error.response.data.errors;
        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg,'danger')));
        }
        dispatch({
            type: RGISTER_FAIL
        })
    } 
}
//login user
export const login = ( email, password) => async dispatch => {
    const config =  {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ email, password});
    try {
        const res = await axios.post('/api/auth', body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
        dispatch(loadUser());
    } catch (error) {

        const errors = error.response.data.errors;
        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg,'danger')));
        }
        dispatch({
            type: LOGIN_FAIL
        })
    } 
}

export const verifyUser = ({ secretToken} ) => async dispatch => {
    const config =  {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ secretToken });
    try {
        const res = await axios.post('/api/auth/act', body, config);

        dispatch({
            type: ENABELD_ACCOUNT,
            payload: res.data
        });
        dispatch(loadUser());
    } catch (error) {

        const errors = error.response.data.errors;
        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg,'danger')));
        }
        dispatch({
            type: DISABELD_ACCOUNT
        })
    } 
};


//logout
export const logoutu = () => dispatch => {
    dispatch({type: LOGOUT});
    dispatch({type: CLEAR_PROFILE});

}