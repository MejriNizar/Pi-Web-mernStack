import React, {Fragment, useState,useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect } from 'react-redux'
import {editProject,getproject} from '../../actions/project'
import {getalldocs} from '../../actions/documentation'

const EditProject = ({editProject, history, getalldocs ,getproject,docs: {docs,loading},project: {project},match}) => {
    useEffect(()=>{
        getalldocs();
        getproject(match.params.id);
        setFormData({
            name: loading || !project.name? '': project.name,
            description: loading || !project.description? '': project.description,
            startDate: loading || !project.startDate? '': project.startDate,
            endDate: loading || !project.endDate? '': project.endDate,           
        });
    }, [loading]);
   const [formData, setFormData] = useState({
       name:'',
       description:'',
       startDate:'',
       endDate:'',
       
   });
   const [dispalaySocialInputs, toggleSocialInputs] = useState(false);

   const {name, description, startDate, endDate} = formData;

   const onChange=e=>setFormData({...formData, [e.target.name]: e.target.value});
   let options = docs.map((d) =>
                <option 
                    key={d.id}
                    value={d.id}
                >
                    {d.label}
                </option>
            );
    return (
        <Fragment>
             <h1 className="large text-primary">
       EDIT A PROJECT
      </h1>
      
      <small>* = required field</small>
      <form className="form" onSubmit={e => {
          e.preventDefault();
          editProject(formData,history,true,match.params.id);
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
          ></textarea>
        </div>
        <div className="form-group">
        <h4>* Start Date</h4>
          <input type="date" name="startDate" value={startDate} onChange={e => onChange(e)} />
        </div>
        <div className="form-group">
        <h4>* End Date</h4>
          <input type="date" name="endDate" value={endDate} onChange={e => onChange(e)} />
        </div>
        <div className="my-2">
      <button onClick={() => toggleSocialInputs(!dispalaySocialInputs)} type="button" className="btn btn-light">
        Add Documentation
      </button>
      <span>Optional</span>
    </div>
{dispalaySocialInputs && <Fragment>
    <select name="documentation" className="custom-search-select" onChange={e => onChange(e)}>
                <option>Select Item</option>
                {options}
           </select>
</Fragment>}
        <input type="submit" className="btn btn-primary my-1" />
        <a className="btn btn-light my-1" href="dashboard.html">Go Back</a>
      </form>
        </Fragment>
    )
}

EditProject.propTypes = {
    editProject:PropTypes.func.isRequired,
    getalldocs:PropTypes.func.isRequired,
    getproject: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    docs: state.docs,
    project: state.project
});
export default connect(mapStateToProps,{editProject,getalldocs,getproject})(EditProject)
