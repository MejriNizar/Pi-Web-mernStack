import React, {Fragment,useEffect}from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Spinner from '../../../components/layout/spinner'
import {loadUsers} from '../../../actions/auth';
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

const Userslist = (props) => {

    useEffect(()=>{
        props.loadUsers();
    },[props.loadUsers])
  
      const state = {
        backgroundColor: "black",
        activeColor: "info"
    }
    const mainPanel = React.createRef();
    const userss=props.users.users.map(p => (
        <tr key={p._id}>
            <td>{p.name}</td>
            <td>{p.email}</td>
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
    <Fragment>
        {props. loading ? <Spinner /> : <Fragment> 
           <Row>
           <Col md="12">
              <Card className="card-plain">
                <CardHeader>
                  <CardTitle tag="h4">Userslist</CardTitle>
                  <p className="card-category">
                    Here is a subtitle for this table
                  </p>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{userss}</td>
                        
                      </tr>
                      
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>

           </Row>
     
            </Fragment>}
    </Fragment>
    </div></div>)
}

Userslist.propTypes = {
    loadUsers: PropTypes.func.isRequired,
    users: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    users: state.users
})
export default connect(mapStateToProps,{loadUsers}) (Userslist)
