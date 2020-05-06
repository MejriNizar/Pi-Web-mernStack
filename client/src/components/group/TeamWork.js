import React from 'react'
import PropTypes from 'prop-types'
import Board from 'react-trello'
const TeamWork = props => {
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
        <div>
            <Board data={data} />
        </div>
    )
}

TeamWork.propTypes = {

}

export default TeamWork
