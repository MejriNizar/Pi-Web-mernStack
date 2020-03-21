import React, {useState,useEffect, Table, Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import { getevent } from '../../actions/event';
import Spinner from '../layout/spinner';


const EventDetails = ({match,getevent,event: {event,loading}}) => {
    useEffect(()=>{
        getevent(match.params.id);
        
    }, [loading]);
    return loading || event === null ?<Spinner /> : (
        <Fragment>       
              {event.title}<br></br>
              {event.description}<br></br>
              {event.startDate}<br></br>
              <h1>{match.params.id}</h1>
           </Fragment>
       )    
};

EventDetails.propTypes = {
    getevent: PropTypes.func.isRequired,
    };
const mapStateToProps = state => ({
    event: state.event
});
export default connect(mapStateToProps,{getevent})(EventDetails);
