import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addGroup } from "../../actions/group";
import { getproject } from "../../actions/project";
import { loadStudents } from "../../actions/auth";

import "../../assets/css/syncfusions.css";
import {
  MultiSelectComponent,
  Inject,
  CheckBoxSelection,
} from "@syncfusion/ej2-react-dropdowns";
import { Spinner } from "reactstrap";

const Addgroup = ({
  addGroup,
  history,
  getproject,
  project: { project, loading },
  match,
  group: { group },
  loadStudents,
  students: { students },
}) => {
  let skills = "";

  useEffect(() => {
    getproject(match.params.id);
  }, [getproject, match.params.id]);
  useEffect(() => {
    if (project) {
      skills = project.settings.requiredSkills
      console.log(skills)
        loadStudents(skills);
    }
  }, [loadStudents, skills, project]);

  const [formData, setFormData] = useState({ name: "", slogan: "" });

  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose Logo");
  const { name, slogan, members } = formData;
  const onChangeFile = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };
  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  const onChangeMembers = (e) =>
    setFormData({
      ...formData,
      members: e,
    });
  const fields = {
    text: "name",
    value: "_id",
  };
  const fields1 = {
    text: "user.name",
    value: "user._id",
  };

  return (
    <Fragment>
      <h1 className="large text-primary">ADD A GROUP</h1>

      <small>* = required field</small>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          const form = new FormData();
          form.set("name", name);
          form.set("slogan", slogan);
          form.set("members", members);
          form.set("logo", file);
          form.append("file", file);

          addGroup(form, history, false, match.params.id);
        }}
      >
        <div className="form-group">
          <input
            type="text"
            placeholder="* name"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <div className="custom-file mb4">
            <input
              type="file"
              className="custom-file-input"
              id="customFile"
              onChange={(e) => onChangeFile(e)}
              required
            ></input>
            <label className="custom-file-label" htmlFor="customFile">
              {filename}
            </label>{" "}
          </div>
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="* slogan"
            name="slogan"
            value={slogan}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        {loading || project === null ? (
          <Spinner />
        ) : (
          <Fragment>
            {project.settings.Skills ? (
              <MultiSelectComponent
                id="membersS"
                name="members"
                dataSource={students}
                fields={fields}
                placeholder="Select members"
                mode="CheckBox"
                selectAllText="Select All"
                unSelectAllText="unSelect All"
                showSelectAll={true}
                maximumSelectionLength={project.settings.numberOfStudents}
                change={(e) => onChangeMembers(e.value)}
              >
                <Inject services={[CheckBoxSelection]} />
              </MultiSelectComponent>
            ) : (
              <MultiSelectComponent
                id="membersS"
                name="members"
                dataSource={students}
                fields={fields1}
                placeholder="Select members"
                mode="CheckBox"
                selectAllText="Select All"
                unSelectAllText="unSelect All"
                showSelectAll={true}
                maximumSelectionLength={project.settings.numberOfStudents}
                change={(e) => onChangeMembers(e.value)}
              >
                <Inject services={[CheckBoxSelection]} />
              </MultiSelectComponent>
            )}
          </Fragment>
        )}

        <input type="submit" className="btn btn-primary my-1" />
        <a className="btn btn-light my-1" href="dashboard.html">
          Go Back
        </a>
      </form>
    </Fragment>
  );
};
Addgroup.propTypes = {
  addGroup: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired,
  getproject: PropTypes.func.isRequired,
  loadStudents: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  project: state.project,
  group: state.group,
  students: state.students,
});
export default connect(mapStateToProps, { addGroup, getproject, loadStudents })(
  Addgroup
);
