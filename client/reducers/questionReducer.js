import { ADD_FLASH_MESSAGE, DELETE_FLASH_MESSAGE, POST_QUESTION } from '../actions/types';

export default (state = [], action = {}) => {
    switch(action.type) {
      case POST_QUESTION:
        return [
          ...state,
          action.payload
        ];
  
      default: return state;
    }
  }