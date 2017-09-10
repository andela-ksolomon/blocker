import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import flashMessages from './flashMessageReducer';
import questions from './questionReducer';

const rootReducer = combineReducers({
  loginReducer,
  flashMessages,
  questions
});
export default rootReducer;
