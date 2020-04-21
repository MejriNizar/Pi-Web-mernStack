import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import {submitVote} from '../../actions/group'
import { RadioButtonComponent } from '@syncfusion/ej2-react-buttons';
import {connect} from 'react-redux'
import { ProgressBarComponent } from '@syncfusion/ej2-react-progressbar';
import {getvoteprog} from '../../actions/group'

const VoteProgress= ({auth,_id,groupId,getvoteprog,progress:{progress,loading}}) => {
    
    useEffect(()=>{
        getvoteprog(groupId,_id);
        
    }, [loading]);
 return (<div>
 {progress && <Fragment>

    <ProgressBarComponent id={_id}
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
    <ProgressBarComponent id={_id+"ne"}
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
    </ProgressBarComponent>

 </Fragment>}
 
        </div>) 
    
}

      


VoteProgress.propTypes = {
       
        auth:PropTypes.object.isRequired,
        _id:PropTypes.string.isRequired,
        groupId: PropTypes.string.isRequired,
        getvoteprog: PropTypes.func.isRequired,


}
const mapStateToProps = state => ({
    auth: state.auth,
    progress: state.progress

}); 
export default connect(mapStateToProps,{getvoteprog})(VoteProgress)

