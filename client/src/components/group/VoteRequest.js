import React, {Fragment, useState} from 'react'
import PropTypes from 'prop-types'
import {connect } from 'react-redux'
import { withRouter} from 'react-router-dom'
import {SendVoteRequest} from '../../actions/group'
import {DropDownListComponent} from '@syncfusion/ej2-react-dropdowns'


const VoteRequest= ({SendVoteRequest,groupId}) =>{
    const [formData, setFormData] = useState({
        title:'',
        object:'',
        
     
    });
    const {title,object,votingSystem} = formData;
    const votetype = ['Free','Dictatorship', 'Absolute Majority', '2/3 Unanimite', 'Veto right'];
    const onChange=e=>setFormData({...formData, [e.target.name]: e.target.value});
    const onChangeVote = e => setFormData({
        ...formData,
        votingSystem: e
    });

        return (<div className="profile-vote bg-light p-2">
        <form className="form" onSubmit={e => {
          e.preventDefault();
          SendVoteRequest(groupId,formData);
      }}>
        
        <strong></strong>
        <div className="form-group">
                    <input type="text" placeholder="* Title" name="title"
                        value={title}
                        onChange={
                            e => onChange(e)
                        }
                        required/>
                </div>
        <textarea
            name="object"
            cols="100"
            rows="4"
            placeholder="suggest a vote ..." value={object} onChange={e => onChange(e)} 
          ></textarea>
        <div className="form-group">
                        <DropDownListComponent id="dlelement"
                            dataSource={votetype}
                            placeholder="Select a voting system"
                            change={
                                e => onChangeVote(e.value)
                            }/>
                    </div>
        
        <input type="submit" className="btn btn-primary my-1" />
        
      </form>
        
   
        </div>
    )

}
    VoteRequest.propTypes = {
        SendVoteRequest: PropTypes.func.isRequired,
        groupId: PropTypes.object.isRequired,
}

export default connect(null,{SendVoteRequest})((VoteRequest))