import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

const GroupAbout = ({group:{
    project,
    creationDate
    
}}) => 
    
        <div className="profile-about bg-light p-2">
            {project && (
                <Fragment>
                    <h2 className="text-primary">Project</h2>
          <p>
           {project.name}
          </p>
          <div className="line"></div> 
                </Fragment>
            )}
         
          <h2 className="text-primary">Creation date</h2>
          <p>
          <Moment format='YYYY/MM/DD'>{creationDate}</Moment>
          </p>
        </div>
    


    GroupAbout.propTypes = {
group: PropTypes.object.isRequired,
}

export default GroupAbout
