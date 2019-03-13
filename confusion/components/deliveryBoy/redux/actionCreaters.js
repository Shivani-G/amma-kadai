import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const fetchDrops = () => (dispatch) => {
    return fetch(baseUrl + 'drops')
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)))
    .catch(error => dispatch(commentsFailed(error.message)));
};

export const dropsLoading = () => ({
    type: ActionTypes.DROPS_LOADING
});

export const dropsFailed = (errmess) => ({
    type: ActionTypes.DROPS_FAILED,
    payload: errmess
});

export const addDrop = (comments) => ({
    type: ActionTypes.ADD_DROP,
    payload: comments
});