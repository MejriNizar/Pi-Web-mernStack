import React from 'react'
import {Link} from 'react-router-dom'
const DashboardAction = () => {
    return (
        <div className="dash-buttons">
        <Link to="/edit-profile" className="btn btn-light"
          ><i className="fas fa-user-circle text-primary"></i> Edit Profile</Link>
        <Link to="/add-experience" className="btn btn-light"
          ><i className="fab fa-black-tie text-primary"></i> Add Experience</Link>
        <Link to="/add-education" className="btn btn-light"
          ><i className="fas fa-graduation-cap text-primary"></i> Add Education</Link>
          <Link to="/all-project" className="btn btn-light"
          ><i className="fas fa-graduation-cap text-primary"></i> List Project</Link>
          <Link to="/all-events" className="btn btn-light"
          ><i className="fa fa-th-list text-primary"></i> List events</Link>
          <Link to="/add-event" className="btn btn-light"
          ><i className="fa fa-plus-square text-primary"></i> add event</Link>
          <Link to="/add-project" className="btn btn-light"
          ><i className="fas fa-graduation-cap text-primary"></i> Add Project</Link>
          <Link to="/all-group" className="btn btn-light"
          ><i className="fas fa-graduation-cap text-primary"></i> List Groups</Link>
          <Link to="/add-group" className="btn btn-light"
          ><i className="fas fa-graduation-cap text-primary"></i> Add Group</Link>
      </div>
    )
}



export default DashboardAction
