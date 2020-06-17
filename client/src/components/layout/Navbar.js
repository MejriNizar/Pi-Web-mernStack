import React, { Fragment } from 'react';
import {Link} from  'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logoutu} from '../../actions/auth';
import Sidebar from './Sidebar';
export const Navbar = ({logoutu,auth:{user,isAuthenticated, loading}}) => {
  
  const authLinks = (
    <Fragment>
    <Sidebar/>
    <nav className="navbar bg-nav">
    
     <h2>
        <Link to="/"></Link>
      </h2>
<ul>
<li><Link to="/profiles">
  Profiles 
  </Link></li>
<li><Link to="/dashboard">
  <i className='fas fa-user'/>{' '}
  <span className='hide-sm'> dashboard </span> 
  </Link></li>

  <li>
    <a onClick={logoutu} href='#!'>
      <i className="fas fa-sign-out-alt"></i>{' '}
     <span className="hide-sm"> LOGOUT </span> </a>
  </li>
</ul>
</nav>
</Fragment>
  );
  const guestsLinks = (
    <nav className="navbar bg-nav">
    <h2>
    <Link to="/"><i className="fas fa-code"></i>EDUPS</Link>
  </h2>
    <ul>
      <li><Link to="/profiles">
  Profiles 
  </Link></li>
      <li><Link to="/register">Register</Link></li>
      <li><Link to="/login">Login</Link></li>
    </ul>
    </nav>

  );
    return (
     
    !loading && (<Fragment>{isAuthenticated ? authLinks : guestsLinks}</Fragment>)
    
    )
};
Navbar.propTypes = {
  logoutu: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};  
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps,{logoutu}) (Navbar);
