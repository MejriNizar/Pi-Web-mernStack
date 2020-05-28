import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";
import Spinner from "../layout/spinner";
import { Link, Redirect } from "react-router-dom";
import DashboardActions from "./DashboardAction";
import Experience from "./Experience";
import Education from "./Education";
import Projects from "./Projects";
import Groups from "./Groups";

const Dashboard = ({
  getCurrentProfile,
  auth: { user:{role,name} },
  deleteAccount,
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  if (role === "admin") {
    return <Redirect to="/admin" />;
  }

  return (
    <Fragment>
      {loading && profile === null && name === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Dashboard</h1>
          <p className="lead">
            <i className="fas fa-user"></i> welcome {name && name}{" "}
            {role && role}
          </p>
          {profile !== null ? (
            <Fragment>
              <DashboardActions></DashboardActions>
              <Experience experience={profile.experience} />
              <Education education={profile.education} />
              {/* {user.invitation !== null ? (<Invitations invitation={user.invitation} /> ):(<h4>No Invitation found</h4>)} */}
              {/* {user.group.request !== null ? (<Request group={user.group} request={user.group.request} />  ):(<h4>No Request found</h4>)} */}

              {/* <Invitations invitation={user.invitation} />  */}
              {/* <Request group={user.group} request={user.group.request} />  */}
              {/* <Invitations invitation={user.invitation} />  */}

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
              {role && role === "Student" ? (
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
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});
export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
