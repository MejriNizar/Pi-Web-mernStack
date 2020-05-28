import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import GroupActions from "./GroupActions";
import GroupRequest from "./GroupRequest";
import GroupMember from "./GroupMember";
import { connect } from "react-redux";
import { getproject } from "../../actions/project";
import { assignLeader } from "../../actions/group";
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { Row, Col } from "reactstrap";
import '../../assets/css/template.css';

const GroupMemb = ({
  getproject,
  project: { project },
  group: { group },
  auth: {
    user: { role },
  },assignLeader
}) => {
  
  useEffect(() => {
    getproject(group.project._id);
  }, [getproject, group.project._id]);
  const fields = {
    text: 'name',
    value: '_id'
}
const headerTemplate = data => {
  return (
<div className="header"> <span>Avatar</span> <span className="columnHeader">Member Name</span></div>      );
  }
  //set the value to item template
  const  itemTemplate = data => {
    return (
      <div><img className="empImage" src= {data.avatar}  alt="employee"/>
        <div className="ename"> {data.name} </div></div>
        );
    }
    //set the value to value template
    const  valueTemplate = data => {
      return (
        <div className="valueTemplate" ><img className="value" src= {data.avatar} height="28px" width="28px" alt="employee"/>
        <div className="name"> {data.name} </div></div>
          );
      }
      const onChangeMembers = e => {
        console.log(e)
        assignLeader(group._id,e);
    };
  return (
    <Fragment>
      <GroupActions group={group} />
      <h2 className="text-primary"> Teacher</h2>

      <p>
        <h4>
          {" "}
          <strong>Name:</strong>
          {project && project.projectOwner.name}{" "}
        </h4>
      </p>
      <h2 className="text-primary"> Requests</h2>
      {group.request.length > 0 ? (
        <Fragment>
        <Row>
          {group.request.map((req) => (
            <Col md={4}> 
             <GroupRequest key={req._id} request={req} groupId={group._id} />
           </Col>
          ))}
          </Row>
        </Fragment>
      ) : (
        <h4> No Request Found</h4>
      )}
      {role && role === "teacher" ? <Fragment>
      <h2 className="text-primary"> Assign team Leader</h2>
      <form className="form"
                onSubmit={
                    e => {
                        e.preventDefault();
                    }
            }>
      <div className='control-pane'>
        <div className='control-section'>
          <div id='template'>
           <DropDownListComponent  id="employees" dataSource={group.members} fields={fields} placeholder="Select a team leader" itemTemplate={itemTemplate} valueTemplate={valueTemplate} headerTemplate={headerTemplate} popupHeight="270px" change={
                            e => onChangeMembers(e.value)
                    }/>
            </div>
            </div>
          </div>
          </form>
        </Fragment> : <Fragment />}
      <h2 className="text-primary"> Team Leader</h2>
      <h4>
        <strong>Name:</strong>
        {group.groupOwner.name}
      </h4>
      <h2 className="text-primary"> Members</h2>
      {group.members.length > 0 ? (
        <Fragment>
          {group.members.map((mem) => (
            <GroupMember key={mem._id} member={mem} />
          ))}
        </Fragment>
      ) : (
        <h4> No Member Found</h4>
      )}
    </Fragment>
  );
};

GroupMemb.propTypes = {
  group: PropTypes.object.isRequired,
  getproject: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  group: state.group,
  auth: state.auth,
  project: state.project,
});

export default connect(mapStateToProps, { getproject,assignLeader })(GroupMemb);
