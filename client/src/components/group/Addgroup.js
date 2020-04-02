import React, {Fragment, useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {addGroup} from '../../actions/group'
import { ImagePicker } from 'react-file-picker'

import '../../assets/css/syncfusions.css';
import { passportJwtSecret } from 'jwks-rsa'



const Addgroup = ({
    addGroup,
    history,
    project:{project , loading},
    match
  
}) => {
   
    const [formData, setFormData] = useState({name: '', logo: '', slogan: ''});

    const {
        name,
        logo,
        slogan
       
    } = formData;
    
    const onChange = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
    
    
   

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
                        addGroup(formData, history,false,match.params.id);

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
                          <ImagePicker
    extensions={['jpg', 'jpeg', 'png']}
    dims={{minWidth: 100, maxWidth: 500, minHeight: 100, maxHeight: 500}}
    name="logo"
    value={logo}
    onChange={
        e => onChange(e)
    }
    required></ImagePicker>
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
