import {combineReducers} from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import projects from './project';
import docs from './documentation';
import project from './project';
import groups from './group';
import group from './group';
import event from './event';
import events from './event';
import users from './auth'
import students from './auth'
export default combineReducers({
    alert,auth,profile,projects,docs,project,groups,group,event,events,users,students



});