import React ,{Fragment,useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Spinner from '../../layout/spinner'
import {getPosts} from '../../../actions/post'
import PostItem from './PostItem'
import PostFrom from './PostFrom'

const Post = ({getPosts,post:{posts,loading},groupId}) => {
    useEffect(()=>{
        getPosts(groupId);

    },[getPosts,groupId])
    return (
        loading ? <Spinner /> :(<Fragment>
            <h1 className="large text-primary">Group Posts</h1>
            <p className="lead">
                <i className="fas fa-user"></i> Welcome
            </p>
           <PostFrom groupId={groupId}/>
           {posts.length > 0 ? (
               <div className="posts">
                {
                    posts.map(post=>(
                        <PostItem key={post._id} post={post} />
                    ))
                }

            </div>
           ) : (<h4> No Post Found</h4>)}
            
       
        </Fragment>)
    )
}

Post.propTypes = {
getPosts:PropTypes.func.isRequired,
post:PropTypes.object.isRequired,
groupId: PropTypes.string.isRequired

}

const mapStateToProps= state=> ({
    post:state.post
})

export default connect(mapStateToProps,{getPosts})(Post)
