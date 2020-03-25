import React, {Fragment, useState,useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect } from 'react-redux'
import {addProject,getproject} from '../../actions/project'
import {getalldocs} from '../../actions/documentation'
import { MultiSelectComponent, Inject, CheckBoxSelection } from '@syncfusion/ej2-react-dropdowns'

const Addproject = ({addProject, history, getalldocs ,docs: {docs,loading}}) => {
    useEffect(()=>{
        getalldocs();
       
        
    }, [loading]);
   const [formData, setFormData] = useState({
       name:'',
       description:'',
       startDate:'',
       endDate:'',
       documentation:''
       
   });
   const [dispalaySocialInputs, toggleSocialInputs] = useState(false);

   const {name, description, startDate, endDate,documentation} = formData;
   const fields = {
    text: 'label', value: '_id'
  }
   const onChange=e=>setFormData({...formData, [e.target.name]: e.target.value});
   const onChangeDoc=e=>setFormData({...formData, documentation: e});

    return (
        <Fragment>
             <h1 className="large text-primary">
       ADD A PROJECT
      </h1>
      
      <small>* = required field</small>
      <form className="form" onSubmit={e => {
          e.preventDefault();
          addProject(formData,history);
      }}>
        <div className="form-group">
          <input type="text" placeholder="* name" name="name" value={name} onChange={e => onChange(e)}  required />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Description" value={description} onChange={e => onChange(e)}
            required
          ></textarea>
        </div>
        <div className="form-group">
        <h4>* Start Date</h4>
          <input type="date" name="startDate" value={startDate} onChange={e => onChange(e)} required/>
        </div>
        <div className="form-group">
        <h4>* End Date</h4>
          <input type="date" name="endDate" value={endDate} onChange={e => onChange(e)} required/>
        </div>
        <div className="my-2">
      <button onClick={() => toggleSocialInputs(!dispalaySocialInputs)} type="button" className="btn btn-light">
        Add Documentation
      </button>
      <span>Optional</span>
    </div>
{dispalaySocialInputs && <Fragment>
  <MultiSelectComponent id="doc" name="documentation"  dataSource={docs} fields={fields} placeholder="Select a documentation" mode="CheckBox" selectAllText="Select All" unSelectAllText="unSelect All" showSelectAll={true} change={e => onChangeDoc(e.value)} >
        <Inject services={[CheckBoxSelection]} />
        </MultiSelectComponent>
</Fragment>}
        <input type="submit" className="btn btn-primary my-1" />
        <a className="btn btn-light my-1" href="dashboard.html">Go Back</a>
      </form>
        </Fragment>
    )
}

Addproject.propTypes = {
    addProject:PropTypes.func.isRequired,
    getalldocs:PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
    docs: state.docs,
});
export default connect(mapStateToProps,{addProject,getalldocs})(Addproject)
