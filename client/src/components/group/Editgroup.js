import React, {Fragment, useState,useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect } from 'react-redux'
import {editGroup,getgroup} from '../../actions/group'

const Editgroup = ({editGroup, history ,getgroup,group: {group,loading},match}) => {
    useEffect(()=>{
        getgroup(match.params.id);
        setFormData({
            name: loading || !group.name? '': group.name,
            logo: loading || !group.logo? '': group.logo,
            slogan: loading || !group.slogan? '': group.slogan,
        });
    }, [loading]);
   const [formData, setFormData] = useState({
       name:'',
       logo:'',
       slogan:'',
       
   });

   const {name, logo, slogan} = formData;

   const onChange=e=>setFormData({...formData, [e.target.name]: e.target.value});
  
    return (
        <Fragment>
             <h1 className="large text-primary">
       EDIT A PROJECT
      </h1>
      
      <small>* = required field</small>
      <form className="form" onSubmit={e => {
          e.preventDefault();
          editGroup(formData,history,true,match.params.id);
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

Editgroup.propTypes = {
    editGroup:PropTypes.func.isRequired,
    getgroup: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    group: state.group
});
export default connect(mapStateToProps,{editGroup,getgroup})(Editgroup)
