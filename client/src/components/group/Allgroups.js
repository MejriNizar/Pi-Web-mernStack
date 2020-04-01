import React, {useEffect,  Fragment, useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import { getallgroups,sendRequest } from '../../actions/group';
import {Link, withRouter} from 'react-router-dom'
import Spinner from '../layout/spinner';


const Allgroup = ({history,sendRequest,getallgroups,groups:{groups,loading},auth}) => {
        
    useEffect(()=>{
        getallgroups();
        
    }, [loading]);

   

    return loading || groups === null ?<Spinner /> : (
        <Fragment>    
            
      <h1 className="large text-primary">Groups</h1>
      <p className="lead">
        <i className="fab fa-connectdevelop"></i> Check groups list 
      </p>
      <div className="profiles">
      {groups.length > 0 ? (
        groups.map(group => (    
 <div className="profile bg-light">
          <img
            className="round-img"
            src={group.logo} 
            alt=""
          />
          <div>
            <h2>{group.name}</h2>
            <p className="my-1">{group.slogan && <span> {group.slogan}</span>}</p>
            {auth.isAuthenticated && auth.loading === false &&  group.members.map((member,index)=>auth.user._id === member._id ?(<Link to={`/group-details/${group._id}`} className="btn btn-primary">View Details</Link>)
            :(<Link onClick={e=>sendRequest(group._id)} ><i className='fas fa-user'></i>Send Request</Link>))} 
            
          </div>

          <ul>
           {group.members.map((member,index)=>(<li key={index} className="text-primary">
               <Link to={`/profile/${member._id}`}><i className="fas fa-user"></i>{member.name}</Link>
           </li>))}
          </ul>
        </div> 
    
))
) : <h4> No Groups found ..</h4>}

        
      </div>
  
            </Fragment>
    )
   
}  
     


Allgroup.propTypes = {
    getallgroups: PropTypes.func.isRequired,
    sendRequest: PropTypes.func.isRequired,
    groups: PropTypes.func.isRequired,
    auth : PropTypes.object.isRequired
    };
const mapStateToProps = state => ({
    auth: state.auth,
    groups: state.groups
});
export default connect(mapStateToProps,{getallgroups,sendRequest})(withRouter(Allgroup));
