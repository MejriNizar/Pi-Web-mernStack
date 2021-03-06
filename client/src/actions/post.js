import axios from 'axios'
import {setAlert} from './alert'
import {GET_POSTS,POST_ERROR, DELETE_POST, ADD_POST, GET_POST} from './types'

export const getPosts = id => async dispatch=>{
    try {
        const res = await axios.get(`/api/posts/${id}`);
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
export const removeLike = postid => async dispatch=>{
    try {
        const res = await axios.put(`/api/posts/unlike/${postid}`);
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

export const addPost = (formdata,id) => async dispatch=>{
  const  config={
      headers:{
          'Content-Type': 'application/json'
      }
  }
    try {

       const res=  await axios.post(`/api/posts/${id}`,formdata,config);
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


export const addComment = (postid,groupid,formdata) => async dispatch=>{
    const  config={
        headers:{
            'Content-Type': 'application/json'
        }
    }
      try {
  
         const res=  await axios.post(`/api/posts/comment/${postid}/${groupid}`,formdata,config);
          dispatch({
              type:GET_POSTS,
              payload: res.data
          });
          dispatch(setAlert('comment Added','success'))
      } catch (error) {
          dispatch({
              type: POST_ERROR,
              payload: {msg:error.response.statusText, status: error.response.status }
          });
      }
      
  }
  export const deleteComment = (postid,commentId) => async dispatch=>{
    try {
        const res=await axios.delete(`/api/posts/comment/${postid}/${commentId}`);
        dispatch({
            type:GET_POSTS,
            payload: res.data
        });
        dispatch(setAlert('comment Removed','success'))
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: {msg:error.response.statusText, status: error.response.status }
        });
    }
    
}
