import React, {Fragment, useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {invitMember} from '../../actions/group'
import {loadStudents, loadStudent} from '../../actions/auth'
import {
    MultiSelectComponent,
    CheckBoxSelection,
    Inject
} from '@syncfusion/ej2-react-dropdowns';
import '../../assets/css/syncfusions.css';
import Spinner from '../layout/spinner'


const Addmembers = ({
    invitMember,
    history,
    loadStudents,
    students: {
        students,
        loading
    },
    
    match
}) => {
    const [skillsData] = useState({skills:match.params.Skills});
 
    
    useEffect(() => {
        console.log(match.params.Skills);
        // setskillsData({
        //     ...skillsData,
        //     skills: match.params.Skills
        // });
        loadStudents(skillsData);
        

    }, [loadStudents,skillsData]);
    const [formData, setFormData] = useState({members: []});

    const {
       
        members,
       
    } = formData;
    const fields = {
        text: 'user.name',
        value: 'user._id'
    }
    const fields1 = {
        text: 'name',
        value: '_id'
    }
   
    const onChangeMembers = e => setFormData({
        ...formData,
        members: e
    });
   
      
    return  loading || students === null ?<Spinner /> :(
        <Fragment>
            <h1 className="large text-primary">
                ADD MEMBERS
            </h1>

            <small>* = required field</small>
            <form className="form"
                onSubmit={
                    e => {
                        e.preventDefault();
                        invitMember(formData, history,true,match.params.id);
                    }
            }>
               { match.params.Skills ?( <MultiSelectComponent id="membersS" name="members"
                        dataSource={students}
                        fields={fields}
                        placeholder="Select members"
                        mode="CheckBox"
                        selectAllText="Select All"
                        unSelectAllText="unSelect All"
                        showSelectAll={true}
                        maximumSelectionLength={match.params.nbS}
                        change={
                            e => onChangeMembers(e.value)
                    }
                       
                    >
                        <Inject services={
                            [CheckBoxSelection]
                        }/>
                    </MultiSelectComponent>):(<MultiSelectComponent id="membersS" name="members"
                        dataSource={students}
                        fields={fields1}
                        placeholder="Select members"
                        mode="CheckBox"
                        selectAllText="Select All"
                        unSelectAllText="unSelect All"
                        showSelectAll={true}
                        maximumSelectionLength={match.params.nbS}
                        change={
                            e => onChangeMembers(e.value)
                    }
                       
                    >
                        <Inject services={
                            [CheckBoxSelection]
                        }/>
                    </MultiSelectComponent>)}
                    
           
            
                <input type="submit" className="btn btn-primary my-1"/>
                <a className="btn btn-light my-1" href="dashboard.html">Go Back</a>
            </form>
        </Fragment>
    )
} 
Addmembers.propTypes = {
    loadStudents: PropTypes.func.isRequired,
    invitMember: PropTypes.func.isRequired
    
}
const mapStateToProps = state => ({students: state.students});
export default connect(mapStateToProps, {invitMember, loadStudents})(Addmembers)
