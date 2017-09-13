import { ADD_FLASH_MESSAGE, DELETE_FLASH_MESSAGE, POST_QUESTION, FETCH_QUESTION, GET_QUESTION } from '../actions/types';
const initialState = {
  questions: [],
  singleQuestion: {}
};
export default (state = [], action = {}) => {
    switch(action.type) {
      case POST_QUESTION:
        return [
          ...state,
          action.payload
        ];
      case FETCH_QUESTION:
        return {
          ...state,
          questions: action.payload.question.rows
        };
      case GET_QUESTION:
        return {
          ...state,
          singleQuestion: action.payload
        };
  
      default: return state;
    }
  }