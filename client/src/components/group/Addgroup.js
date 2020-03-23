import React, {Fragment, useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {addGroup} from '../../actions/group'
import {
    MultiSelectComponent,
    CheckBoxSelection,
    Inject,
    MultiSelect,
    DropDownListComponent
} from '@syncfusion/ej2-react-dropdowns';
import '../../assets/css/syncfusions.css';
import { SwitchComponent } from '@syncfusion/ej2-react-buttons';
import { Link, Redirect } from 'react-router-dom';


const Addgroup = ({
    addGroup,
    history,
    group:{group , loading}
  
}) => {
    useEffect(()=>{
        
    }, [loading]);
    const [formData, setFormData] = useState({name: '', logo: '', slogan: '', skills:false});

    const {
        name,
        logo,
        slogan,
        numberOfStudents,
        numberTolerence,
        skills,
        dueDate,
        votingSystem,
        requiredSkills
    } = formData;
    
    const votetype = ['Dictatorship', 'Absolute Majority', '2/3 Unanimite', 'Veto right'];
    const onChange = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
    
    const onChangeVote = e => setFormData({
        ...formData,
        votingSystem: e
    });
    const onChangeSkills = e => 
    setFormData({
      ...formData,
      skills: e
  });
    const [dispalaySettingsInput, toggleSettingsInput] = useState(false);
    const [dispalaySkillsInput, toggleSkillsInput] = useState(false);

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
                        addGroup(formData, history);

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
                    <input type="text" placeholder="* logo" name="logo"
                        value={logo}
                        onChange={
                            e => onChange(e)
                        }
                        required/>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* slogan" name="slogan"
                        value={slogan}
                        onChange={
                            e => onChange(e)
                        }
                        required/>
                </div>
                
               
                <div className="my-2">

                    <button onClick={
                            () => toggleSettingsInput(!dispalaySettingsInput)
                        }
                        type="button"
                        className="btn btn-light">
                        Automated settings
                    </button>
                </div>
                {
                dispalaySettingsInput && <Fragment>
                    <div className="form-group">
                        <input type="number" placeholder="Number of students" name="numberOfStudents"
                            value={numberOfStudents}
                            onChange={
                                e => onChange(e)
                            }
                            required/>
                    </div>
                    <div className="form-group">
                        <input type="number" placeholder="Number of tolerence" name="numberTolerence"
                            value={numberTolerence}
                            onChange={
                                e => onChange(e)
                            }
                            required/>
                    </div>
                    <div className="form-group">
                        <h4>Due Date</h4>
                        <input type="date" name="dueDate"
                            value={dueDate}
                            onChange={
                                e => onChange(e)
                            }
                            required/>
                    </div>
                    <div className="form-group">
                        <DropDownListComponent id="ddlelement"
                            dataSource={votetype}
                            placeholder="Select a voting system"
                            change={
                                e => onChangeVote(e.value)
                            }/>
                    </div>
                    <div className="form-group">
                            <h4>Skills ?</h4>
                            <SwitchComponent checked={false} change={e => 
                            { onChangeSkills(e.checked);
                              toggleSkillsInput(!dispalaySkillsInput);
                            }} />
                    </div>
                    {
                      dispalaySkillsInput && <Fragment>
                    <div className="form-group">
                        <input type="text" placeholder="Required Skills" name="requiredSkills"
                            value={requiredSkills}
                            onChange={
                                e => onChange(e)
                            }
                            
                            />
                        <small className="form-text">Please use comma separated values (eg.
                                    HTML,CSS,JavaScript,PHP)</small>
                    </div>
                    </Fragment>
                    }
                </Fragment>
            }
                <input type="submit" className="btn btn-primary my-1"/>
                <a className="btn btn-light my-1" href="dashboard.html">Go Back</a>
            </form>
        </Fragment>
    )
} 
Addgroup.propTypes = {
    addGroup: PropTypes.func.isRequired,
    group: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    group: state.group
});
export default connect(mapStateToProps, {addGroup})(Addgroup)
