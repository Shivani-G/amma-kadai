import React, { Component } from 'react';
import { Text, StyleSheet, View, TextInput, ScrollView } from 'react-native';
import Container from '../common/Container';
import Button from '../common/Button';
import Label from '../common/Label';
import { getUserOnLogin, logoutUser, loginUser } from './services/UserService';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Profile from './ProfileComponent';
import {navigation} from 'react-navigation';
import Dialog, { DialogContent } from 'react-native-popup-dialog';  


const mapStateToProps = state => {
    return {
      user: state.order.userProfile
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        // getUserOnLogin: bindActionCreators( getUserOnLogin, dispatch),
        logoutUser: bindActionCreators( logoutUser, dispatch),
        loginUser: bindActionCreators( loginUser, dispatch)
    };
}

class UserLogin extends Component{
	
    static navigationOptions = ({navigation}) => { 
        console.log(navigation);
        var label = navigation.state.params? navigation.state.params.drawerLabel : 'Login';
        console.log("param value2");console.log(label);
        return { title:label, drawerLabel:'Settings' }
        }


    setVisible(visible) {
        this.setState({visible: visible});
    }

    constructor(){
        super();
        this.state = { userEmail: '', userPassword: '', visible: false, authenticationError: "" };
    }


    onPressLoginButton = () => {
        const email = this.state.userEmail;
        const password = this.state.userPassword;

        if(!email || email === ""){
            this.setVisible(!this.state.visible);
            this.setState({ authenticationError: 'Please enter email.' });
        }
        else if(!password || password === ""){
            this.setVisible(!this.state.visible);
            this.setState({ authenticationError: 'Please enter password.' });
        }
        else{
            getUserOnLogin(email, password).then(responseEntity => {
                console.log("inside login component, response entity:");
                console.log(responseEntity);
                if(responseEntity.successful===true){
                    this.props.loginUser(responseEntity.response); // changes redux state
                    console.log("After a redux state altering stmt?")
                    this.props.navigation.setParams({drawerLabel: 'Profile'});   
                }
                else{
                    this.setVisible(!this.state.visible);
                    this.setState({ authenticationError: responseEntity.errorMessage });
                }
            });
            
        }
    }

    onPressLogoutButton = () => {
        this.props.logoutUser();
        this.setState({ userEmail: '' });
        this.setState({ userPassword: '' });
        this.props.navigation.setParams({drawerLabel: 'Login'});
        
    }

    render(){

        return (
            this.props.user?
                <ScrollView>
                    <Profile
                        name = {this.props.user.name}
                        email = {this.props.user.email}
                        mobile = {this.props.user.mobile}
                        logout = {() => this.onPressLogoutButton()}
                    />

                </ScrollView> : 
                <ScrollView style = {styles.scroll}>
                    <Dialog
                        visible={this.state.visible}
                        onTouchOutside={() => {
                          this.setVisible(false);
                        }}
                    >
                        <DialogContent>
                            <View style={styles.dialogContent}>
                            <Text>{this.state.authenticationError}</Text>
                            </View>
                        </DialogContent>
                    </Dialog>
                    <Container>
                        <Label text="Email" />
                        <TextInput
                            style={styles.textInput}
                            onChangeText = {(text) => this.setState({ userEmail: text })}
                        />
                    </Container>
                    <Container>
                        <Label text="Password" />
                        <TextInput
                            secureTextEntry={true}
                            style={styles.textInput}
                            onChangeText = {(text) => this.setState({ userPassword: text })}
                        />
                    </Container>
                    <Container>
                        <Button 
                            label="Login"
                            styles={{button: styles.alignRight, label: styles.label}} 
                            onPress={() => this.onPressLoginButton()}
                            />
                    </Container>
                </ScrollView>
            );
	}
}

export const Login = connect(mapStateToProps, mapDispatchToProps)(UserLogin);


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
    dialogContent: {
        marginTop: 20
    }
});