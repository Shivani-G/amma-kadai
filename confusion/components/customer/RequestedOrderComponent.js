import React, { Component } from 'react';
import { ScrollView, Text, StyleSheet, WebView } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { emptyCart } from './redux/ActionCreators';

const mapStateToProps = state => {
    return {
      recentOrder: state.order.recentOrder
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        emptyCart: bindActionCreators( emptyCart, dispatch)
    };
}

class RequestedOrderComponent extends Component{

	// Wont need navigationOptions once RequestedOrderComponent 
	// is just a component(functional preferably) and not a screen
	static navigationOptions = ({ navigation }) => {

		console.log("inside requestedOrderComponent");
		console.log(navigation);
        return {title:'Home'};
    };

	componentDidMount() {
        this.props.emptyCart();
    }
	render(){
		
		return(
	            <ScrollView>
	            <Card>
	            <Text > Thank you for placing your order with Ammakadai. You will receive a confirmation shortly. </Text>
	            <Text>Payment options</Text>
	            <Text></Text>
	            <Text>1. UPI Id</Text>
	            <Text>2. Cash</Text>
	            </Card>
	            </ScrollView>
	        );
	}
};

const styles = StyleSheet.create({
	alignRight: 
     {
     	
     }
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestedOrderComponent);