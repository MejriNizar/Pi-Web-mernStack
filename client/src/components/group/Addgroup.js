import React, {Fragment, useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {addGroup} from '../../actions/group'
//import { ImagePicker } from 'react-filepicker'
//react-filepicker
import '../../assets/css/syncfusions.css';
import { passportJwtSecret } from 'jwks-rsa'



const Addgroup = ({
    addGroup,
    history,
    project:{project , loading},
    match
  
}) => {
   
    const [formData, setFormData] = useState({name: '', slogan: ''});
    const [file,setFile]=useState('');
    const [filename,setFilename]=useState('Choose Logo')
    const {
        name,
      
        slogan
       
    } = formData;
    const onChangeFile= e =>{
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
    }
    const onChange = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
        
    }) ;
    
  
    return (
        <Fragment>
            <h1 className="large text-primary">
                ADD A GROUP
            </h1>

            <small>* = required field</small>
            <form className="form"
                onSubmit={
                    e => {
                        e.preventDefault();
                        const form = new FormData();
                        form.set('name',name);
                        form.set('slogan',slogan);
                        form.set('logo',file)
                        form.append('file',file);

                        addGroup(form, history,false,match.params.id);

                    }
            }>
                <div className="form-group">
                    <input type="text" placeholder="* name" name="name"
                        value={name}
                        onChange={
                            e => onChange(e)
                        }
                        required/>
                </div>
                <div className="form-group">
        <div className='custom-file mb4'>
        <input  type="file"
  className="custom-file-input" id="customFile"
  
  onChange={
      e => onChangeFile(e)
  }
  required></input>
              <label className="custom-file-label" htmlFor="customFile"  >{filename}</label>  </div>  
 
                </div>

                <div className="form-group">
                    <input type="text" placeholder="* slogan" name="slogan"
                        value={slogan}
                        onChange={
                            e => onChange(e)
                        }
                        required/>
                </div>
                
               
                
                <input type="submit" className="btn btn-primary my-1"/>
                <a className="btn btn-light my-1" href="dashboard.html">Go Back</a>
            </form>
        </Fragment>
    )
} 
Addgroup.propTypes = {
    addGroup: PropTypes.func.isRequired,
    project: passportJwtSecret
}
const mapStateToProps = state => ({
    project: state.project
});
export default connect(mapStateToProps, {addGroup})(Addgroup)
