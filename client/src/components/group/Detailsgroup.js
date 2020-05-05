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
import Post from './Post/Post';


const Detailsgroup = ({match,getgroup,auth,group: {group,loading},deletegroup}) => {
    useEffect(()=>{
        getgroup(match.params.id);
        
    }, [loading]);
    return (<Fragment>
    {group === null || loading ? <Spinner></Spinner> : <Fragment>

<div className="profile-grid my-1">
       <GroupTop group={group} />
       <GroupAbout group={group} />
       <Post groupId={group._id}/>
       <div className="profile-exp bg-white p-2">
           <h2 className="text-primary"> Requests</h2>
           {group.request.length > 0 ? (
               <Fragment>
                   {group.request.map(req =>(
                       <GroupRequest key={req._id} request={req} groupId={group._id}/>
                   ))}
               </Fragment>
           ) : (<h4> No Request Found</h4>)}
       </div>
       <div className="profile-edu bg-white p-2">
           <h2 className="text-primary"> Members</h2>
           {group.members.length > 0 ? (
               <Fragment>
                   {group.members.map(mem =>(
                       <GroupMember key={mem._id} member={mem}/>
                   ))}
               </Fragment>
           ) : (<h4> No Member Found</h4>)}
       </div>
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
       <VoteRequest groupId={group._id} project={group.project.settings}/>
   </div>
        <Link to='/all-group' className='btn btn-light'> back to groups</Link>
   {auth.isAuthenticated && auth.loading === false && auth.user._id === group.groupOwner && (<Fragment><Link to={`/group-edit/${group._id}`} className='btn btn-light'>Edit group</Link>
   <Link onClick={e=>deletegroup(group._id)}  className='btn btn-light'>Delete group</Link></Fragment>
   )}
  
    </Fragment> }
</Fragment>
    )
};

Detailsgroup.propTypes = {
    getgroup: PropTypes.func.isRequired,
    deletegroup: PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired,
   

    };
const mapStateToProps = state => ({
    group: state.group,
    auth : state.auth,
});
export default connect(mapStateToProps,{getgroup,deletegroup})(Detailsgroup);
