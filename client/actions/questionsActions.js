import axios from 'axios';
import { POST_QUESTION } from './types';

export function postQuestion(data) {
    return (dispatch) => axios.post('/api/v1/questions', data)
    .then((response) => {
        dispatch({
            type: POST_QUESTION,
            payload: response.data.question
        });
        return response.data.question;
    })
    .catch((error) => {
        console.log(error);
        return {
            confirmation: 'fail',
            message: error.response.data.message
          };
    });
};