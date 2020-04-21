import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import {submitVote} from '../../actions/group'
import { RadioButtonComponent } from '@syncfusion/ej2-react-buttons';
import {connect} from 'react-redux'
import {ProgressBarComponent} from '@syncfusion/ej2-react-progressbar';
import VoteProgress from './VoteProgress';

const VotingRequest= ({auth,submitVote,request:{
    _id,
    userName,
    object,
    title
   
},groupId,loading}) => {

    const [displayYes, setDisplayYes] = useState();
    const [displayNo, setDisplayNo] = useState();
    const [displayAll, setDisplayAll] = useState(false);

    useEffect(() => {
        auth.user.votes.map(v=> {
            if (v.vote_request === _id) {
                if(v.response === 1)
                {setDisplayYes(true);
                setDisplayAll(false);
                }
                else if(v.response === -1){setDisplayNo(true);
                    setDisplayAll(false);
                }
                
            }
            else {setDisplayAll(true);}
        } )
    }, [loading])
    
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
        
            <VoteProgress groupId={groupId} _id={_id} />
        
    
        
          {auth.user.votes && <Fragment> 
                {displayYes && <div>
                        <RadioButtonComponent label="Yes" name={_id}  value="yes" change={e => onChange(e.value)} checked={true} /> &nbsp;&nbsp;&nbsp;
                         <RadioButtonComponent label="No" name={_id}  value="no" change={e => onChange(e.value)}/>
                         <p>----------------------------------------</p>
                          </div> }
                {displayNo && <div>
                    <RadioButtonComponent label="Yes" name={_id}  value="yes" change={ e => onChange(e.value)} />&nbsp;&nbsp;&nbsp;
                    <RadioButtonComponent label="No" name={_id}  value="no" change={ e => onChange(e.value) } checked={true}/>
                    <p>----------------------------------------</p>
                    </div>
                    }
                {displayAll && <div>
                    <RadioButtonComponent label="Yes" name={_id}  value="yes" change={ e => onChange(e.value) }/>&nbsp;&nbsp;&nbsp;
                    <RadioButtonComponent label="No" name={_id}  value="no" change={ e => onChange(e.value)}/>
                    <p>----------------------------------------</p>
                    </div>}  
                {/* {auth.user.votes.map(v=> v.vote_request === _id) ? (                   
                    <div>
                        {auth.user.votes.map(r=> r.response === 1) ? (
                            <div>
                        <RadioButtonComponent label="Yes" name={_id}  value="yes" change={e => onChange(e.value)} checked={true} /> &nbsp;&nbsp;&nbsp;
                         <RadioButtonComponent label="No" name={_id}  value="no" change={e => onChange(e.value)}/>
                         <p>----------------------------------------</p>
                          </div>
                         
                ):( 
                    <div>
                    <RadioButtonComponent label="Yes" name={_id}  value="yes" change={ e => onChange(e.value)} />&nbsp;&nbsp;&nbsp;
                    <RadioButtonComponent label="No" name={_id}  value="no" change={ e => onChange(e.value) } checked={true}/>
                    <p>----------------------------------------</p>
                    </div>
                ) }  </div>): (  
                    <div>
                    <RadioButtonComponent label="Yes" name={_id}  value="yes" change={ e => onChange(e.value) }/>&nbsp;&nbsp;&nbsp;
                    <RadioButtonComponent label="No" name={_id}  value="no" change={ e => onChange(e.value)}/>
                    <p>----------------------------------------</p>
                    </div>
                 )} */}


            </Fragment>}
        </div>) 
    
}

      


    VotingRequest.propTypes = {
        request: PropTypes.array.isRequired,
        submitVote: PropTypes.func.isRequired,
        groupId: PropTypes.string.isRequired,
        auth:PropTypes.object.isRequired,


}
const mapStateToProps = state => ({
    auth: state.auth

});
export default connect(mapStateToProps,{submitVote})(VotingRequest)

