import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import {connect} from 'react-redux'

import VoteProgress from './VoteProgress';

import {Accordion,Card,Button} from 'react-bootstrap'

const VotingHistory = ({
  
    request,   
    project
}) => {


    

    

    return (
     
        <div id={
            request._id
        }>
            

            
                <Accordion defaultActiveKey="1">
           <Card>
             <Card.Header>
               <Accordion.Toggle as={Button} variant="link" eventKey="0">
               <p>
                <strong><i class="fa fa-calendar" aria-hidden="true"></i> </strong>
                <Moment format='YYYY/MM/DD'>
                    {
                    request.dueDate
                }</Moment>
                <p id="nbjour"></p>
            </p>
               </Accordion.Toggle>
             </Card.Header>
             <Accordion.Collapse eventKey="0">
               <Card.Body><p>
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
            

            <VoteProgress request={request} project={project.numberOfStudents}/> 
            <p>{
                request.nbVote
            }
                &nbsp; vote(s)</p>
</Card.Body>
             </Accordion.Collapse>
           </Card>
           </Accordion>

               
        </div>
        
    );

} 
VotingHistory.propTypes = {
    request: PropTypes.array.isRequired, 
    project: PropTypes.array.isRequired
}
export default connect(null, {})(VotingHistory)
