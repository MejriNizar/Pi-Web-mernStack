import React ,{useEffect}from 'react'
import PropTypes from 'prop-types'
import {getallprojects,ValidateProject} from '../../../actions/project'
import {connect} from 'react-redux'
import Moment from 'react-moment';
import routes from "../../routes";
import Sidebar from "../Sidebar/Sidebar";
import {Link} from 'react-router-dom';
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Table,
    Row,
    Col
  } from "reactstrap";
import { SwitchComponent } from '@syncfusion/ej2-react-buttons';
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
    <td>{p.projectOwner.name}</td>
    <td>
        <Moment format='YYYY/MM/DD'>{p.startDate}</Moment> - 
        <Moment format='YYYY/MM/DD'>{p.endDate}</Moment>
        
    </td>
    <td>{p.group.map(g=> <ul>
      <li>{g.name}</li>
    </ul>)}</td>
    <td>
    <Link to={`/project-details/${p._id}`}><i className="fas fa-eye"></i> </Link>
  
    </td>
    {p.activated === true ?(<td><SwitchComponent onLabel="ACTIVATED" offLabel="DEACTIVATED" checked={true}   change={e => 
                            { props.ValidateProject(p._id,e.checked);
                              
                            }} /></td>):(<td><SwitchComponent onLabel="ACTIVATED" offLabel="DEACTIVATED" checked={false}  change={e => 
                            { props.ValidateProject(p._id,e.checked);
                            }} /></td>)} 
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
          <br/><br/><br/><br/><br/>

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
                       <th>Project owner</th>
                       <th>Duration</th>
                       <th>Groups</th>
                       <th>Details</th>
                       <th>Validate</th>
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
    ValidateProject: PropTypes.func.isRequired

}
const mapStateToProps = state => ({
    auth: state.auth,
    projects: state.projects
});
export default connect(mapStateToProps,{getallprojects,ValidateProject})(Projects)
