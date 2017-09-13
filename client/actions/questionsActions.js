import axios from 'axios';
import { POST_QUESTION, FETCH_QUESTION, GET_QUESTION } from './types';

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
        return {
            confirmation: 'fail',
            message: error.response.data.message
          };
    });
};
export function fetchData(data) {
    return (dispatch) => axios.get('/api/v1/questions')
    .then((response) => {
        dispatch({
            type: FETCH_QUESTION,
            payload: response.data
        });
    })
    .catch((error) => {
        return {
            confirmation: 'fail',
            message: error.response.data.message
          };
    });
};
export function fetchQuestion(id) {
    return (dispatch) => axios.get(`/api/v1/questions/${id}`)
    .then((response) => {
        dispatch({
            type: GET_QUESTION,
            payload: response.data
        });
    })
    .catch((error) => {
        return {
            confirmation: 'fail',
            message: error.response.data.message
          };
    });
};