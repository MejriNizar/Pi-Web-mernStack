import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import ProgressBar from 'react-bootstrap/ProgressBar';
const VoteProgress= ({request:{yes,no},project}) => {
    
    
 return (<div>
 { <Fragment>


    <div><i class="fa fa-thumbs-o-up" aria-hidden="true"></i> <ProgressBar now={yes} label={`${yes}`}  min={0} max={project}  /><br></br></div>

    <div><i class="fa fa-thumbs-o-down" aria-hidden="true"></i> <ProgressBar now={no} label={`${no}`}  min={0} max={project}  /></div>
 

 </Fragment>}
 
        </div>) 
    
}
VoteProgress.propTypes = {     
        
        request: PropTypes.object.isRequired,
        project: PropTypes.number.isRequired



}

export default connect(null,{})(VoteProgress)

