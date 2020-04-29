import React, {useState,useEffect, Table, Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import { getproject } from '../../actions/project';
import Spinner from '../layout/spinner';
import Moment from 'react-moment'


const ProjectDetails = ({match,getproject,project: {project,loading}}) => {
    useEffect(()=>{
        getproject(match.params.id);
        
    }, [loading]);
    return loading || project === null ?<Spinner /> : (
        <Fragment>  




<div className="profile-grid my-1">
    <div className="profile-top bg-primary p-2">
         
          <h1 className="large">{project.name}</h1>
          <h3 >Duration</h3>
          <p><Moment format='YYYY/MM/DD'>{project.startDate}</Moment>-
          <Moment format='YYYY/MM/DD'>{project.endDate}</Moment></p>
          
        </div>
        <div className="profile-about bg-light p-2">
            {project && (
                <Fragment>
                    <h2 className="text-primary">About project</h2>
          <p>
          {project.description}
          </p>
          <div className="line"></div> 
                </Fragment>
            )}
         <div>
  <p>
  <strong>Project Owner:</strong>{project.projectOwner.name}
  </p>
  </div>
        </div>
      
   </div>
   <div className="profile-edu bg-white p-2">
           <h2 className="text-primary"> Groups</h2>
  <p>
  <strong></strong><ul>{project.group.map(g => <li>{g.name}</li> )}</ul>
  </p>
  </div>

  <div className="profile-edu bg-white p-2">
           <h2 className="text-primary"> Documentation</h2>
  <p>
  <strong></strong>{project.documentation.map((d) =>(d.label))}
  </p>
  </div>
                

  
              
           </Fragment>
       )    
};

ProjectDetails.propTypes = {
    getproject: PropTypes.func.isRequired,
    };
const mapStateToProps = state => ({
    project: state.project
});
export default connect(mapStateToProps,{getproject})(ProjectDetails);
