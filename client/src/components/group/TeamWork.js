import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import Board,{onDataChange} from 'react-trello'
import {addTask,GetTasks,EditEtat,deleteTask} from '../../actions/tasks'
import { connect } from 'react-redux'
import { useState } from 'react'
import GroupActions from './GroupActions'
const TeamWork = ({group:{group,loading},addTask,EditEtat,GetTasks,deleteTask,tasks:{tasks}}) => {
 

  useEffect(()=>{
    GetTasks(group._id);
     
  }, [loading]);
 
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
      const handleDragStart = (cardId, laneId) => {
        console.log('drag started')
        console.log(`cardId: ${cardId}`)
        console.log(`laneId: ${laneId}`)
      }

      const handleDragEnd = (cardId, sourceLaneId, targetLaneId, position, card) => {
        console.log('drag ended')
        console.log(`cardId: ${cardId}`)
        console.log(`sourceLaneId: ${sourceLaneId}`)
        console.log(`targetLaneId: ${targetLaneId}`)
        console.log(`newPosition: ${position}`)
        console.log(`cardDetails:`)
        console.log(card)
        if(targetLaneId === 'lane0')
        {
          EditEtat(cardId,group._id,"open")
        }
        else if(targetLaneId === 'lane1')
        {
          EditEtat(cardId,group._id,"planned")
        }
        else
        {
          EditEtat(cardId,group._id,"completed")
        }
      }

      const handleLaneDragStart = laneId => {
        console.log(`lane drag started for ${laneId}`)
      }

      const handleLaneDragEnd = (removedIndex, addedIndex, {id}) => {
        console.log(`lane drag ended from position ${removedIndex} for laneId=${id}`)
        console.log(`New lane position: ${addedIndex}`)
      }
      const onCardDelete = (cardId, laneId) => {
        console.log(`cardId: ${cardId}`)
        deleteTask(cardId,group._id)
      }
      let dataForm=null;
      const handleCardAdd = (card, laneId) => {
        console.log(`New card added to lane ${laneId}`)
        console.log(card.id)
        if(laneId === 'lane0')
        {
          dataForm = {name:card.title,description:card.title,delai:card.label,etat:'open'}
         
          console.log(dataForm)
        
        }
        else if(laneId === 'lane1')
        {
          dataForm = {name:card.title,description:card.title,delai:card.label,etat:'planned'}

            
          
        }
        else
        {
          dataForm = {name:card.title,description:card.title,delai:card.label,etat:'completed'}

        }
        addTask(group._id,group.project._id,dataForm)
      }
      const shouldReceiveNewData = nextData => {
        console.log('Board has changed')
        console.log(nextData)
      }
      
    return (
      <Fragment>
      <GroupActions group= {group} />
        <div className="profile-vote bg-light p-2">
            <Board data={data} 
          handleDragStart={handleDragStart}
          handleDragEnd={handleDragEnd}
          handleLaneDragStart={handleLaneDragStart}
          handleLaneDragEnd={handleLaneDragEnd}
          onCardDelete={onCardDelete}
          onCardAdd={handleCardAdd}
          onDataChange={shouldReceiveNewData}
          editable
            />
        </div>
        </Fragment>
    )
}

TeamWork.propTypes = {
    addTask:PropTypes.func.isRequired,
    group:PropTypes.object.isRequired,
    GetTasks: PropTypes.func.isRequired,
    EditEtat: PropTypes.func.isRequired,
    deleteTask:PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    group: state.group,
    tasks: state.tasks

});
export default connect(mapStateToProps,{addTask,GetTasks,EditEtat,deleteTask})(TeamWork)
