import React, {useState, Fragment} from 'react'
import {Link, withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {addevent} from '../../actions/event';

const Addevent = ({addevent, history}) => {
    const [formData,setFormData] = useState({
        title:'',
        description:'',
        place:'',
        startDate:'',
        endDate:''

    });

    
    const {
        title,
        description,
        place,
        startDate,
        endDate
    }  = formData;
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})
   const onSubmit = e =>{
       e.preventDefault();
       addevent(formData,history)
   }
   
   return (
    <Fragment>
         <h1 className="large text-primary">
    Add new event
  </h1>
  <p className="lead">
    <i className="fas fa-user"></i> Let's get some information to make your
    event or workshop  </p>
  <small>* = required field</small>
  <form className="form" onSubmit= {e => onSubmit(e)}>
    <div className="form-group">
      
      <small className="form-text"></small >
    </div>
    <div className="form-group">
      <input type="text" placeholder="title" name="title" value={title} onChange={e => onChange(e)} />
      <small className="form-text">title of youe event</small >
    </div>
    <div className="form-group">
      <input type="text" placeholder="description" name="description" value={description} onChange={e => onChange(e)} />
      <small className="form-text"
        >general ideas about this event</small >
    </div>
    <div className="form-group">
      <input type="text" placeholder="place" name="place" value={place} onChange={e => onChange(e)}/>
      <small className="form-text">City & state suggested (eg. Boston, MA)</small>
    </div>
    <div className="form-group">
      <input type="date" placeholder="startDate" name="startDate" value={startDate} onChange={e => onChange(e)}/>
      <small className="form-text"></small>
    </div>
    <div className="form-group">
      <input type="date" placeholder="endDate" name="endDate" value={endDate} onChange={e => onChange(e)}/>
      <small className="form-text"></small>
    </div>

    
    <input type="submit" className="btn btn-primary my-1" />
    <a className="btn btn-light my-1" href="dashboard.html">Go Back</a>
  </form>
    </Fragment>
)
};

Addevent.propTypes = {
    Addevent: PropTypes.func.isRequired,
};

export default connect(null,{addevent}) (withRouter(Addevent));
