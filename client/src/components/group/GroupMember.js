import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

const GroupMember= ({member:{
    name
   
}}) => 
    
        <div>
  
        <p>
        <strong>Name:</strong> {name}
        </p>
        </div>
    


    GroupMember.propTypes = {
education: PropTypes.array.isRequired,
}

export default GroupMember
