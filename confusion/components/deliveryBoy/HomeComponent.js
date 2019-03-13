import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { DROPS } from './data/dropLocations';

export class Home extends Component {

    constructor(props){
        super(props);
        this.state = {
            drops:DROPS
        };
    }

    static navigationOptions = {
        title:'Home'
    };

    render(){
        return(
            <CheckList drops={this.state.drops} />
        );
    }
}


class CheckList extends Component {

    constructor(props){
        super(props);
        this.state = {
            drops:props.drops
        };
    }

    

    render(){
        const renderItem = ({item, index}) => {
            return (
                <ListItem
                    key={index}
                    title={item.name}
                    subtitle={item.orderCount + ' Lunches to be delivered.'}
                    hideChevron={true}
                    // leftAvatar={{ source: require('./images/uthappizza.png')}}
                    // onPress = {()=>props.onPress(item.id)}
                />
            );
        };
        return (
                <FlatList 
                    data={this.state.drops}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                />
        );
    }
}