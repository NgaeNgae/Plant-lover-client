import axios from 'axios'
import { setAuthToken } from '../../services/TokenService'
import { Dispatch } from 'redux'
import { setRole } from '../../services/RoleService'
import { LOGIN_FAIL, LOGIN_SUCCESS, REGISTER_FAIL, REGISTER_SUCCESS } from '../dispatchTypes'
export const Login = (data: Object) => {
  return (dispatch: Dispatch) => {
    axios.post("/auth/login", data).then((response) => {
        const token = response.data.data.token;
        const role = response.data.data.role.name;
        setAuthToken(token);
        setRole(role);
        dispatch({type : LOGIN_SUCCESS, payload : response.data});
        if(role === "admin") {
          window.location.assign('/admin')
        }else {
          window.location.assign('/')
        }
    }).catch((error) => {
        dispatch({type : LOGIN_FAIL, payload : error.response.data.msg});
    })
  }
}
export const Confirm = (token : string) => {
  return (dispatch: Dispatch) => {
    axios.get(`/auth/confirmation/${token}`).then((response) => {
      const token = response.data.data.token;
      const role = response.data.data.role.name;
      setAuthToken(token);
      setRole(role);
      dispatch({type: REGISTER_SUCCESS, payload : response.data});
      if(role === "admin") {
        window.location.assign('/admin')
      }else {
        window.location.assign('/')
      }
    })
  }
}
export const Register = (data: Object) => {
  return (dispatch: Dispatch) => {
    axios.post("/auth/register", data).then((response) => {
    }).catch((error) => {
      dispatch({type : REGISTER_FAIL, payload : error.response.data.msg});
    })
  }
}