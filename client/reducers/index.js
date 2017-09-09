import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import flashMessages from './flashMessageReducer';

const rootReducer = combineReducers({
  loginReducer,
  flashMessages
});
export default rootReducer;
