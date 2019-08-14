import React, { Component } from 'react';
import { ScrollView, Text, StyleSheet, WebView } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { emptyCart } from './redux/ActionCreators';
import {navigation} from 'react-navigation';
import PropTypes from 'prop-types';
import Button from '../common/Button';
import Container from '../common/Container';



const Profile = ({name, email, mobile, logout}) => {
	return(
        <Card>
        	<Container>
            <Text > Name: { name } </Text>
            <Text > Email: { email } </Text>
            <Text > Mobile: { mobile } </Text>
            </Container>
            <Container>
            <Button 
                label="Logout"
                styles={{button: styles.alignRight, label: styles.label}} 
                onPress={logout}
            />
            </Container>
        </Card>
    );
}

Profile.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  mobile: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired
}

const styles = StyleSheet.create(
{
	label: 
     {
        color: '#0d8898',
        fontSize: 20
     },
     
     alignRight: 
     {
        alignSelf: 'flex-end'
     }
});

export default Profile;