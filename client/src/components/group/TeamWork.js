import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Board,{onDataChange} from 'react-trello'
import {addTask,GetTasks} from '../../actions/tasks'
import { connect } from 'react-redux'
import { useState } from 'react'
const TeamWork = ({group:{group,loading},addTask,GetTasks,tasks:{tasks}}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    delai:0

});

  useEffect(()=>{
    GetTasks(group._id);
     
  }, [loading]);
  const {
    name,
    description,
    delai,
    
} = formData;
const onChange = e => setFormData({
  ...formData,
  [e.target.name]: e.target.value
});
const cardsOpen =[];
const cardsPlanned=[];
const cardCompleted=[];

  if(tasks !== null){
    tasks.map(t=>{
      if(t.etat === 'open')
      {
        cardsOpen.push({id : t._id,title:t.name,description:t.description,label:t.delai+" Jours"})
      }
      else if(t.etat === 'planned')
      {
        cardsPlanned.push({id : t._id,title:t.name,description:t.description,label:t.delai+" Jours"})
      }else 
      {
        cardCompleted.push({id : t._id,title:t.name,description:t.description,label:t.delai+" Jours"})
      }
    })
  }
const total = cardsOpen.length+cardCompleted.length+cardsPlanned.length;
    
      
    const data = {
        lanes: [
            {
                id: 'lane0',
                title: 'Open tasks',
                label: cardsOpen.length +"/"+ total,
                cards: cardsOpen
              },
          {
            id: 'lane1',
            title: 'Planned Tasks', 
            label: cardsPlanned.length+"/"+ total,
            cards: cardsPlanned
            
          },
          {
            id: 'lane2',
            title: 'Completed',
            label: cardCompleted.length+"/"+ total,
            cards: cardCompleted
          },
        ]
      }
      
    return (
        <div className="bg-dark">
            <form onSubmit={e=> {
             e.preventDefault();
                addTask(group._id,group.project._id,formData)}} >
            <h4>Add new Task</h4>
            <div class="form-group">
<input type="text" placeholder="Title" value={name} name="name" onChange={
            e => onChange(e)
  }
  required></input>
            </div>
            <div class="form-group">
               <textarea
            name="text"
            cols="30"
            rows="2"
            placeholder="Description..."
            value={description}
            name="description"
            onChange={e => onChange(e)}
               
          ></textarea>
            </div>
            <div class="form-group">
                <input type="number" placeholder="Delai" name="delai" value={delai} onChange={
            e => onChange(e)
  }
  required></input>
            </div>
            
  
                    

            <button type="submit" className="btn-round btn-icon" color="primary">Add</button>
            </form>
            
            <Board data={data} />
        </div>
    )
}

TeamWork.propTypes = {
    addTask:PropTypes.func.isRequired,
    group:PropTypes.object.isRequired,
    GetTasks: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    group: state.group,
    tasks: state.tasks

});
export default connect(mapStateToProps,{addTask,GetTasks})(TeamWork)
