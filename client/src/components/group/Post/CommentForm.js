import React ,{useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {addComment} from '../../../actions/post'
const CommentForm = ({addComment,postId}) => {
    const [text,setText] = useState('');
    const onSubmit = e =>{
      if (e.key === 'Enter'){e.preventDefault();
            addComment(postId,{text});
            setText('');}
            
    }
    return (
        <div>
        
        <form className="form my-1">
          <textarea
            name="text"
            cols="30"
            rows="2"
            placeholder="leave a comment.."
            value={text}
            onChange={e => setText(e.target.value)}
            required
            onKeyPress={(e) => onSubmit(e)}
          ></textarea>
        </form>
      </div>
    )
}

CommentForm.propTypes = {
addComment:PropTypes.func.isRequired,
postId:PropTypes.object.isRequired,
}

export default connect(null,{addComment}) (CommentForm)
