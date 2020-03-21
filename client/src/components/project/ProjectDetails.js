import React, {useState,useEffect, Table, Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import { getproject } from '../../actions/project';
import Spinner from '../layout/spinner';


const ProjectDetails = ({match,getproject,project: {project,loading}}) => {
    useEffect(()=>{
        getproject(match.params.id);
        
    }, [loading]);
    return loading || project === null ?<Spinner /> : (
        <Fragment>       
              {project.name}<br></br>
              {project.description}<br></br>
              {project.startDate}<br></br>
              <h1>{match.params.id}</h1>
           </Fragment>
       )    
};

ProjectDetails.propTypes = {
    getproject: PropTypes.func.isRequired,
    };
const mapStateToProps = state => ({
    project: state.project
});
export default connect(mapStateToProps,{getproject})(ProjectDetails);
