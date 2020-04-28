import React, {useEffect,  Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import { getallprojectslimit , deleteproject } from '../../actions/project';
import {Link, withRouter} from 'react-router-dom'
import Spinner from '../layout/spinner';
import Moment from 'react-moment';


const Projects = ({history,deleteproject,getallprojectslimit,projects: {projects,loading},auth:{user}}) => {
        
    useEffect(()=>{
        getallprojectslimit();
        
    }, [getallprojectslimit]);

    const projectss=projects.map(p => (
        <tr key={p._id}>
            <td>{p.name}</td>
    <td className='hide-sm'>{p.description.substring(0, 30)}</td>
    <td>
        <Moment format='YYYY/MM/DD'>{p.startDate}</Moment> - 
        <Moment format='YYYY/MM/DD'>{p.endDate}</Moment>
        
    </td>
    
    {p.projectOwner === user._id ?(<td>
       
    <Link to={`/project-details/${p._id}`}><i className="fas fa-eye"></i> </Link>&nbsp;&nbsp;
    
    <Link to={`/project-edit/${p._id}`} ><i className="fas fa-edit"></i> </Link>&nbsp;&nbsp;&nbsp;
   
            <Link onClick={e=>deleteproject(p._id)}  ><i className='fas fa-trash'></i></Link>
    </td>):( <td>
    <Link to={`/project-details/${p._id}`}><i className="fas fa-eye"></i> </Link>
  
    </td>)}
    
        </tr >
    ))
     
    return loading || projects === null ?<Spinner /> : (
        <Fragment>       
                <h2 className="my-2">Projects</h2>

           <table  className="table">
               <thead>
                   <tr>
                       <th>Name</th>
                       <th>Description</th>
                       <th>Duration</th>
                       <th colSpan="3">State</th>
                       
                   </tr>
               </thead>
               <tbody>
               {projectss}   
               </tbody>
           </table>
           </Fragment>
       )    
};

Projects.propTypes = {
    getallprojectslimit: PropTypes.func.isRequired,
    deleteproject: PropTypes.func.isRequired
    };
const mapStateToProps = state => ({
    auth: state.auth,

    projects: state.projects
});
export default connect(mapStateToProps,{getallprojectslimit,deleteproject})(Projects);
