// import axios from 'axios';
import { LOGIN_SUCCESSFUL, LOGIN_FAIL } from './types';

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
}
