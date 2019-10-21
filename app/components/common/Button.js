import React, { Component } from 'react';
 
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
 
const Button = (props) => {
     
    function getContent(){
        if(props.children){
            return props.children;
        }
        return <Text style={props.styles.label}>{props.label}</Text>
    }
 
    return (
        <TouchableOpacity 
            // underlayColor="#ccc"
            onPress={props.onPress} 
            disabled={props.disabled}
            style={
                props.style ? props.styles.button : (props.disabled? styles.disabledButton : styles.button)}
        >
            { getContent() }
        </TouchableOpacity>
    );
}
 
const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#512DA8'
    },
    disabledButton: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#D3D3D3'
    }
});
 
export default Button;