import React ,{Fragment} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

const DashboardAction = ({auth:{user}}) => {
    return (
        <div className="dash-buttons">
          {user.role === 'Student' ?( <Fragment><Link to="/edit-profile" className="btn btn-light"
          ><i className="fas fa-user-circle text-primary"></i> Edit Profile</Link>
        <Link to="/add-experience" className="btn btn-light"
          ><i className="fab fa-black-tie text-primary"></i> Add Experience</Link>
        <Link to="/add-education" className="btn btn-light"
          ><i className="fas fa-graduation-cap text-primary"></i> Add Education</Link>
          <Link to="/all-group" className="btn btn-light"
          ><i className="fas fa-graduation-cap text-primary"></i> List Groups</Link>
          <Link to="/add-group" className="btn btn-light"
          ><i className="fas fa-graduation-cap text-primary"></i> Add Group</Link>
          <Link to="/all-project" className="btn btn-light"
          ><i className="fas fa-graduation-cap text-primary"></i> List Projects</Link></Fragment>):( <Fragment>  <Link to="/all-events" className="btn btn-light"
          ><i className="fa fa-th-list text-primary"></i> List events</Link>
          <Link to="/add-event" className="btn btn-light"
          ><i className="fa fa-plus-square text-primary"></i> add event</Link>
              <Link to="/add-project" className="btn btn-light"
          ><i className="fas fa-graduation-cap text-primary"></i> Add Project</Link>
           <Link to="/upload" className="btn btn-light"
          ><i className="fas fa-graduation-cap text-primary"></i> Upload file</Link></Fragment>) }
      </div>
    )
}
DashboardAction.propTypes = {

  auth: PropTypes.object.isRequired,
 
  }
const mapStateToProps = state => ({
  auth: state.auth,
  
});
export default connect(mapStateToProps,{})(DashboardAction)
