import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { LOGIN_SUCCESSFUL, LOGIN_FAIL, SIGNUP_FAIL, SET_CURRENT_USER } from './types';
import setAuthorizationToken from '../utils/setAuthorizationToken';

export default class AuthenticationActions {
  static setCurrentUser(user) {
    return {
      type: SET_CURRENT_USER,
      user
    };
  }

  static login(data) {
    return (dispatch) => {
      return axios.post('/api/v1/users/login', data).then((res) => {
        const token = res.data.token;
        localStorage.setItem('jwtToken', token);
        setAuthorizationToken(token);
        dispatch(AuthenticationActions.setCurrentUser(jwtDecode(token)));
        return {
          confimation: 'success',
          message: res.data,
          isLoading: true
        };
      })
      .catch((err) => {
        return {
          confirmation: 'fail',
          message: err.response.data.message
        };
      });;
    };
  }

  static signup(data) {
    return (dispatch) => {
      return axios.post('/api/v1/users', data).then((res) => {
        const token = res.data.token;
        localStorage.setItem('jwtToken', token);
        setAuthorizationToken(token);
        dispatch(AuthenticationActions.setCurrentUser(jwtDecode(token)));
        return {
          confimation: 'success',
          message: res.data
        };
      })
      .catch((err) => {
        return {
          confirmation: 'fail',
          message: err.response.data.message
        };
      });
    };
  }

  static logout() {
    return (dispatch) => {
      localStorage.removeItem('jwtToken');
      setAuthorizationToken(false);
      dispatch(AuthenticationActions.setCurrentUser({}));
    };
  }
}
