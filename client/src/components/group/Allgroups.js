import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getactivatedgroup, sendRequest } from "../../actions/group";
import { withRouter } from "react-router-dom";
import Spinner from "../layout/spinner";
import GroupItem from "./GroupItem";

const Allgroup = ({ getactivatedgroup, groups: { groups, loading }, auth }) => {
  useEffect(() => {
    getactivatedgroup();
  }, [getactivatedgroup]);

  return loading || groups === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Groups</h1>
      <p className="lead">
        <i className="fab fa-connectdevelop"></i> Check groups list
      </p>
      <div className="profiles">
        {groups.length > 0 ? (
          groups.map((group) => <GroupItem key={group._id} group={group} />)
        ) : (
          <h4> No Groups found ..</h4>
        )}
      </div>
    </Fragment>
  );
};

Allgroup.propTypes = {
  getactivatedgroup: PropTypes.func.isRequired,
  sendRequest: PropTypes.func.isRequired,
  groups: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  groups: state.groups,
});
export default connect(mapStateToProps, { getactivatedgroup, sendRequest })(
  withRouter(Allgroup)
);
