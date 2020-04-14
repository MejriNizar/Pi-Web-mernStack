import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import {submitVote,getvoteprog} from '../../actions/group'
import { RadioButtonComponent } from '@syncfusion/ej2-react-buttons';
import {connect} from 'react-redux'
import {ProgressBarComponent} from '@syncfusion/ej2-react-progressbar';
import VoteProgress from './VoteProgress';

const VotingRequest= ({auth,submitVote,request:{
    _id,
    userName,
    object,
    title
   
},groupId,getvoteprog,progress:{progress,loading}}) => {

    useEffect(()=>{
        getvoteprog(groupId,_id);
        
    }, [loading]);
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
        {progress && <Fragment><ProgressBarComponent id={_id}
                        type='Linear'
                        showProgressValue={true}
                        labelStyle={{color: '#FFFFFF'}}
                        trackThickness={24}
                        progressThickness={24}
                        minimum={0}
                        maximum={5}
                        value={progress.nbyes}
                        textRender={(args) => {
                        args.text = 'YES';
                          }}
                        animation={{
                            enable: true,
                            duration: 2000,
                            delay: 0,
                        }}>
    </ProgressBarComponent><br></br>
    <ProgressBarComponent id={title}
                        type='Linear'
                        showProgressValue={true}
                        labelStyle={{color: '#FFFFFF'}}
                        trackThickness={24}
                        progressThickness={24}
                        minimum={0}
                        maximum={5}
                        value={progress.nbno}
                        textRender={(args) => {
                        args.text = 'NO';
                          }}
                        animation={{
                            enable: true,
                            duration: 2000,
                            delay: 0,
                        }}>
    </ProgressBarComponent></Fragment>}
        
    
        
          {auth.user.votes && <Fragment> 
                {auth.user.votes.map(v=> v.vote_request === _id) ? (                   
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
                 )}


            </Fragment>}
        </div>) 
    
}

      


    VotingRequest.propTypes = {
        request: PropTypes.array.isRequired,
        submitVote: PropTypes.func.isRequired,
        groupId: PropTypes.string.isRequired,
        auth:PropTypes.object.isRequired,
        getvoteprog: PropTypes.func.isRequired,


}
const mapStateToProps = state => ({
    auth: state.auth,
    progress: state.progress

});
export default connect(mapStateToProps,{submitVote,getvoteprog})(VotingRequest)

