import React, {useState,useEffect, Table, Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import { getgroup } from '../../actions/group';
import Spinner from '../layout/spinner';


const Detailsgroup = ({match,getgroup,group: {group,loading}}) => {
    useEffect(()=>{
        getgroup(match.params.id);
        
    }, [loading]);
    return loading || group === null ?<Spinner /> : (
        <Fragment>       
              {group.name}<br></br>
              {group.logo}<br></br>
              {group.slogan}<br></br>
              {group.members.map(p => (
       
            <td>{p.name}</td>
              ))}
           </Fragment>
       )    
};

Detailsgroup.propTypes = {
    getgroup: PropTypes.func.isRequired,
    };
const mapStateToProps = state => ({
    group: state.group
});
export default connect(mapStateToProps,{getgroup})(Detailsgroup);
