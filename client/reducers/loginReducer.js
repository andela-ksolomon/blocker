import { LOGIN_SUCCESSFUL } from '../actions/types';

const initialState = {
  isAuthenticated: false
};
export default (state = initialState, action = {}) => {
  const updated = Object.assign({}, state);
  switch (action.type) {
    case LOGIN_SUCCESSFUL:
      return {
        isAuthenticated: true
      }
    default: return state;
  }
};
