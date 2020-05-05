import React from 'react'
import PropTypes from 'prop-types'

const GroupTop = ({group:{
    name,
    logo,
    slogan,
    

}}) => {
    return (
        <div className="profile-top bg-dark-group p-2">
          <img
            className="round-img my-1"
            src={logo}
            alt=""
          />
          <h1 className="large">{name}</h1>
          <p>{slogan && <span>{slogan}</span>}</p>
          
        </div>
    )
}

GroupTop.propTypes = {
group:PropTypes.object.isRequired,
}

export default GroupTop
