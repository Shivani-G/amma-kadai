import React, { Component } from 'react';
 
import {
  StyleSheet,
  View
} from 'react-native';
 
const Row = (props) => {
    return (
        <View style={styles.labelContainer}>
            { props.children }
        </View>
    );
}
 
const styles = StyleSheet.create({
    labelContainer: {
        marginBottom: 20,
        flexDirection: "row"
    }
});
 
export default Row;