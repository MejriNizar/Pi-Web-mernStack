import React, {useEffect,  Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import { getgroup,deletegroup,getvoteprog } from '../../actions/group';
import Spinner from '../layout/spinner';
import GroupTop from './GroupTop';
import GroupRequest from './GroupRequest';
import GroupMember from './GroupMember';
import GroupAbout from './GroupAbout';
import { Link } from 'react-router-dom';
import VotingRequest from './VotingRequest';
import VoteRequest from './VoteRequest';



const VoteHistory = ({match,getgroup,auth,group: {group,loading},deletegroup}) => {
    useEffect(()=>{
        getgroup(match.params.id);
        
    }, [loading]);


return(
<div className="profile-vote bg-white p-2">
                  <h2 className="text-primary"> Voting Requests</h2>
           {group.Vote_Request.length > 0 ? (
               <Fragment>
                   {group.Vote_Request.map(req =>(
                    <VotingRequest key={req._id} request={req} groupId={group._id} project={group.project.settings}/>
                   ))}
               </Fragment>
           ) : (<h4> No Voting Request Found</h4>)}
       </div>

)

};

VoteHistory.propTypes = {
        getgroup: PropTypes.func.isRequired,
        deletegroup: PropTypes.func.isRequired,
        auth:PropTypes.object.isRequired,
       
    
        };
    const mapStateToProps = state => ({
        group: state.group,
        auth : state.auth,
    });
    export default connect(mapStateToProps,{getgroup,deletegroup})(VoteHistory);