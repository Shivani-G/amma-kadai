import { baseUrl2 } from '../config/baseUrl';
import { login, logout } from '../redux/ActionCreators';
import md5 from 'md5';

export const getUserOnLogin = (email, password) =>  {
	console.log("inside getUserOnLogin, url: ", baseUrl2+'/user/login.php');
	console.log(md5(password));
	return fetch(baseUrl2 + '/user/login.php', {
	  method: 'POST',
	  headers: {
	    'Accept': 'application/json',
	    'Content-Type': 'application/json',
	  },
	  body: JSON.stringify({
	    email: email,
	    password: md5(password)
	  })
	})
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
    .then(userObject => {
    	console.log("User");console.log(userObject);	
		console.log(userObject.response);
		return userObject;
		// dispatch(login(userObject.response))
	})
    .catch(error => {console.log("Error");console.log(error);});
}

export const logoutUser = () => (dispatch) => {
	dispatch(logout());
}

export const loginUser = (user) => (dispatch) => {
	dispatch(login(user));
}