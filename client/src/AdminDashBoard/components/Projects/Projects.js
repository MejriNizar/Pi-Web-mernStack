import React ,{useEffect}from 'react'
import PropTypes from 'prop-types'
import {getallprojects} from '../../../actions/project'
import {connect} from 'react-redux'
import Moment from 'react-moment';
import routes from "../../routes";
import Sidebar from "../Sidebar/Sidebar";

import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Table,
    Row,
    Col
  } from "reactstrap";
const Projects = (props) => {
    const state = {
        backgroundColor: "black",
        activeColor: "info"
    }
    const mainPanel = React.createRef();
    useEffect(()=>{
        props.getallprojects();
    }, [props.getallprojects]);
    const projectss=props.projects.projects.map(p => (
        <tr key={p._id}>
            <td>{p.name}</td>
    <td className='hide-sm'>{p.description.substring(0, 30)}</td>
    <td>
        <Moment format='YYYY/MM/DD'>{p.startDate}</Moment> - 
        <Moment format='YYYY/MM/DD'>{p.endDate}</Moment>
        
    </td>
    
    </tr>
    ))
    return (
        <div className="content">
      <Sidebar
        {...props}
        routes={routes}
        bgColor={state.backgroundColor}
        activeColor={state.activeColor}
      />
         <div className="main-panel" ref={mainPanel}>
        <Row>
          <Col md="12">
          <Card className="card-plain">
                <CardHeader>
                  <CardTitle tag="h4">Projects</CardTitle>
                  <p className="card-category">
                    List Projects
                  </p>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                      <th>Name</th>
                       <th>Description</th>
                       <th>Duration</th>
                      </tr>
                    </thead>
                    <tbody>
                     {projectss}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
              </Col>
        </Row>
        </div></div>
    )
}

Projects.propTypes = {
    getallprojects: PropTypes.func.isRequired,

}
const mapStateToProps = state => ({
    auth: state.auth,
    projects: state.projects
});
export default connect(mapStateToProps,{getallprojects})(Projects)
