import React ,{useEffect}from 'react'
import PropTypes from 'prop-types'
import {getallgroups,ValidateGroup} from '../../../actions/group'
import {connect} from 'react-redux'
import Moment from 'react-moment';
import routes from "../../routes";
import Sidebar from "../Sidebar/Sidebar";
import { SwitchComponent } from '@syncfusion/ej2-react-buttons'

import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Table,
    Row,
    Col
  } from "reactstrap";
const Groups = (props) => {
    const state = {
        backgroundColor: "black",
        activeColor: "info"
    }
    const mainPanel = React.createRef();
    useEffect(()=>{
        props.getallgroups();
    }, [props.getallgroups]);


 
    const groupss=props.groups.groups.map(p => (
        <tr key={p._id}>
            <td>{p.logo}</td>
            <td>{p.name}</td>
    <td className='hide-sm'>{p.slogan.substring(0, 30)}</td>
    <td>{p.groupOwner.name}</td>
    <td>{p.project.name}</td>
    <td><Moment format='YYYY/MM/DD'>{p.creationDate}</Moment> </td> 
    {p.activated === true ?(<td><SwitchComponent checked={true} change={e => 
                            { props.ValidateGroup(p._id,e.checked);
                              
                            }} /></td>):(<td><SwitchComponent checked={false} change={e => 
                            { props.ValidateGroup(p._id,e.checked);
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
                <CardHeader>
                  <CardTitle tag="h4">Groups</CardTitle>
                  <p className="card-category">
                    List Groups
                  </p>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                      <th>Logo</th>
                       <th>Name</th>
                       <th>Slogan</th>
                       <th>Group owner</th>
                       <th>Project</th>
                       <th>Creation Date</th>
                       <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                     {groupss}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
              </Col>
        </Row>
        </div></div>
    )
}

Groups.propTypes = {
    getallgroups: PropTypes.func.isRequired,
    ValidateGroup: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    auth: state.auth,
    groups: state.groups
});
export default connect(mapStateToProps,{getallgroups,ValidateGroup})(Groups)
