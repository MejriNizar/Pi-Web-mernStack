import {combineReducers} from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import projects from './project';
import docs from './documentation';
import project from './project';
import event from './event';
import events from './event';




export default combineReducers({
    alert,auth,profile,projects,docs,project,event,events
});