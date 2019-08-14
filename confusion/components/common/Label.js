import React, { Component } from 'react';
 
import {
  StyleSheet,
  Text,
} from 'react-native';
 
const Label = (props) => {
    return (
        <Text 
            style={props.style ? props.style : styles.textLabel}
        >
            {props.text}
        </Text>
    );
}
 
const styles = StyleSheet.create({
    textLabel: {
        fontSize: 20,
        fontFamily: 'Verdana',
        marginBottom: 10,
        color: '#595856'
    }
});
 
export default Label;