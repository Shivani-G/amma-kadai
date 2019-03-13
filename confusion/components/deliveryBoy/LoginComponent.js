import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';

export class Login extends Component{
	static navigationOptions = {
        title:'Login'
    };
    render(){
		return (<View style = { styles.container }>
                <Text style = { styles.text }>Sign in or sign up!</Text>
                </View>);
	}
}

export class Logout extends Component{
	static navigationOptions = {
        title:'Logout'
    };
    render(){
		return (<View style = { styles.container }>
                <Text style = { styles.text }>Sign out!</Text>
                </View>);
	}
}


const styles = StyleSheet.create(
{
     container:
     {
         flex: 1,
         justifyContent: 'center', // Used to set Text Component Vertically Center
         alignItems: 'center' // Used to set Text Component Horizontally Center
     },
     
     text:
     {
         fontSize: 35
     }
});