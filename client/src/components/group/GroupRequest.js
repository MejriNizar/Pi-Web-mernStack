import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import {AcceptRequest,DelteRequest} from '../../actions/group'

const GroupRequest= ({AcceptRequest,DelteRequest,request:{
    _id,
    userName
   
},groupId}) => 
    
        <div>
  
        <p>
        <strong>Name:</strong> {userName}
        </p>
        <button onClick={()=>AcceptRequest(groupId,_id)} className='btn btn-danger'> Accept </button>
    
    
    
        <button onClick={()=>DelteRequest(groupId,_id)} className='btn btn-danger'> Delete </button>
   
        </div>
    


    GroupRequest.propTypes = {
        request: PropTypes.array.isRequired,
        AcceptRequest: PropTypes.func.isRequired,
        DelteRequest:PropTypes.func.isRequired,
        groupId: PropTypes.string.isRequired
}

export default GroupRequest
