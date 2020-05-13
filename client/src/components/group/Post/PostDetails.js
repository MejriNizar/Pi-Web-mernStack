import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import {connect } from 'react-redux'
import Spinner from '../../layout/spinner'
import {getPost} from '../../../actions/post'  
import { Link } from 'react-router-dom'
import PostItem from './PostItem'
import CommentForm from './CommentForm'
import CommentItem from './CommentItem'
const PostDetails = ({getPost,post:{post,loading},match}) => {
  useEffect(() => {
       
      getPost(match.params.id)
  }, [getPost,match.params.id])
  
    return loading || post ===null ? <Spinner /> : <Fragment>
        <PostItem post={post} showActions={false}/>
        <CommentForm postId={post._id}></CommentForm>
        <div className="comments">
            {post.comments.map(comm => (
                <CommentItem key={comm._id} comment={comm} postId={post._id}/>
            ))}
        </div>
        <Link to='/all-group' className='btn'>GO BACK</Link>
    </Fragment>
}

PostDetails.propTypes = {
getPost:PropTypes.func.isRequired,
}
const mapStateToProps = state =>({
    post:state.post
})
export default connect(mapStateToProps,{getPost})(PostDetails)
