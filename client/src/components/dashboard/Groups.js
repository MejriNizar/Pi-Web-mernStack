import React, {useState,useEffect, Table, Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import { getallgroupslimit,deletegroup } from '../../actions/group';
import {Link, withRouter} from 'react-router-dom'
import Spinner from '../layout/spinner';


const Groups = ({history,deletegroup,getallgroupslimit,groups:{groups,loading}}) => {
        
    useEffect(()=>{
        getallgroupslimit();
        
    }, [loading]);

   
     
    return loading || groups === null ?<Spinner /> : (
        <Fragment>  
        <h2 className="my-2">Groups</h2>
           <table  className="table">
               <thead>
                   <tr>
                       <th>Name</th>
                       <th>logo</th>
                       <th>slogan</th>
                       <th colSpan="2">Project</th>
                       <th colSpan="3">Actions</th>
                       
                   </tr>
               </thead>
               <tbody>
               { groups.map((d) => 
               (<tr key={d._id}>
               <td>{d.name}</td>
               <td>{d.logo}</td>
               <td>{d.slogan}</td>
               {d.project != null ?( <td>{d.project.name}</td> ): <td>no project</td> }
               <td><Link to={`/affect-project/${d._id}`}><i className="fas fa-plus"></i> </Link></td>
               <td> <Link to={`/group-details/${d._id}`} ><i className="fas fa-eye"></i> </Link></td>
               <td><Link onClick={e=>deletegroup(d._id)}  ><i className='fas fa-trash'></i></Link></td>
               <td><Link to={`/group-edit/${d._id}`} ><i className="fas fa-edit"></i> </Link></td>
               </tr>))}
   
               </tbody>
           </table>
           </Fragment>
       )    
};

Groups.propTypes = {
    getallgroupslimit: PropTypes.func.isRequired,
    deletegroup: PropTypes.func.isRequired,
    groups: PropTypes.func.isRequired
    };
const mapStateToProps = state => ({
    groups: state.groups
});
export default connect(mapStateToProps,{getallgroupslimit,deletegroup})(Groups);
