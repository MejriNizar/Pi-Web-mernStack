import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import {connect } from 'react-redux'
import Spinner from '../../layout/spinner'
import PostItems from'./PostItem'
import {getPost} from '../../../actions/post'  
import { Link } from 'react-router-dom'
import PostItem from './PostItem'
const PostDetails = ({getPost,post:{post,loading},match}) => {
  useEffect(() => {
       
      getPost(match.params.id)
  }, [getPost])
  
    return loading || post ===null ? <Spinner /> : <Fragment>
        <PostItem post={post} showActions={false}/>
        <Link to='/all-group' className='btn'></Link>
    </Fragment>
}

PostDetails.propTypes = {
getPost:PropTypes.func.isRequired,
}
const mapStateToProps = state =>({
    post:state.post
})
export default connect(mapStateToProps,{getPost})(PostDetails)
