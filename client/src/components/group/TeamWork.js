import React from 'react'
import PropTypes from 'prop-types'
import Board from 'react-trello'
import {addTask} from '../../actions/tasks'
import { connect } from 'react-redux'
import { useState } from 'react'
const TeamWork = ({group:{group,loading},addTask}) => {
    const [title,setTitle]=useState('Task');
    const onChangeFile= e =>{
        setTitle(e.target.value);
       
    }
    const data = {
        lanes: [
            {
                id: 'lane0',
                title: 'Open tasks',
                label: '2/2',
                cards: [
                  {id: 'Card1', title: 'Write Blog', description: 'Can AI make memes', label: '30 mins'},
                  {id: 'Card2', title: 'Pay Rent', description: 'Transfer via NEFT', label: '5 mins', metadata: {sha: 'be312a1'}}
                ]
              },
          {
            id: 'lane1',
            title: 'Planned Tasks', 
            label: '2/2',
            cards: [
              {id: 'Card1', title: 'Write Blog', description: 'Can AI make memes', label: '30 mins'},
              {id: 'Card2', title: 'Pay Rent', description: 'Transfer via NEFT', label: '5 mins', metadata: {sha: 'be312a1'}}
            ]
          },
          {
            id: 'lane2',
            title: 'Completed',
            label: '0/0',
            cards: []
          }
        ]
      }
    return (
        <div className="bg-dark">
            <form onSubmit={e=> {
             const form = new FormData();
             form.set('name',title);
                addTask(group._id,group.project._id,form)}} >
            <h4>Add new Task</h4>
            <input type="text" placeholder={title} onChange={
      e => onChangeFile(e)
  }
  value={title}
  required></input>
            <button type="submit" className="btn-round btn-icon" color="primary">Add</button>
            </form>
            <Board data={data} />
        </div>
    )
}

TeamWork.propTypes = {
    addTask:PropTypes.func.isRequired,
    group:PropTypes.object.isRequired,

}
const mapStateToProps = state => ({
    group: state.group,
   

});
export default connect(mapStateToProps,{addTask})(TeamWork)
