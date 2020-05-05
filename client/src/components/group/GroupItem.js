import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import { sendRequest } from '../../actions/group';
import {Link, withRouter} from 'react-router-dom'


const GroupItem = ({sendRequest,group:{_id,logo,name,slogan,members},auth}) => {
  

   

   

    return  (
            
      
       <div className="profile bg-light">
          <img
            className="round-img"
            src={logo} 
            alt=""
          />
          <div>
            <h2>{name}</h2>
            <p className="my-1">{slogan && <span> {slogan}</span>}</p>
         <Link to={`/group-details/${_id}`} className="btn btn-primary">View Details</Link>
         <Link onClick={e=>sendRequest(_id)} ><i className='fas fa-user'></i>Send Request</Link>
            
          </div>

          <ul>
           {members.map((member,index)=>(<li key={index} className="text-primary">
               <Link to={`/profile/${member._id}`}><i className="fas fa-user"></i>{member.name}</Link>
           </li>))}
          </ul>
        </div> 
    


  
    )
   
}  
     


GroupItem.propTypes = {
    sendRequest: PropTypes.func.isRequired,
    group: PropTypes.object.isRequired,
    auth : PropTypes.object.isRequired
    };

export default connect(null,{sendRequest})(withRouter(GroupItem));
