import React, {Fragment,useEffect}from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Spinner from '../../../components/layout/spinner'
import {loadUsers} from '../../../actions/auth';
import routes from "../../routes";
import Sidebar from "../Sidebar/Sidebar";
import {Link} from 'react-router-dom'

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
    },[props])
  
      const state = {
        backgroundColor: "black",
        activeColor: "info",
        filter:""
        
    }
    const handleChange = event => {
      this.setState({ filter: event.target.value });
    };
    
    const { filter} = state;
   
   

  
    const mainPanel = React.createRef();
    const userss = props.users.users.map(p => (
        <tr key={p._id}>
            <td><img
                className="avatar border-gray"
                src={p.avatar}
                alt=""
              /></td>
            <td>{p.name}</td>
            <td>{p.email}</td>
            <td>{p.role}</td>
            <td> <Link to={`/profile/${p._id}`}><i className="fas fa-eye"></i> </Link></td>
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
              <br/><br/><br/><br/><br/>

                <CardHeader>
                  <CardTitle tag="h4">Users</CardTitle>
                  <p className="card-category">
                  <i class="fas fa-search"></i> <input value={filter} placeholder="search user"  onChange={handleChange}/>
                  </p>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Avatar</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>profile</th>
                      </tr>
                    </thead>
                    <tbody>
                        {userss}
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
    users: state.users,
    
})
export default connect(mapStateToProps,{loadUsers}) (Userslist)
