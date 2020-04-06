import React , {Fragment, useEffect}from 'react'
import PropTypes from 'prop-types'
import {connect } from 'react-redux'
import Spinner from '../../layout/spinner'
import {getProfileById} from '../../../actions/profile'
import { Link } from 'react-router-dom'
import ProfileTop from './ProfileTop.js'
import ProfileAbout from './ProfileAbout'
import ProfileExp from './ProfileExp'
import ProfileEdu from './ProfileEdu'
import ProfileCV from './ProfileCV'
const Profile = ({getProfileById,auth,profile:{profile,loading},match}) => {
    
    useEffect(()=> {
getProfileById(match.params.id)
    },[getProfileById,match.params.id])
    return (
        <Fragment>
            {profile === null || loading ? <Spinner></Spinner> : <Fragment>

 <div className="profile-grid my-1">
               <ProfileTop profile={profile} />
               <ProfileAbout profile={profile} />

               <div className="profile-exp bg-white p-2">
                   <h2 className="text-primary"> Experiences</h2>
                   {profile.experience.length > 0 ? (
                       <Fragment>
                           {profile.experience.map(exp =>(
                               <ProfileExp key={exp._id} experience={exp}/>
                           ))}
                       </Fragment>
                   ) : (<h4> No EXperience Found</h4>)}
               </div>
               <div className="profile-edu bg-white p-2">
                   <h2 className="text-primary"> Education</h2>
                   {profile.education.length > 0 ? (
                       <Fragment>
                           {profile.education.map(exp =>(
                               <ProfileEdu key={exp._id} education={exp}/>
                           ))}
                       </Fragment>
                   ) : (<h4> No Education Found</h4>)}
               </div>
               <div>
               <h2 className="text-primary"> CV</h2>
               {profile.CV ===  null ? (<h4> No CV Found</h4>) : (<Fragment> 
                   <ProfileCV profile={profile}></ProfileCV>
               </Fragment>)}
               </div>
           </div>
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
