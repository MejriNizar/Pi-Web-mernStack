import React, { Fragment, useEffect } from 'react';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import NavbarComp from './components/layout/Navbar';
import LandingPageHeader from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/Routing/privateRoute';


import Alert from './components/layout/Alert';

// redux
import {Provider} from 'react-redux';
import store from './store';
//auth
import {loadUser} from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import './App.css';
import { VerifyAccount } from './components/auth/verifyAccount';
import createProfile from './components/profile-form/createProfile';
import EditProfile from './components/profile-form/EditProfile';
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
 <section className="container">
     <Alert />
<Switch>
    <Route exact path="/register" component={Register}/>
    <Route exact path="/login" component={Login}/>
    <Route exact path="/verify" component={VerifyAccount}/>
    <Route exact path="/create-profile" component={createProfile}/>
    <PrivateRoute exact path="/edit-profile" component={EditProfile}/>


    <PrivateRoute exact path="/dashboard" component={Dashboard}/>


</Switch>
 </section>
</Fragment>
</Router>
</Provider>
)};

export default App;
