import isEmpty from 'lodash/isEmpty';
import { LOGIN_SUCCESSFUL, LOGIN_FAIL, SIGNUP_FAIL, SET_CURRENT_USER } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  usernameError: '',
  user: {}
};
export default (state = initialState, action = {}) => {
  const updated = Object.assign({}, state);
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        isAuthenticated: !isEmpty(action.user),
        user: action.user
      }
    
    case LOGIN_FAIL:
      return {
        isAuthenticated: false
      }
    
    case SIGNUP_FAIL:
      return {
        isAuthenticated: false
      }
    default: return state;
  }
};
