import React, { Fragment, useEffect } from 'react';
import {connect} from 'react-redux'
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import NavbarComp from './components/layout/Navbar';
import LandingPageHeader from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/Routing/privateRoute';
import Alert from './components/layout/Alert';
import PropTypes from 'prop-types'

// redux
import {Provider} from 'react-redux';
import store from './store';
//auth
import {loadUser} from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import './App.css';
import '../src/assets/css/paper-dashboard.css'
import '../src/assets/css/paper-dashboard.css.map'
import '../src/assets/css/paper-dashboard.min.css'

import DashboardAD from './AdminDashBoard/views/Dashboard';
import { VerifyAccount } from './components/auth/verifyAccount';
import createProfile from './components/profile-form/createProfile';
import EditProfile from './components/profile-form/EditProfile';
import AddExpe from './components/profile-form/AddExpe';
import AddEdu from './components/profile-form/AddEdu';
import Allproject from './components/project/Allproject';
import Allevents from './components/event/Allevents';
import Addevent from './components/event/Addevent';

import Profiles from './components/Profiles/Profiles'
import Profile from './components/Profiles/profiles/Profile'

import AdminDashb from './AdminDashBoard/layouts/Admin'
import Addproject from './components/project/Addproject';
import ProjectDetails from './components/project/ProjectDetails';
import EventDetails from './components/event/EventDetails';
import EditProject from './components/project/EditProject';
import Detailsgroup from './components/group/Detailsgroup';
import Editgroup from './components/group/Editgroup';
import Allgroups from './components/group/Allgroups';
import Addgroup from './components/group/Addgroup';
import AffectProject from './components/group/AffectProject';
import Addmembers from './components/group/Addmembers';
import FileUpload from './components/dashboard/FileUpload';
import UserPage from './AdminDashBoard/views/User'
import Userslist from './AdminDashBoard/components/Users/Userslist'
import Projects from './AdminDashBoard/components/Projects/Projects';
import Groups from './AdminDashBoard/components/Group/Groups';
if(localStorage.token) {
    setAuthToken(localStorage.token);
}
const App=()=> {
    useEffect(()=> {
       store.dispatch(loadUser());
    },[]);

 return (
      
    <Provider store={store}>
    <Router>
<Fragment>
<NavbarComp />

<Route exact path="/" component={LandingPageHeader}/>
 
     <Alert />
<Switch>

      <PrivateRoute exact path="/admin" component={AdminDashb} />
      <PrivateRoute exact path="/admin/user-page" component={UserPage} />
      <PrivateRoute exact path="/admin/userList" component={Userslist} />   
      <PrivateRoute exact path="/admin/projects" component={Projects} />
      <PrivateRoute exact path="/admin/groups" component={Groups} />  
      <section className="container">
      <Route exact path="/register" component={Register}/>
    <Route exact path="/login" component={Login}/>
    <Route exact path="/verify" component={VerifyAccount}/>
    <Route exact path="/profiles" component={Profiles}/>
    <Route exact path="/profile/:id" component={Profile}/>
    <Route exact path="/create-profile" component={createProfile}/>
    <PrivateRoute exact path="/edit-profile" component={EditProfile}/>
    <PrivateRoute exact path="/add-experience" component={AddExpe}/>
    <PrivateRoute exact path="/add-education" component={AddEdu}/>
    <PrivateRoute exact path="/dashboard" component={Dashboard}/>
    <PrivateRoute exact path="/all-project" component={Allproject}/>
    <PrivateRoute exact path="/all-events" component={Allevents}/>
    <PrivateRoute exact path="/add-event" component={Addevent}/>
    <PrivateRoute exact path="/event-details/:id" component={EventDetails}/>
    <PrivateRoute exact path="/add-project" component={Addproject}/>
    <PrivateRoute exact path="/project-details/:id" component={ProjectDetails}/>
    <PrivateRoute exact path="/project-edit/:id" component={EditProject}/>
    <PrivateRoute exact path="/all-group" component={Allgroups}/>
    <PrivateRoute exact path="/add-group/:id" component={Addgroup}/>
    <PrivateRoute exact path="/group-details/:id" component={Detailsgroup}/>
    <PrivateRoute exact path="/group-edit/:id" component={Editgroup}/>
    <PrivateRoute exact path="/affect-project/:id" component={AffectProject}/>
    <PrivateRoute exact path="/add-members/:id/:nbS/:Skills" component={Addmembers}/>
    <PrivateRoute exact path="/add-members/:id/:nbS" component={Addmembers}/>
    <PrivateRoute exact path="/upload" component={FileUpload}/> 
    </section>





</Switch>
 
</Fragment>
</Router>
</Provider>
)}
   ;

export default App;
