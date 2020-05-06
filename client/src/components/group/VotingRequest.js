import React, {Fragment, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import {submitVote,submitVoteMultipte} from '../../actions/group'
import {RadioButtonComponent, CheckBoxComponent} from '@syncfusion/ej2-react-buttons';
import {connect} from 'react-redux'
import VoteProgress from './VoteProgress';
import ProgressBar from 'react-bootstrap/ProgressBar';

const VotingRequest = ({
    auth,
    submitVote,
    submitVoteMultipte,
    request,
    groupId,
    loading,
    project
}) => {

    const [displayYes, setDisplayYes] = useState();
    const [displayNo, setDisplayNo] = useState();
    const [displayAll, setDisplayAll] = useState();
    const [disabled, setdisabled] = useState();

    const [disabledC1, setdisabledC1] = useState();
    const [disabledC2, setdisabledC2] = useState();
    const [disabledC3, setdisabledC3] = useState();


    useEffect(() => {
        auth.user.votes.map(v => {
            if (v.vote_request !== request._id) {
                setDisplayAll(true);
            } else if ((v.vote_request === request._id) && (v.response === 1)) {
                setDisplayAll(false);
                setDisplayYes(true);
                setdisabled(true);
            } else if ((v.vote_request === request._id) && (v.response === -1)) {
                setDisplayNo(true);
                setDisplayAll(false);
                setdisabled(true);
            }
            else{
                v.responseMultiple.map(vm => {
                    if(vm === 'choice1')
                    {
                        setdisabledC1(true);

                    }
                    else if(vm === 'choice2')
                    {
                        setdisabledC2(true);
                    }
                    else if(vm === 'choice3'){
                        setdisabledC3(true);
                    }
                })
            }

        })
        const today = new Date(Date.now());
        const d1 = new Date(request.dueDate);
        const d2 = new Date(today);
        const time_diff = d1 - d2;
        const diffDays = Math.round(time_diff / (1000 * 3600 * 24));
        console.log(d1)
        console.log(d2)
        console.log(diffDays)
        const dateDay = diffDays + 1;
        if(dateDay < 0)
        {
            
            document.getElementById(request._id).getElementsByTagName("P")[3].style.color = "red";
            document.getElementById(request._id).getElementsByTagName("P")[4].style.color = "red";
            document.getElementById(request._id).getElementsByTagName("P")[4].innerText = " vote deactivated."
        }else
        if (dateDay < 2) {
            
            document.getElementById(request._id).getElementsByTagName("P")[3].style.color = "red";
            document.getElementById(request._id).getElementsByTagName("P")[4].style.color = "red";
            document.getElementById(request._id).getElementsByTagName("P")[4].innerText = "you still have " + dateDay + " day(s) to vote ."
        } else {
            
            document.getElementById(request._id).getElementsByTagName("P")[3].style.color = "green";


        }
        if ((dateDay <= 0) || (request.nbVote === project.numberOfStudents)) {
            setdisabled(true);
            setdisabledC1(true);
            setdisabledC2(true);
            setdisabledC3(true);

        }
    }, [loading])

    const onChange = e => {
        console.log(e);
        submitVote(e, groupId, request._id);
        setdisabled(true);
    }
    const onChangeC1 = e => {
        console.log(e);
        if(e === true){submitVoteMultipte('choice1', groupId, request._id);
        setdisabledC1(true);}
    }
    const onChangeC2 = e => {
        console.log(e);
        if(e === true){submitVoteMultipte('choice2', groupId, request._id);
        setdisabledC2(true);}
    }
    const onChangeC3 = e => {
        console.log(e);
        if(e === true){submitVoteMultipte('choice3', groupId, request._id);
        setdisabledC3(true);}
        
    }

    return (
        <div id={
            request._id
        }>

            <p>
                <strong><i class="fa fa-user" aria-hidden="true"></i> </strong>
                {
                request.userName
            } </p>
            <p>
                <strong>Title:</strong>
                {
                request.title
            } </p>
            <p>
                <strong>Object:</strong>
                {
                request.object
            } </p>
            <p>
                <strong><i class="fa fa-calendar" aria-hidden="true"></i> </strong>
                <Moment format='YYYY/MM/DD'>
                    {
                    request.dueDate
                }</Moment>
                <p id="nbjour"></p>
            </p>
                { request.voteType === 'Simple choice' ? (<Fragment><VoteProgress request={request} project={project.numberOfStudents}/> 
            <p>{
                request.nbVote
            }
                &nbsp; vote(s)</p>
            {
            auth.user.votes && <Fragment> {
                displayYes && <div>
                    <RadioButtonComponent label="Yes"
                        name={
                            request._id
                        }
                        value="yes"
                        change={
                            e => onChange(e.value)
                        }
                        checked={true}
                        disabled={disabled}/>
                    &nbsp;&nbsp;&nbsp;
                    <RadioButtonComponent label="No"
                        name={
                            request._id
                        }
                        value="no"
                        change={
                            e => onChange(e.value)
                        }
                        disabled={disabled}/>
                      
                    <p>----------------------------------------------------------------</p>
                </div>
            }
                {
                displayNo && <div>
                    <RadioButtonComponent label="Yes"
                        name={
                            request._id
                        }
                        value="yes"
                        change={
                            e => onChange(e.value)
                        }
                        disabled={disabled}/>&nbsp;&nbsp;&nbsp;
                    <RadioButtonComponent label="No"
                        name={
                            request._id
                        }
                        value="no"
                        change={
                            e => onChange(e.value)
                        }
                        checked={true}
                        disabled={disabled}/>
                      
                    <p>----------------------------------------------------------------</p>
                </div>
            }
                {
                displayAll && <div>
                    <RadioButtonComponent label="Yes"
                        name={
                            request._id
                        }
                        value="yes"
                        change={
                            e => onChange(e.value)
                        }
                        disabled={disabled}/>&nbsp;&nbsp;&nbsp;
                    <RadioButtonComponent label="No"
                        name={
                            request._id
                        }
                        value="no"
                        change={
                            e => onChange(e.value)
                        }
                        disabled={disabled}/>
                     
                    <p>----------------------------------------------------------------</p>
                </div>
            } 
            </Fragment>
        }
            </Fragment>):(<Fragment>
                
            
                <ul>
                <li><CheckBoxComponent label={request.choice1.label} value={request.choice1.label} change={
                            e => onChangeC1(e.checked)
                        }
                        disabled={disabledC1}
                        /> <ProgressBar now={request.choice1.result}   min={0} max={project.numberOfStudents}  /></li>
                <li><CheckBoxComponent label={request.choice2.label} value={request.choice2.label} change={
                            e => onChangeC2(e.checked)
                        }
                        disabled={disabledC2}
                        /> <ProgressBar now={request.choice2.result}   min={0} max={project.numberOfStudents}  /></li>
                <li><CheckBoxComponent label={request.choice3.label} value={request.choice3.label} change={
                            e => onChangeC3(e.checked)
                        }
                        disabled={disabledC3}
                        /> <ProgressBar now={request.choice3.result}   min={0} max={project.numberOfStudents}  /></li>

                </ul>
                <p>----------------------------------------------------------------</p>
             

            
            

            </Fragment>)
}
            

        </div>
    )

} 
VotingRequest.propTypes = {
    request: PropTypes.array.isRequired,
    submitVote: PropTypes.func.isRequired,
    groupId: PropTypes.string.isRequired,
    auth: PropTypes.object.isRequired,
    project: PropTypes.array.isRequired,
    submitVoteMultipte: PropTypes.func.isRequired

}
const mapStateToProps = state => ({auth: state.auth});
export default connect(mapStateToProps, {submitVote,submitVoteMultipte})(VotingRequest)
