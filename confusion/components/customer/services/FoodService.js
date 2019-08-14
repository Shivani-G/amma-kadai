import { baseUrl } from '../config/baseUrl';
import { addMenu, menuFailed } from '../redux/ActionCreators';

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

export const fetchRecentOrder = () => (dispatch) => {
  return fetch(baseUrl + 'dummyRecentOrder')
  .then(response => {
    if(response.ok) {
      return response;
    }
    else {
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
    .then(order => {console.log("recent order");console.log(order);dispatch(updateRecentOrder(order))})
    .catch(error => {console.log("Error");dispatch(menuFailed(error.message))});
};