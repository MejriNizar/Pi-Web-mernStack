import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import GroupActions from './GroupActions'
import GroupRequest from './GroupRequest'
import GroupMember from './GroupMember'
import { connect } from 'react-redux'
import {getproject} from '../../actions/project'
const GroupMemb = ({getproject,project:{project},group:{group}}) => {
    useEffect(()=>{
        getproject(group.project._id);
        console.log(project)
    }, [getproject]);
    return (
     <Fragment>
           <GroupActions group= {group} />
           <h2 className="text-primary"> Project Owner</h2>
           
        <p>
        <strong>Name:</strong>{project && project.projectOwner.name }
        </p>
        <h2 className="text-primary"> Requests</h2>
        {group.request.length > 0 ? (
            <Fragment>
                {group.request.map(req =>(
                    <GroupRequest key={req._id} request={req} groupId={group._id}/>
                ))}
            </Fragment>
        ) : (<h4> No Request Found</h4>)}
      <h2 className="text-primary"> Members</h2>
        {group.members.length > 0 ? (
            <Fragment>
                {group.members.map(mem =>(
                    <GroupMember key={mem._id} member={mem}/>
                ))}
            </Fragment>
        ) : (<h4> No Member Found</h4>)}
    
    </Fragment>
 
    )
}

GroupMemb.propTypes = {
    group: PropTypes.object.isRequired,
    getproject:PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
    group: state.group,
    auth : state.auth,
    project: state.project
});

export default connect(mapStateToProps,{getproject}) (GroupMemb)
