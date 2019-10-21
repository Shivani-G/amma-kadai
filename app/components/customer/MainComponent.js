import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import Home from './OrderComponent';
import { Login } from './LoginComponent';
import RequestedOrderComponent from './RequestedOrderComponent';
import Profile from './ProfileComponent';
import { createStackNavigator,createDrawerNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import { connect } from 'react-redux';
import { fetchMenu } from './services/FoodService';

const mapStateToProps = state => {
  return {
    user: state.order.userProfile
  }
}

const mapDispatchToProps = dispatch => ({
  fetchMenu: () => dispatch(fetchMenu())
})

const HomeNavigator = createStackNavigator({
        Home: { screen: Home },
        RequestedOrder: {screen: RequestedOrderComponent }
    },
    {
        initialRouteName: 'Home',
        navigationOptions: ({navigation})=>({
            headerStyle: {
                backgroundColor: "#512DA8"
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: "#fff"            
            },
            headerLeft: <Icon name="menu" 
                              size={24}
                              color='white'
                              onPress={()=>navigation.toggleDrawer()} />
        })
    }
);

const LoginNavigator = createStackNavigator({
        Login: { screen: Login }
    },
    {
        navigationOptions: ({navigation})=>({
            headerStyle: {
                backgroundColor: "#512DA8"
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: "#fff"            
            },
            headerLeft: <Icon name="menu" 
                              size={24}
                              color='white'
                              onPress={()=>navigation.toggleDrawer()} />
        })
    }
);

const MainNavigator = createDrawerNavigator({
    Home: 
      { screen: HomeNavigator,
        navigationOptions: {
          title: 'Home',
          drawerLabel: 'Home',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='home'
              type='font-awesome'            
              size={24}
              color={tintColor}
            />
          )
        }
      },
    Login: 
      { screen: LoginNavigator,
        navigationOptions: {
          // title: 'Login',
          drawerLabel: 'User',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='user'
              type='font-awesome'            
              size={24}
              color={tintColor}
            />
          )
        }, 
      }
}, {
  drawerBackgroundColor: '#D1C4E9'
});


class Main extends Component {

  componentDidMount() {
    this.props.fetchMenu();
  }

  render() {
    return (
      <View style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
        <MainNavigator />
      </View>
    );
  }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Main);