import axios from 'axios';
import { returnErrors } from './errorAction';

import {
  USER_LOADED,
  CLEAR_ERRORS,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADING,

} from './types';

// Check token & load user

// Register User

export const register=(userDetails)=>{
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const userDetailsContent = JSON.stringify(userDetails);
  return function (dispatch){

    axios.post('/api/users',userDetailsContent,config).then(res=>{
      console.log(res.data);
      dispatch({
        type:REGISTER_SUCCESS,
        payload:res.data
      })
    }).catch(err=>{
      dispatch({
        type:REGISTER_FAIL,
        payload:err.response.data
      })
    })
  }
}

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
// Login User
export const login=(loginDetails)=>{
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const loginDetailsContent=JSON.stringify(loginDetails);
  return function(dispatch)
  {
    axios.post('/api/auth',loginDetailsContent,config).then(
      res=>{
      
      dispatch({
        type:LOGIN_SUCCESS,
        payload:res.data
      })
    }
    ).catch(err=>{
      console.log(err.response.data)
      dispatch({
        type:AUTH_ERROR,
        payload:err.response.data
      })
    })
  }
}
export const loginUsingToken=()=>{
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const data=sessionStorage.getItem("token")
  const body=JSON.stringify(data);
  return function(dispatch)
  {
   
    axios.post('/api/auth/userToken',body,config).then(res=>{
      console.log(res.data);
      dispatch({
        type:LOGIN_SUCCESS,
        payload:res.data
      })
    }).catch(err=>{
      console.log(err);
    })
  }
}

// Logout User
export const logout = () => {
  localStorage.clear();
  return {
    type: LOGOUT_SUCCESS
  };
};

// Setup config/headers and token
export const tokenConfig = getState => {
  // Get token from localstorage
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  };

  // If token, add to headers
  if (token) {
    config.headers['x-auth-token'] = token;
  }

  return config;
};