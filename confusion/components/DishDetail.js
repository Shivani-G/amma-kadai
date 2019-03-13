import React from 'react';
import { View, Text } from 'react-native';
import { Card } from 'react-native-elements';

function DishDetail(props){
	const dish = props.dish;

	if(dish != null){
		return (<Card 
				style={{flex:1}}
				featuredTitle={dish.name}
				image={require('./images/uthappizza.png')}>
                    <Text style={{margin: 10}}>
                        {dish.description}
                    </Text>
                </Card>);
    }
    else{
    	return (<View></View>);
    }
}

export default DishDetail;