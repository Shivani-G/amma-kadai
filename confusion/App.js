import React from 'react';
import Main from './components/customer/MainComponent';
import { Provider } from 'react-redux';
import { ConfigureStore } from './components/customer/redux/configureStore';
import * as Font from 'expo-font';

const store = ConfigureStore();

export default class App extends React.Component {
	componentDidMount() {
		Font.loadAsync({
		  'Verdana': require('./assets/fonts/tipo.ttf'),
		});
  	}
  	render() {
    	return (
      	<Provider store={store}>
       	 <Main />
      	</Provider>
    	);
  	}
}