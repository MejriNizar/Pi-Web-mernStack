import React, {useState,useEffect, Table, Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import { getallprojects} from '../../actions/project';

const Allproject = ({getallprojects,project: {project,loading}}) => {
    useEffect(()=>{
        getallprojects();
    }, [loading]);
    return (
     <Fragment>
        <Table id="newsTable" hover responsive> 
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
        
                {project.map((d) => (<tr key={d._id}><td>{d.name}</td><td>{d.description.substring(0, 30)}</td><td>{d.startDate}</td><td>{d.endDate}</td></tr>))}
            </tbody>
        </Table>
        </Fragment>
    )    
};

Allproject.propTypes = {
    getallprojects: PropTypes.func.isRequired,
    project: PropTypes.object.isRequired,
    };
const mapStateToProps = state => ({
    project: state.project
});
export default connect(mapStateToProps,{getallprojects})(Allproject);
