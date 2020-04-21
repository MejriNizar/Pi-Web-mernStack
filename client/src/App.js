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
import User from './user'
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

 <Route exact path="/" component={User}/>
 <section className="container">
     <Alert />
<Switch>

  <PrivateRoute exact path="/admin" component={AdminDashb} />
  <PrivateRoute exact path="/admin/user-page" component={UserPage} />
  <PrivateRoute exact path="/admin/userList" component={Userslist} />   
  <PrivateRoute exact path="/admin/projects" component={Projects} />
  <PrivateRoute exact path="/admin/groups" component={Groups} />   
   





</Switch>
 </section>
</Fragment>
</Router>
</Provider>
)}
   ;

export default App;
