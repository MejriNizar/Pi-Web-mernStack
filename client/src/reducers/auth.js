import {RGISTER_SUCCESS,RGISTER_FAIL,USER_LOADED,AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, DISABELD_ACCOUNT, ENABELD_ACCOUNT, ACCOUNT_DELETE} from '../actions/types';

const initialState= {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
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
        case RGISTER_SUCCESS:
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