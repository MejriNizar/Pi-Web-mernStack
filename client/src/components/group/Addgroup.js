import React, {Fragment, useState,useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect } from 'react-redux'
import {addGroup} from '../../actions/group'

const Addgroup = ({addGroup, history}) => {

   const [formData, setFormData] = useState({
       name:'',
       logo:'',
       slogan:''
       
   });

   const {name, logo, slogan} = formData;

   const onChange=e=>setFormData({...formData, [e.target.name]: e.target.value});
   
    return (
        <Fragment>
             <h1 className="large text-primary">
       ADD A GROUP
      </h1>
      
      <small>* = required field</small>
      <form className="form" onSubmit={e => {
          e.preventDefault();
          addGroup(formData,history);
      }}>
        <div className="form-group">
          <input type="text" placeholder="* name" name="name" value={name} onChange={e => onChange(e)}  required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="* logo" name="logo" value={logo} onChange={e => onChange(e)}  required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="* slogan" name="slogan" value={slogan} onChange={e => onChange(e)}  required />
        </div>
        

        <input type="submit" className="btn btn-primary my-1" />
        <a className="btn btn-light my-1" href="dashboard.html">Go Back</a>
      </form>
        </Fragment>
    )
}

Addgroup.propTypes = {
    addGroup:PropTypes.func.isRequired,
}

export default connect(null,{addGroup})(Addgroup)
