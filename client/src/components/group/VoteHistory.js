import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getgroup, deletegroup } from "../../actions/group";

import GroupActions from "./GroupActions";
import VotingHistory from "./VotingHistory";

const VoteHistory = ({
  match,
  getgroup,

  group: { group, loading },
  
}) => {
  useEffect(() => {
    getgroup(match.params.id);
  }, [getgroup,match.params.id]);

  return (
    <Fragment>
      <GroupActions group={group} />
      <div className="profile-vote bg-white p-2">
        <h2 className="text-primary"> Voting History</h2>
        {group.Vote_Request.length > 0 ? (
          <Fragment>
            {group.Vote_Request.map((req) => (
              <div className="profile-vote bg-white p-2">
                <VotingHistory
                  key={req._id}
                  request={req}
                  groupId={group._id}
                  project={group.project.settings}
                />
              </div>
            ))}
          </Fragment>
        ) : (
          <h4> No Voting Request Found</h4>
        )}
      </div>
    </Fragment>
  );
};

VoteHistory.propTypes = {
  getgroup: PropTypes.func.isRequired,
 
  
};
const mapStateToProps = (state) => ({
  group: state.group,

});
export default connect(mapStateToProps, { getgroup })(VoteHistory);
