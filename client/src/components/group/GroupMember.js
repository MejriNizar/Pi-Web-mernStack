import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const GroupMember= ({member}) => 
    
        <div>
  
        <p>
       <h4> <strong>Name:</strong>  <Link to={`/profile/${member._id}`}><i className="fas fa-user"></i>{member.name}</Link></h4>
        </p>
        </div>
    


    GroupMember.propTypes = {
education: PropTypes.array.isRequired,
}

export default GroupMember
