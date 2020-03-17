import {combineReducers} from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import project from './project';



export default combineReducers({
    alert,auth,profile,project
});