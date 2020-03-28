import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Moment from 'react-moment'
import {AcceptRequest,DelteRequest} from '../../actions/group'



const Request = ({AcceptRequest,DelteRequest,group,request}) => {
   

    const requests=request.map(exp => (
        <tr key={exp._id}>
            <td>{exp.userName}</td>
  
            <td>
        <button onClick={()=>AcceptRequest(group._id,exp._id)} className='btn btn-danger'> Accept </button>
    </td>
    
    <td>
        <button onClick={()=>DelteRequest(group._id,exp._id)} className='btn btn-danger'> Delete </button>
    </td>
        </tr >
    ))
    return (
        <Fragment>
            <h2 className="my-2">Requests Recived</h2>
            <table className='table'>
                <thead>
                    <tr>
                        <th>User Name</th>
                        <th />
                        
                        <th />
                    </tr>
                </thead>
                <tbody>{requests}</tbody>
            </table>
        </Fragment>
    )
}

Request.propTypes = {
    group: PropTypes.string.isRequired,
    request: PropTypes.array.isRequired,

    AcceptRequest:PropTypes.func.isRequired,
    DelteRequest:PropTypes.func.isRequired,

}

export default connect(null,{AcceptRequest,DelteRequest})(Request)
