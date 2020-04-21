import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import {submitVote} from '../../actions/group'
import { RadioButtonComponent } from '@syncfusion/ej2-react-buttons';
import {connect} from 'react-redux'
import {ProgressBarComponent} from '@syncfusion/ej2-react-progressbar';
import VoteProgress from './VoteProgress';
import { red, green } from '@material-ui/core/colors';

const VotingRequest= ({auth,submitVote,request,groupId,loading}) => {

    const [displayYes, setDisplayYes] = useState();
    const [displayNo, setDisplayNo] = useState();
    const [displayAll, setDisplayAll] = useState(false);

    useEffect(() => {
        auth.user.votes.map(v=> {
            if (v.vote_request === request._id) {
                setDisplayAll(false);
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
        const today = new Date(Date.now());        
        const d1=new Date(request.dueDate);
        const d2=new Date(today);
        const time_diff = d1.getTime() - d2.getTime();
        const diffDays = time_diff / (1000 * 3600 * 24);
        console.log(d1)
        console.log(d2)
        console.log(diffDays)
        if(diffDays < 2){
            document.getElementById(request._id).getElementsByTagName("P")[0].style.color = "red";
            document.getElementById(request._id).getElementsByTagName("P")[1].style.color = "red";
            document.getElementById(request._id).getElementsByTagName("P")[2].style.color = "red";
            document.getElementById(request._id).getElementsByTagName("P")[3].style.color = "red";
        }
        else{
            document.getElementById(request._id).getElementsByTagName("P")[0].style.color = "green";
            document.getElementById(request._id).getElementsByTagName("P")[1].style.color = "green";
            document.getElementById(request._id).getElementsByTagName("P")[2].style.color = "green";
            document.getElementById(request._id).getElementsByTagName("P")[3].style.color = "green";
           
        }
    }, [loading])
    
    const onChange = e => { 
        console.log(e);   
            submitVote(e,groupId,request._id);
    }
    
 return (<div id={request._id}>
  
        <p >
        <strong>User Name:</strong> {request.userName}
        </p>
        <p >
        <strong>Title:</strong> {request.title}
        </p>
        <p >
        <strong>Object:</strong> {request.object}
        </p>
        <p >
        <strong>Due Date:</strong> <Moment format='YYYY/MM/DD'>{request.dueDate}</Moment>
        <p id="nbjour"></p>
        </p>
        
            <VoteProgress request={request} />
        
    
        
          {auth.user.votes && <Fragment> 
                {displayYes && <div>
                        <RadioButtonComponent label="Yes" name={request._id}  value="yes" change={e => onChange(e.value)} checked={true} /> &nbsp;&nbsp;&nbsp;
                         <RadioButtonComponent label="No" name={request._id}  value="no" change={e => onChange(e.value)}/>
                         <p>----------------------------------------</p>
                          </div> }
                {displayNo && <div>
                    <RadioButtonComponent label="Yes" name={request._id}  value="yes" change={ e => onChange(e.value)} />&nbsp;&nbsp;&nbsp;
                    <RadioButtonComponent label="No" name={request._id}  value="no" change={ e => onChange(e.value) } checked={true}/>
                    <p>----------------------------------------</p>
                    </div>
                    }
                


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

