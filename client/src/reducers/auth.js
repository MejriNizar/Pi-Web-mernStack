import {RGISTER_FAIL,USER_LOADED,AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, DISABELD_ACCOUNT, ENABELD_ACCOUNT, ACCOUNT_DELETE,GET_USERS,GET_STUDENTS,GET_STUDENT,CLEAR_USER} from '../actions/types';

const initialState= {
    users:[],
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    students:[],
    student:''
}

export default function(state = initialState, action) {
    
    const {type, payload} = action;
    switch(type) {
        case USER_LOADED:
            return{
                ...state,
                isAuthenticated:true,
                loading:false,
                user: payload
            };
        case GET_USERS:
            return{
                ...state,
                isAuthenticated:true,
                loading:false,
                users: payload
            };
        case GET_STUDENTS:
            return{
                ...state,
                loading:false,
                students: payload
            };
        case GET_STUDENT:
            return{
                ...state,
                loading:false,
                student: payload
            };
        
        case ENABELD_ACCOUNT:
        case LOGIN_SUCCESS:
            localStorage.setItem('token',payload.token);
            console.log(payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated:true,
                loading: false
            };
        case CLEAR_USER:
        return{
            ...state,
            user: null,
            users:[],
            loading:false
        };
        case RGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
        case DISABELD_ACCOUNT:
        case ACCOUNT_DELETE:
            localStorage.removeItem('token');
            return{
                    ...state,
                    token: null,
                    isAuthenticated:false,
                    loading: false
                };
        default:
            return state;

    }

}