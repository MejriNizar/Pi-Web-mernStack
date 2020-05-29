import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";
import {loadUser} from "../../actions/auth";
import Spinner from "../layout/spinner";
import { Link, Redirect } from "react-router-dom";
import DashboardActions from "./DashboardAction";
import Experience from "./Experience";
import Education from "./Education";
import Projects from "./Projects";
import Groups from "./Groups";
import Invitations from "./Invitations";
const Dashboard = ({
  getCurrentProfile,
  loadUser,
  auth: {user},
  deleteAccount,
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
    loadUser();
  }, [getCurrentProfile,loadUser]);
  if(user.role === "admin")
  {
    return <Redirect to="/admin" />
  }

  return (
    <Fragment>
      {loading && profile === null && user === null ? (
        <Spinner />
      ) : (
        
        <Fragment>
          <h1 className="large text-primary">Dashboard</h1>
          <p className="lead">
            <i className="fas fa-user"></i> welcome {user && user.name}{" "}
            {user && user.role}
          </p>
          {profile !== null ? (
            <Fragment>
            <DashboardActions></DashboardActions>
              <Experience experience={profile.experience} />
              <Education education={profile.education} />
              <h2 className="my-2">Invitations Recieved</h2>

               {profile.user.invitation.length >0 ? (<Invitations invitation={profile.user.invitation} /> ):(<h4>No Invitation found</h4>)} 
              

              <div className="my-2">
                <button
                  onClick={() => deleteAccount()}
                  className="btn btn-danger"
                >
                  {" "}
                  <i className="fas fa-user-minus"></i> Delete my account
                </button>
              </div>
            </Fragment>
          ) : (
            <Fragment>
              {" "}
              {user && user.role === "Student" ? (
                <Fragment>
                  <p>You have not yet setup a profile , please add some info</p>
                  <Link to="/create-profile" className="btn btn-primary my-1">
                    Create Profile
                  </Link>
                </Fragment>
              ) : (
                <Fragment>
                  <DashboardActions></DashboardActions>
                  <Projects />
                  <Groups />
                </Fragment>
              )}
            </Fragment>
          )}
        </Fragment>
        
      )}
    </Fragment>
  );
              
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});
export default connect(mapStateToProps, { getCurrentProfile, deleteAccount,loadUser })(
  Dashboard
);
