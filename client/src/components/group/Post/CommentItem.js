import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Moment from 'react-moment'
import {deleteComment} from '../../../actions/post'
const CommentItem = ({
    postId,
    comment:{_id,text,name,avatar,user,date},auth,deleteComment,groupId
}) => {
   return( <div class="post bg-white p-1 my-1">
    <div>
      <Link to={`/profile/${user}`}>
      <div class="row">
      <div class="col-2 col-md-2">
      <div class="avatar">
      <img
          className="img-circle img-no-padding img-responsive"
          src={avatar}
          alt=""
        /></div></div>
      
      <div class="col-7 col-md-7">
        <h6>{name}</h6>
        </div></div>
      
      </Link>
    </div>
    <div>
      <p class="my-1">
        {text}</p>
       <p class="post-date">
          Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
      </p>
      {!auth.loading && user === auth.user._id && (
          <button onClick={e => deleteComment(postId,_id)} type ="button" className='btn-round btn-icon btn-danger btn-delete btn-sm'>
<i className="fas fa-times"></i>
          </button>
      )}
    </div>
  </div>)
}

CommentItem.propTypes = {
postId:PropTypes.number.isRequired,
comment:PropTypes.object.isRequired,
auth:PropTypes.object.isRequired,
deleteComment:PropTypes.func.isRequired,
}
const mapStateToProps=state => ({
    auth:state.auth
})
export default connect(mapStateToProps,{deleteComment}) (CommentItem)
