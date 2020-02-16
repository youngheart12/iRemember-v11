import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    CLEAR_ERRORS,

  } from '../../actions/types';

  const initialState = {
    token:null,
  
    isAuthenticated: null,
    isLoading: false,
    user: null,
    err:null
  };

  export default function(state = initialState, action) {
    switch (action.type) {
    
      case USER_LOADING:
        return {
          ...state,
          isLoading: true
        };
      case USER_LOADED:
        return {
          ...state,
          isAuthenticated: true,
          isLoading: false,
          user: action.payload
        };
      case LOGIN_SUCCESS:
      case REGISTER_SUCCESS:
       
        sessionStorage.setItem('token', action.payload.token);
        
        return {
          ...state,
          ...action.payload,
          isAuthenticated: true,
          isLoading: false,
          isrequestStart:true
        };
      case AUTH_ERROR:
      case LOGIN_FAIL:
      case REGISTER_FAIL:
        
        return {
          ...state,
          token: null,
          user: null,
          isAuthenticated: false,
          isLoading: false,
          err:action.payload
        };
        case CLEAR_ERRORS:
          return{
            ...state,
            err:{
              msg:null
            }
          }
        case LOGOUT_SUCCESS:
        localStorage.removeItem('token');
        return {
          ...state,
          token: null,
          user: null,
          isAuthenticated: false,
          isLoading: false,
        
        };
      default:
        return state;
    }
  }
