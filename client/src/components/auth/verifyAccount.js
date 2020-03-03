import React ,{Fragment, useState} from 'react'
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {verifyUser} from '../../actions/auth';
import PropTypes from 'prop-types';
import Axios from 'axios';
import { DISABELD_ACCOUNT, ENABELD_ACCOUNT } from '../../actions/types';
export const VerifyAccount = ({verifyUser, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        secretToken: ''
    });
    const {secretToken} = formData;
    const onChange= e => setFormData({...formData, [e.target.name]: e.target.value});
    const onSubmit = async e =>{
        e.preventDefault();
        try {
            const config =  {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const body =JSON.stringify({secretToken});
            const res = await Axios.post('/api/auth/act',body,config);
            
          
            console.log(res.data);
        } catch (error) {
           
            console.error(error.response.data);
        }
        
    };
    //redirect if logged in
    if(isAuthenticated) {
      return <Redirect to="/login" />;
    }
    return (
        <Fragment>
          
     <h1 className="large text-primary">Verify</h1>
     <p className="lead"><i className="fas fa-user"></i>   Account</p>
     <form className="form" onSubmit={e => onSubmit(e)}>
       
       <div className="form-group">
         <input type="text" placeholder="Secret Token" name="secretToken" value={secretToken}
           onChange={e => onChange(e)}
           required />
         
       </div>

    
       <input type="submit" className="btn btn-primary" value="verify" />
     </form>
     <p className="my-1">
      Dont have an account ! <Link to="/register">Sign Up</Link>
     </p>
  
        </Fragment>
    )
};
VerifyAccount.propTypes = {
  verifyUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
isAuthenticated: state.auth.isAuthenticated
});
export default  connect(mapStateToProps,{verifyUser})(VerifyAccount);