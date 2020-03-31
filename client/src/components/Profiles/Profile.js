import React , {Fragment, useEffect}from 'react'
import PropTypes from 'prop-types'
import {connect } from 'react-redux'
import Spinner from '../layout/spinner'
import {getProfileById} from '../../actions/profile'
import { Link } from 'react-router-dom'
const Profile = ({getProfileById,auth,profile:{profile,loading},match}) => {
    
    useEffect(()=> {
getProfileById(match.params.id)
    },[getProfileById])
    return (
        <Fragment>
            {profile === null || loading ? <Spinner></Spinner> : <Fragment>
                <Link to='/profiles' className='btn btn-light'> back to profiles</Link>
           {auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id && (<Link to='/edit-profile' className='btn btn-dark'>Edit Prodile</Link>)}
          
            </Fragment> }
        </Fragment>
    )
}

Profile.propTypes = {
getProfileById: PropTypes.func.isRequired,
profile:PropTypes.object.isRequired,
auth:PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
})

export default connect(mapStateToProps,{getProfileById})(Profile)
