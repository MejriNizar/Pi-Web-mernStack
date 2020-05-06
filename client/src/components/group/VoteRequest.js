import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {connect } from 'react-redux'
import {SendVoteRequest} from '../../actions/group'
import {DropDownListComponent} from '@syncfusion/ej2-react-dropdowns'


const VoteRequest= ({SendVoteRequest,groupId,project}) =>{
    const [formData, setFormData] = useState({
        title:'',
        object:'',
        dueDate:'',
        choice1:'',
        choice2:'',
        choice3:''
     
    });
    const [displayMultiple, setMultiple] = useState(false);
    const {title,object,votingSystem,dueDate,voteType,choice1,choice2,choice3} = formData;
    const votetype = ['Dictatorship', 'Absolute Majority', '2/3 Unanimite', 'Veto right'];
    const votetype1 = ['Multiple choice', 'Simple choice'];
    const onChange=e=>setFormData({...formData, [e.target.name]: e.target.value});
    const onChangeVote = e => setFormData({
        ...formData,
        votingSystem: e
    });   
    const onChangeType = e => {
        setFormData({
        ...formData,
        voteType: e
    })
    if(e === 'Multiple choice')
    {
        setMultiple(true);
    }
};
        return (<div className="profile-vote bg-light p-2">
        <form className="form" onSubmit={e => {
          e.preventDefault();
          
          SendVoteRequest(groupId,formData);
      }}>
        
        <strong></strong>
        <div className="form-group">
                    <input type="text" placeholder="* Title" name="title"
                        value={title}
                        onChange={
                            e => onChange(e)
                        }
                        required/>
                </div>
        <textarea
            name="object"
            cols="100"
            rows="4"
            placeholder="suggest a vote ..." value={object} onChange={e => onChange(e)} 
          ></textarea>
          <div className="form-group">
                    <h4>* Due Date</h4>
                    <input type="date" name="dueDate"
                        value={dueDate}
                        onChange={
                            e => onChange(e)
                        }
                        required/>
                </div>
                {project.votingSystem === 'Free' ? (<div className="form-group">
                        <DropDownListComponent id="dlelement"
                            dataSource={votetype}
                            placeholder="Select a voting system"
                            change={
                                e => onChangeVote(e.value)
                            }/>
                    </div>) : (<div> <p>Voting System : &nbsp; {project.votingSystem}</p></div>)}
                    <div className="form-group">
                    <h4>* Vote Type</h4>
                    <DropDownListComponent id="typeelement"
                            dataSource={votetype1}
                            placeholder="Select a voting type"
                            change={
                                e => onChangeType(e.value)
                            }/>
                            </div>
                            {displayMultiple && 
                                <div className="form-group">
                                <input type="text" placeholder="Choice" name="choice1"
                                        value={choice1}
                                        onChange={e => onChange(e)}           
                                        
                                        />
                                <input type="text" placeholder="Choice" name="choice2"
                                        value={choice2}
                                        onChange={e => onChange(e)}           
                                        
                                        />
                                <input type="text" placeholder="Choice" name="choice3"
                                        value={choice3}
                                        onChange={e => onChange(e)}           
                                        
                                        />
                          
                                   
                                   
                                </div>
                            }
        
        <input type="submit" className="btn btn-primary my-1" />
        
      </form>
        
   
        </div>
    )

}
    VoteRequest.propTypes = {
        SendVoteRequest: PropTypes.func.isRequired,
        groupId: PropTypes.object.isRequired,
        project: PropTypes.array.isRequired
}

export default connect(null,{SendVoteRequest})((VoteRequest))