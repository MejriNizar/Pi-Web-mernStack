import axios from 'axios'
import {setAlert} from './alert'


import {
    GET_PROJECT,PROJECT_ERROR
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





