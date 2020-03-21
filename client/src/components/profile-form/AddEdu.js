import React, {Fragment, useState} from 'react'
import PropTypes from 'prop-types'
import {connect } from 'react-redux'
import {Link , withRouter} from 'react-router-dom'
import {addeducation} from '../../actions/profile'
const AddEdu = ({addeducation, history}) => {
   
   const [formData, setFormData] = useState({
       school:'',
       degree:'',
       fieldofstudy:'',
       from:'',
       to:'',
       current:false,
       description:'',
   });

   const [toDatedisabeld, toggleDisabeld] = useState(false);
   const {school, degree, fieldofstudy, from,to, current, description} = formData;

   const onChange=e=>setFormData({...formData, [e.target.name]: e.target.value});
    return (
        <Fragment>
             <h1 className="large text-primary">
       Add Any bootcamp or school
      </h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add your education
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={e => {
          e.preventDefault();
          addeducation(formData,history);
      }}>
        <div className="form-group">
          <input type="text" placeholder="* school" name="school" value={school} onChange={e => onChange(e)}  required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="* degree" name="degree" value={degree} onChange={e => onChange(e)}  required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="field of study" name="fieldofstudy"value={fieldofstudy} onChange={e => onChange(e)} />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" name="from" value={from} onChange={e => onChange(e)} />
        </div>
         <div className="form-group">
          <p><input type="checkbox" name="current" value={current} onChange={e => {
              setFormData({ ...formData, current: !current});
          toggleDisabeld(!toDatedisabeld)}}/> {' '} Current</p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input type="date" name="to" value={to} onChange={e => onChange(e)} disabled={toDatedisabeld? 'disabled' : ''} />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Program Description" value={description} onChange={e => onChange(e)}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <a className="btn btn-light my-1" href="dashboard.html">Go Back</a>
      </form>
        </Fragment>
    )
}

AddEdu.propTypes = {
addeducation:PropTypes.func.isRequired,
}

export default connect(null,{addeducation})(AddEdu)
