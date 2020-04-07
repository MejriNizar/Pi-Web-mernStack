import React, {Fragment, useState} from 'react'
import PropTypes from 'prop-types'
import {connect } from 'react-redux'
import { withRouter} from 'react-router-dom'
import {SendVoteRequest} from '../../actions/group'

const VoteRequest= ({SendVoteRequest,groupId}) =>{
    const [formData, setFormData] = useState({
        votedescription:'',
     
    });
    const {votedescription} = formData;
    const onChange=e=>setFormData({...formData, [e.target.name]: e.target.value});

        return (<div className="profile-vote bg-light p-2">
        <form className="form" onSubmit={e => {
          e.preventDefault();
          SendVoteRequest(groupId,formData);
      }}>
        
        <strong></strong>
        <textarea
            name="votedescription"
            cols="100"
            rows="4"
            placeholder="suggest a vote ..." value={votedescription} onChange={e => onChange(e)} 
          ></textarea>
        
        
        <input type="submit" className="btn btn-primary my-1" />
        
      </form>
        
   
        </div>
    )

    }
    VoteRequest.propTypes = {
        SendVoteRequest: PropTypes.func.isRequired,
        groupId: PropTypes.string.isRequired
}

export default connect(null,{SendVoteRequest})((VoteRequest))