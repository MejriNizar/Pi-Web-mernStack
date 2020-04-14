import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import {submitVote} from '../../actions/group'
import { RadioButtonComponent } from '@syncfusion/ej2-react-buttons';
import {connect} from 'react-redux'

const VotingRequest= ({auth,submitVote,request:{
    _id,
    userName,
    object,
    title
   
},groupId}) => {
    const onChange = e => { 
        console.log(e);   
            submitVote(e,groupId,_id);
    }
    
 return (<div>
  
        <p>
        <strong>User Name:</strong> {userName}
        </p>
        <p>
        <strong>Title:</strong> {title}
        </p>
        <p>
        <strong>Object:</strong> {object}
        </p>
        
            
            <RadioButtonComponent label="Yes" name="resultat"  value="yes" change={
                            e => onChange(e.value)
                        }/>&nbsp;&nbsp;&nbsp;

            
            <RadioButtonComponent label="No" name="resultat"  value="no" change={
                            e => onChange(e.value)
                        }/>
        <p>----------------------------------------</p>
        </div>) 
    
}

      


    VotingRequest.propTypes = {
        request: PropTypes.array.isRequired,
        submitVote: PropTypes.func.isRequired,
        groupId: PropTypes.string.isRequired,
        auth:PropTypes.object.isRequired


}
export default connect(null,{submitVote})(VotingRequest)

