import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../config/baseUrl';

export const fetchMenu = () => (dispatch) => {
    return fetch(baseUrl + 'menu')
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
    .then(menu => {console.log("Menu");console.log(menu);dispatch(addMenu(menu))})
    .catch(error => {console.log("Error");dispatch(menuFailed(error.message))});
};

export const menuLoading = () => ({
    type: ActionTypes.MENU_LOADING
});

export const menuFailed = (errmess) => ({
    type: ActionTypes.MENU_FAILED,
    payload: errmess
});

export const addMenu = (menu) => ({
    type: ActionTypes.FETCH_MENU,
    payload: menu
});

export const updateCart = (meal) => ({
    type: ActionTypes.UPDATE_CART,
    payload: meal
});