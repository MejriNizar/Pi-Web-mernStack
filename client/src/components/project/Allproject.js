import React, {useEffect,  Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import { getactivatedprojects , deleteproject } from '../../actions/project';
import {Link, withRouter} from 'react-router-dom'
import Spinner from '../layout/spinner';
import Moment from 'react-moment';


const Allproject = ({history,deleteproject,getactivatedprojects,projects: {projects,loading},auth:{user}}) => {
        
    useEffect(()=>{
        getactivatedprojects();
        
    }, [loading]);

    const projectss=projects.map(p => (
        <tr key={p._id}>
            <td>{p.name}</td>
    <td className='hide-sm'>{p.description.substring(0, 30)}</td>
    <td>
        <Moment format='YYYY/MM/DD'>{p.startDate}</Moment> - 
        <Moment format='YYYY/MM/DD'>{p.endDate}</Moment>
        
    </td>
    { user._id !== p.projectOwner ? ( 
        <td>
        <Link to={`/project-details/${p._id}`}><i className="fas fa-eye"></i> </Link>&nbsp;&nbsp;&nbsp;&nbsp;

        <Link to={`/add-group/${p._id}`} ><i className="fas fa-plus"></i> ADD GROUP </Link>
    
        </td>):
      
        <td>
    <Link to={`/project-details/${p._id}`}><i className="fas fa-eye"></i> </Link>
    
    <Link to={`/project-edit/${p._id}`} ><i className="fas fa-edit"></i> </Link>
    
    <Link onClick={e=>deleteproject(p._id)}  ><i className='fas fa-trash'></i></Link>
    </td>
  
    }
    </tr>
      
    
    
    ))
     
    return loading || projects === null ?<Spinner /> : (
        <Fragment>    
               
      <h1 className="large text-primary">Projects</h1>
      <p className="lead">
        <i className="fab fa-connectdevelop"></i> Check projects list 
      </p>   
           <table  className="table">
               <thead>
                   <tr>
                       <th>Name</th>
                       <th>Description</th>
                       <th>Duration</th>
                       <th colSpan="3">Actions</th>
                       
                   </tr>
               </thead>
               <tbody>
               {projectss}   
               </tbody>
           </table>
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
