import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import ProgressBar from 'react-bootstrap/ProgressBar';
const VoteProgress= ({auth,request:{yes,no,_id},project}) => {
    
    
 return (<div>
 { <Fragment>


    <div><i class="fa fa-thumbs-o-up" aria-hidden="true"></i> <ProgressBar now={yes} label={`${yes}`}  min={0} max={project}  /><br></br></div>

    <div><i class="fa fa-thumbs-o-down" aria-hidden="true"></i> <ProgressBar now={no} label={`${no}`}  min={0} max={project}  /></div>
 {/* <ProgressBarComponent id={_id}
                        type='Linear'
                        showProgressValue={true}
                        labelStyle={{color: '#FFFFFF'}}
                        
                        minimum={0}
                        maximum={project}
                        value={yes}
                        textRender={(args) => {
                        args.text = 'YES';
                          }}
                        animation={{
                            enable: true,
                            duration: 2000,
                            delay: 0,
                        }}>
    </ProgressBarComponent><br></br>
   <ProgressBarComponent id={_id+"ne"}
                        type='Linear'
                        showProgressValue={true}
                        labelStyle={{color: '#FFFFFF'}}
                        
                        minimum={0}
                        maximum={project}
                        value={no}
                        textRender={(args) => {
                        args.text = 'NO';
                          }}
                        animation={{
                            enable: true,
                            duration: 2000,
                            delay: 0,
                        }}>
    </ProgressBarComponent> */}

 </Fragment>}
 
        </div>) 
    
}
VoteProgress.propTypes = {     
        
        request: PropTypes.object.isRequired,
        project: PropTypes.number.isRequired



}
const mapStateToProps = state => ({
    auth: state.auth,

}); 
export default connect(mapStateToProps,{})(VoteProgress)

