import React, {Fragment, useState,useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect } from 'react-redux'
import {editGroup,getgroup} from '../../actions/group'
import {loadUsers} from '../../actions/auth'
import { MultiSelectComponent,CheckBoxSelection,Inject,MultiSelect } from '@syncfusion/ej2-react-dropdowns';
import  '../../assets/css/syncfusions.css';

const Editgroup = ({editGroup, history ,getgroup,group: {group,loading},match,loadUsers,users:{users}}) => {
    useEffect(()=>{
      loadUsers();
        getgroup(match.params.id);
        setFormData({
            name: loading || !group.name? '': group.name,
            logo: loading || !group.logo? '': group.logo,
            slogan: loading || !group.slogan? '': group.slogan,
            members: loading || !group.members? '': group.members
        });
    }, [loading]);
   const [formData, setFormData] = useState({
       name:'',
       logo:'',
       slogan:'',
       members:[]
       
   });
   const fields = {
    text: 'name', value: '_id'
  }
   const {name, logo, slogan,members} = formData;

   const onChange=e=>setFormData({...formData, [e.target.name]: e.target.value});
   const onChangeMembers=e=>setFormData({...formData, members: e});

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
        <MultiSelectComponent id="membersS" name="members"  dataSource={users} fields={fields} placeholder="Select a member" mode="CheckBox" selectAllText="Select All" unSelectAllText="unSelect All" showSelectAll={true} change={e => onChangeMembers(e.value)} >
        <Inject services={[CheckBoxSelection]} />
        </MultiSelectComponent>

        <input type="submit" className="btn btn-primary my-1" />
        <a className="btn btn-light my-1" href="dashboard.html">Go Back</a>
      </form>
        </Fragment>
    )
}

Editgroup.propTypes = {
    editGroup:PropTypes.func.isRequired,
    getgroup: PropTypes.func.isRequired,
    loadUsers: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    group: state.group,
    users: state.users

});

export default connect(mapStateToProps,{editGroup,getgroup,loadUsers})(Editgroup)
