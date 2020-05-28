import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import {DelteInvitation,AcceptInvitation} from '../../actions/group'



const Invitations = ({DelteInvitation,AcceptInvitation,invitation}) => {
    const invitations=invitation.map(exp => (
        <tr key={exp._id}>
            <td>{exp.groupeName}</td>
  
            <td>
        <button onClick={()=>AcceptInvitation(exp._id)} className='btn btn-danger'> Accept </button>
    </td>
    
    <td>
        <button onClick={()=>DelteInvitation(exp._id)} className='btn btn-danger'> Delete </button>
    </td>
        </tr >
    ))
    return (
        <Fragment>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Groupe</th>
                        <th />
                        
                        <th />
                    </tr>
                </thead>
                <tbody>{invitations}</tbody>
            </table>
        </Fragment>
    )
}

Invitations.propTypes = {
    invitation: PropTypes.array.isRequired,
    DelteInvitation:PropTypes.func.isRequired,
    AcceptInvitation:PropTypes.func.isRequired

}

export default connect(null,{DelteInvitation,AcceptInvitation})(Invitations)
