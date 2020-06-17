import React, {useEffect,  Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import { getactivatedprojects , deleteproject } from '../../actions/project';
import {Link, withRouter} from 'react-router-dom'
import Spinner from '../layout/spinner';

import { Col, Row } from 'react-bootstrap';


const Allproject = ({history,deleteproject,getactivatedprojects,projects: {projects,loading},auth:{user}}) => {
        
    useEffect(()=>{
        getactivatedprojects();
        
    }, [getactivatedprojects]);

    
     
    return loading || projects === null ?<Spinner /> : (
        <Fragment> 


      <h1 className="large text-primary">Projects</h1>
      <p className="lead">
        <i className="fab fa-connectdevelop"></i> Check projects list 
      </p>  
      <Row>
      {projects.map(p => 
      <Col md={4}>
      <div className="e-card">
        <div className="e-card-image">
          <div className="e-card-title">{p.name} </div>
        </div>
        <div className="e-card-content">
        {p.description}. </div>
        <div className="e-card-actions e-card-vertical">
        { user._id !== p.projectOwner ? ( 
          <tr>
        <td>
        <Link to={`/project-details/${p._id}`}> More </Link>
        <Link to={`/add-group/${p._id}`} > Add group </Link>
    
        </td>   </tr>):
      
        <td>
     
    <Link to={`/project-details/${p._id}`}>More </Link>
    
    <Link to={`/project-edit/${p._id}`} >Edit</Link>
    
    <Link onClick={e=>deleteproject(p._id)}  >Delete</Link>
    </td>
  
    }
            </div>
            </div>
            </Col>
    )} 
    </Row>
           </Fragment>
       )    
};

Allproject.propTypes = {
    getactivatedprojects: PropTypes.func.isRequired,
    deleteproject: PropTypes.func.isRequired
    };
const mapStateToProps = state => ({
    auth: state.auth,
    projects: state.projects
});
export default connect(mapStateToProps,{getactivatedprojects,deleteproject})(withRouter(Allproject));
