import {combineReducers} from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import projects from './project';
import docs from './documentation';



export default combineReducers({
    alert,auth,profile,projects,docs
});