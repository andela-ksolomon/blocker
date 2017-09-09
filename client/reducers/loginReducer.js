import { LOGIN_SUCCESSFUL, LOGIN_FAIL } from '../actions/types';

const initialState = {
  isAuthenticated: true
};
export default (state = initialState, action = {}) => {
  const updated = Object.assign({}, state);
  switch (action.type) {
    case LOGIN_SUCCESSFUL:
      return {
        isAuthenticated: true
      }
    
    case LOGIN_FAIL:
      return {
        isAuthenticated: false
      }
    default: return state;
  }
};
