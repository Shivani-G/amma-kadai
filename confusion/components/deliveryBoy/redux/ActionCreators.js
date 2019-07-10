import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../config/baseUrl';

export const fetchDrops = () => (dispatch) => {
    return fetch(baseUrl + 'drops')
    .then(response => {
        console.log(response);
        console.log("received response");
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
    .then(response => {console.log("Response");console.log(response);return response.json()})
    .then(drops => {console.log("Drops");console.log(drops);dispatch(addDrops(drops))})
    .catch(error => {console.log("Error");dispatch(dropsFailed(error.message))});
};

export const dropsLoading = () => ({
    type: ActionTypes.DROPS_LOADING
});

export const dropsFailed = (errmess) => ({
    type: ActionTypes.DROPS_FAILED,
    payload: errmess
});

export const addDrops = (drops) => ({
    type: ActionTypes.ADD_DROPS,
    payload: drops
});

export const addDropToReachedList = (drop) => ({
    type: ActionTypes.ADD_DROP_TO_REACHED_LIST,
    payload: drop
});

export const removeDropFromReachedList = (drop) => ({
    type: ActionTypes.REMOVE_DROP_FROM_REACHED_LIST,
    payload: drop
});
