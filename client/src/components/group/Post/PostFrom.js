import React , {useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {addPost} from '../../../actions/post'
const PostFrom = ({addPost,groupId}) => {
    const [text,setText] = useState('');
    return (
        <div className="post-form">
        <div>
          <h3>Create post</h3>
        </div>
        <form className="form my-1" onSubmit={e=>{
            e.preventDefault();
            addPost({text},groupId);
            setText('');
        }}>
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Create a post"
            value={text}
            onChange={e => setText(e.target.value)}
            required
          ></textarea>
          <input type="submit" className="btn btn-primary my-1" value="Submit" />
        </form>
      </div>
    )
}

PostFrom.propTypes = {
addPost:PropTypes.func.isRequired,
groupId: PropTypes.string.isRequired


}

export default connect(null,{addPost})(PostFrom)
