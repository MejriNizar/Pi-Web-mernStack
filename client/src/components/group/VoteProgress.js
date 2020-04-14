import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import {submitVote} from '../../actions/group'
import { RadioButtonComponent } from '@syncfusion/ej2-react-buttons';
import {connect} from 'react-redux'
import { ProgressBarComponent } from '@syncfusion/ej2-react-progressbar';

const VoteProgress= ({auth}) => {
    
    
 return (<div>
  <ProgressBarComponent id="linear"
                        type='Linear'
                        height='60'
                        value={40}
                        animation={{
                            enable: true,
                            duration: 2000,
                            delay: 0,
                        }}>
    </ProgressBarComponent><br></br>
    <ProgressBarComponent id="linearr"
                        type='Linear'
                        height='60'
                        value={40}
                        animation={{
                            enable: true,
                            duration: 2000,
                            delay: 0,
                        }}>
    </ProgressBarComponent>
        </div>) 
    
}

      


VoteProgress.propTypes = {
       
        auth:PropTypes.object.isRequired


}
export default connect(null,{})(VoteProgress)

