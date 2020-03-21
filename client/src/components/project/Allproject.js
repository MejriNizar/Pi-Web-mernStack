import React, {useState,useEffect, Table, Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import { getallprojects , deleteproject } from '../../actions/project';
import {Link, withRouter} from 'react-router-dom'
import Spinner from '../layout/spinner';
import Moment from 'react-moment';


const Allproject = ({history,deleteproject,getallprojects,projects: {projects,loading}}) => {
        
    useEffect(()=>{
        getallprojects();
        
    }, [loading]);

    const projectss=projects.map(p => (
        <tr key={p._id}>
            <td>{p.name}</td>
    <td className='hide-sm'>{p.description.substring(0, 30)}</td>
    <td>
        <Moment format='YYYY/MM/DD'>{p.startDate}</Moment> - 
        <Moment format='YYYY/MM/DD'>{p.endDate}</Moment>
        
    </td>
    <td>
    <Link to={`/project-details/${p._id}`}><i className="fas fa-eye"></i> </Link>
    </td>
    <td>
    <Link to={`/project-edit/${p._id}`} ><i className="fas fa-edit"></i> </Link>
    </td>
    <td>
            <Link onClick={e=>deleteproject(p._id)}  ><i className='fas fa-trash'></i></Link>
    </td>
        </tr >
    ))
     
    return loading || projects === null ?<Spinner /> : (
        <Fragment>       
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
    getallprojects: PropTypes.func.isRequired,
    deleteproject: PropTypes.func.isRequired
    };
const mapStateToProps = state => ({
    projects: state.projects
});
export default connect(mapStateToProps,{getallprojects,deleteproject})(Allproject);
