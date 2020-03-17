import React, {useState,useEffect, Table, Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import { getallprojects } from '../../actions/project';

const Allproject = ({getallprojects,projects: {projects,loading}}) => {
        
    useEffect(()=>{
        getallprojects();
        
    }, [loading]);
    return (
        <Fragment>
        
           <table border="1">
               <thead>
                   <tr>
                       <th>Name</th>
                       <th>Description</th>
                       <th>Start Date</th>
                       <th>End Date</th>
                       
                   </tr>
               </thead>
               <tbody>
               { projects.map((d) => (<tr key={d._id}><td>{d.name}</td><td>{d.description.substring(0, 30)}</td><td>{d.startDate}</td><td>{d.endDate}</td></tr>))}
   
               </tbody>
           </table>
           </Fragment>
       )    
};

Allproject.propTypes = {
    getallprojects: PropTypes.func.isRequired
    };
const mapStateToProps = state => ({
    projects: state.projects
});
export default connect(mapStateToProps,{getallprojects})(Allproject);
