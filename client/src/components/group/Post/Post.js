import React ,{Fragment,useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Spinner from '../../layout/spinner'
import {getPosts} from '../../../actions/post'
import PostItem from './PostItem'

const Post = ({getPosts,post:{posts,loading}}) => {
    useEffect(()=>{
        getPosts();

    },[getPosts])
    return (
        loading ? <Spinner /> :(<Fragment>
            <h1 className="large text-primary">Group Posts</h1>
            <p className="lead">
                <i className="fas fa-user"></i> Welcome
            </p>
            {/**PostForm/ */}
            <div className="posts">
                {
                    posts.map(post=>(
                        <PostItem key={post._id} post={post} />
                    ))
                }

            </div>
       
        </Fragment>)
    )
}

Post.propTypes = {
getPosts:PropTypes.func.isRequired,
post:PropTypes.object.isRequired,
}

const mapStateToProps= state=> ({
    post:state.post
})

export default connect(mapStateToProps,{getPosts})(Post)
