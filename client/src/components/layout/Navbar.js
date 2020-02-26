import React, { Fragment } from 'react';
import {Link} from  'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../../actions/auth';
export const Navbar = ({logout,auth:{isAuthenticated, loading}}) => {
  const authLinks = (
<ul>
  <li>
    <a onClick={logout} href='#!'>
      <i className="fas fa-sign-out-alt"></i>{' '}
     <span className="hide-sm"> LOGOUT </span> </a>
  </li>
</ul>
  );
  const guestsLinks = (
      
    
    <ul>
      <li><Link to="/register">Register</Link></li>
      <li><Link to="/login">Login</Link></li>
    </ul>

  );
    return (
        <nav className="navbar bg-dark">
      <h1>
        <Link to="/"><i className="fas fa-code"></i>EDUPS</Link>
      </h1>
    {!loading && (<Fragment>{isAuthenticated ? authLinks : guestsLinks}</Fragment>)}
    </nav>
    )
};
Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.bool,
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps,{logout}) (Navbar);
