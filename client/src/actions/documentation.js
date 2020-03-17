import axios from 'axios'
import {setAlert} from './alert'


import {
    GET_DOC,DOC_ERROR
} from './types'

export const getalldocs = () => async dispatch =>{
    try {
        const res = await axios.get('/api/documentation/all');
        console.log("response object",res)
        console.log("response data",res.data)
        dispatch({
            type: GET_DOC,
            payload: res.data
        });
        
    } catch (error) {
        console.log("err response",error)
        dispatch({
            type: DOC_ERROR,
            payload: {msg:error.response.statusText, status: error.response.status }
        });
    }
}