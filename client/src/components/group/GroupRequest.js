import React from 'react'
import PropTypes from 'prop-types'
import {AcceptRequest,DelteRequest} from '../../actions/group'
import {connect} from 'react-redux'

const GroupRequest= ({AcceptRequest,DelteRequest,request:{
    _id,
    userName
   
},groupId}) => 
    
        <div>
  
        <p>
        <strong>Name:</strong> {userName}
        </p>
        <button onClick={()=>AcceptRequest(groupId,_id)} className='btn btn-success'> Accept </button>
    
    
    
        <button onClick={()=>DelteRequest(groupId,_id)} className='btn btn-danger'> Delete </button>
        
        </div>
    


    GroupRequest.propTypes = {
        request: PropTypes.array.isRequired,
        AcceptRequest: PropTypes.func.isRequired,
        DelteRequest:PropTypes.func.isRequired,
        groupId: PropTypes.string.isRequired
}

export default connect(null,{AcceptRequest,DelteRequest}) (GroupRequest)
