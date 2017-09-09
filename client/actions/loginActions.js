// import axios from 'axios';
import { LOGIN_SUCCESSFUL, LOGIN_FAIL } from './types';
import setAuthorizationToken from '../utils/setAuthorizationToken';

export default class LoginActions {
  static login(data) {
    return (dispatch) => {
      dispatch({
        type: LOGIN_SUCCESSFUL
      });
      // return axios.post('api/v1/user/signin', data).then((res) => {
      //   const token = res.data.token;
      //   localStorage.setItem('jwtToken', token);
      //   setAuthorizationToken(token);
      // });
    };
  }

  static signup(data) {
    return (dispatch) => {
      dispatch({
        type: LOGIN_SUCCESSFUL
      });
      // return axios.post('api/v1/user/signin', data).then((res) => {
      //   const token = res.data.token;
      //   localStorage.setItem('jwtToken', token);
      //   setAuthorizationToken(token);
      // });
    };
  }

  static logout() {
    return (dispatch) => {
      localStorage.removeItem('jwtToken');
      // setAuthorizationToken(false);
      dispatch({
        type: LOGIN_FAIL
      });
    };
  }
}
