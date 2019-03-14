import React from 'react';
import Main from './components/deliveryBoy/MainComponent';
import { Provider } from 'react-redux';
import { ConfigureStore } from './components/deliveryBoy/redux/configureStore';

const store = ConfigureStore();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}