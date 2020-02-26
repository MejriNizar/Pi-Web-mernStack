import axios from 'axios';
import {RGISTER_SUCCESS, RGISTER_FAIL} from './types';

import {setAlert} from './alert';

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