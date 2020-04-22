import axios from 'axios'
import {setAlert} from './alert'
import {GET_POSTS,POST_ERROR, UPDATE_LIKES, DELETE_POST, ADD_POST, GET_POST} from './types'

export const getPosts = ()=> async dispatch=>{
    try {
        const res = await axios.get('/api/posts');
        dispatch({
            type:GET_POSTS,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: {msg:error.response.statusText, status: error.response.status }
        });
    }
}

export const getPost = id => async dispatch=>{
    try {
        const res = await axios.get(`/api/posts/${id}`);
        dispatch({
            type:GET_POST,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: {msg:error.response.statusText, status: error.response.status }
        });
    }
}
export const addLike = postid => async dispatch=>{
    try {
        const res = await axios.put(`/api/posts/like/${postid}`);
        dispatch({
            type:UPDATE_LIKES,
            payload: {postid, likes:res.data}
        });
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: {msg:error.response.statusText, status: error.response.status }
        });
    }

}
export const removeLike = postid => async dispatch=>{
    try {
        const res = await axios.put(`/api/posts/unlike/${postid}`);
        dispatch({
            type:UPDATE_LIKES,
            payload: {postid, likes:res.data}
        });
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: {msg:error.response.statusText, status: error.response.status }
        });
    }
    
}
export const deletePost = postid => async dispatch=>{
    try {
       await axios.delete(`/api/posts/${postid}`);
        dispatch({
            type:DELETE_POST,
            payload: postid
        });
        dispatch(setAlert('Post Removed','success'))
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: {msg:error.response.statusText, status: error.response.status }
        });
    }
    
}

export const addPost = formdata => async dispatch=>{
  const  config={
      headers:{
          'Content-Type': 'application/json'
      }
  }
    try {

       const res=  await axios.post('/api/posts',formdata,config);
        dispatch({
            type:ADD_POST,
            payload: res.data
        });
        dispatch(setAlert('Post Added','success'))
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: {msg:error.response.statusText, status: error.response.status }
        });
    }
    
}