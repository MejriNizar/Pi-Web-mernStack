import React, {useState,useEffect, Table, Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import { getallgroups,deletegroup } from '../../actions/group';
import {Link, withRouter} from 'react-router-dom'
import Spinner from '../layout/spinner';


const Allgroup = ({history,deletegroup,getallgroups,groups:{groups,loading}}) => {
        
    useEffect(()=>{
        getallgroups();
        
    }, [loading]);

   
     
    return loading || groups === null ?<Spinner /> : (
        <Fragment>       
           <table  className="table">
               <thead>
                   <tr>
                       <th>Name</th>
                       <th>logo</th>
                       <th>slogan</th>
                       <th colSpan="3">Actions</th>
                       
                   </tr>
               </thead>
               <tbody>
               { groups.map((d) => (<tr key={d._id}><td>{d.name}</td><td>{d.logo}</td><td>{d.slogan}</td><td> <Link to={`/group-details/${d._id}`} 
          ><i className="fas fa-eye"></i> </Link></td><td><Link onClick={e=>deletegroup(d._id)}  ><i className='fas fa-trash'></i></Link></td><td><Link to={`/group-edit/${d._id}`} 
          ><i className="fas fa-edit"></i> </Link></td></tr>))}
   
               </tbody>
           </table>
           </Fragment>
       )    
};

Allgroup.propTypes = {
    getallgroups: PropTypes.func.isRequired,
    deletegroup: PropTypes.func.isRequired,
    groups: PropTypes.func.isRequired
    };
const mapStateToProps = state => ({
    groups: state.groups
});
export default connect(mapStateToProps,{getallgroups,deletegroup})(Allgroup);
