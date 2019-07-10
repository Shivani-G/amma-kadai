import React, { Component } from 'react';
import { Text, StyleSheet, View, TextInput, ScrollView } from 'react-native';
import Container from '../common/Container';
import Button from '../common/Button';
import Label from '../common/Label';

export class Login extends Component{
	static navigationOptions = {
        title:'Login'
    };
    render(){
		// return (<View style = { styles.container }>
  //               <Text style = { styles.text }>Sign in or sign up!</Text>
  //               </View>);
        return (
                <ScrollView style = {styles.scroll}>
                    <Container>
                        <Button 
                            label="Forgot Login/Pass"
                            styles={{button: styles.alignRight, label: styles.label}} 
                            // onPress={this.press.bind(this)} 
                            />
                    </Container>
                    <Container>
                        <Label text="Login with Email" />
                        <TextInput
                            style={styles.textInput}
                        />
                     </Container>
                    <Container>
                        <Label text="Password" />
                        <TextInput
                            secureTextEntry={true}
                            style={styles.textInput}
                        />
                    </Container>
                </ScrollView>
            );
	}
}

export class Logout extends Component{
	static navigationOptions = {
        title:'Logout'
    };
    render(){
		return (<View style = { styles.container }>
                <Text style = { styles.textInput }>Sign out!</Text>
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

     scroll:
     {
        backgroundColor: '#FFF',
        padding: 30,
        flexDirection: 'column'
     },
     
     label: 
     {
        color: '#0d8898',
        fontSize: 20
     },
     
     alignRight: 
     {
        alignSelf: 'flex-end'
     },

     textInput: 
     {
        height: 30,
        fontSize: 20,
        borderBottomWidth: 1
        // backgroundColor: '#FFF'
    },
});