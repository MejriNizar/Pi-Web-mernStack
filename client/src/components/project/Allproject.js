import React, {useState,useEffect, Table, Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import { getallprojects , deleteproject } from '../../actions/project';
import {Link, withRouter} from 'react-router-dom'
import Spinner from '../layout/spinner';


const Allproject = ({history,deleteproject,getallprojects,projects: {projects,loading}}) => {
        
    useEffect(()=>{
        getallprojects();
        
    }, [loading]);

   
     
    return loading || projects === null ?<Spinner /> : (
        <Fragment>       
           <table  className="table">
               <thead>
                   <tr>
                       <th>Name</th>
                       <th>Description</th>
                       <th>Start Date</th>
                       <th>End Date</th>
                       <th colSpan="3">Actions</th>
                       
                   </tr>
               </thead>
               <tbody>
               { projects.map((d) => (<tr key={d._id}><td>{d.name}</td><td>{d.description.substring(0, 30)}</td><td>{d.startDate}</td><td>{d.endDate}</td><td> <Link to={`/project-details/${d._id}`} 
          ><i className="fas fa-eye"></i> </Link></td><td><Link onClick={e=>deleteproject(d._id)}  ><i className='fas fa-trash'></i></Link></td><td><Link to={`/project-edit/${d._id}`} 
          ><i className="fas fa-edit"></i> </Link></td></tr>))}
   
               </tbody>
           </table>
           </Fragment>
       )    
};

Allproject.propTypes = {
    getallprojects: PropTypes.func.isRequired,
    deleteproject: PropTypes.func.isRequired
    };
const mapStateToProps = state => ({
    projects: state.projects
});
export default connect(mapStateToProps,{getallprojects,deleteproject})(Allproject);
