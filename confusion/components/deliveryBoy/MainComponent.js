import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import { Home } from './HomeComponent';
import { DROPS } from './data/dropLocations';
import { Login, Logout } from './LoginComponent'
import { createStackNavigator,createDrawerNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

const HomeNavigator = createStackNavigator({
        Home: { screen: Home }
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
          ),
        }
      },
    Login: 
      { screen: Login,
        navigationOptions: {
          title: 'Login',
          drawerLabel: 'Login',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='user'
              type='font-awesome'            
              size={24}
              color={tintColor}
            />
          ),
        }, 
      },
    Logout: 
      { screen: Logout,
        navigationOptions: {
          title: 'Logout',
          drawerLabel: 'Logout',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='bed'
              type='font-awesome'            
              size={24}
              color={tintColor}
            />
          ),
        }, 
      }
}, {
  drawerBackgroundColor: '#D1C4E9'
});


class Main extends Component {

  render() {
 
    return (
      <View style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
        <MainNavigator />
      </View>
    );
  }
}
  
export default Main;