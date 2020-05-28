import React, {useEffect,  Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import { getactivatedgroup,deletegroup } from '../../actions/group';
import {Link} from 'react-router-dom'
import Spinner from '../layout/spinner';


const Groups = ({getactivatedgroup,groups:{groups,loading}}) => {
        
    useEffect(()=>{
        getactivatedgroup();
        
    }, [getactivatedgroup]);

   
     
    return loading || groups === null ?<Spinner /> : (
        <Fragment>  
        <h2 className="my-2">Groups</h2>
           <table  className="table">
               <thead>
                   <tr>
                       <th>Name</th>
                       <th>slogan</th>
                       <th colSpan="2">Project</th>
                       <th colSpan="3">Actions</th>
                       
                   </tr>
               </thead>
               <tbody>
               { groups.map((d) => 
               (<tr key={d._id}>
               <td>{d.name}</td>
               
               <td>{d.slogan}</td>
               {d.project != null ?( <td>{d.project.name}</td> ): <td>no project</td> }
               <td> <Link to={`/group-details/${d._id}`} ><i className="fas fa-eye"></i> </Link></td>
               </tr>))}
   
               </tbody>
           </table>
           </Fragment>
       )    
};

Groups.propTypes = {
    getactivatedgroup: PropTypes.func.isRequired,
    deletegroup: PropTypes.func.isRequired,
    groups: PropTypes.func.isRequired
    };
const mapStateToProps = state => ({
    groups: state.groups
});
export default connect(mapStateToProps,{getactivatedgroup,deletegroup})(Groups);
