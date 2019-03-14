import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { DROPS } from './data/dropLocations';

import { connect } from 'react-redux';
import { baseUrl } from './config/baseUrl';

const mapStateToProps = state => {
    return {
      drops: state.drops
    }
}

class CheckList extends Component {
    
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
                    data={this.props.drops}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                />
        );
    }
}

class Home extends Component {

    static navigationOptions = {
        title:'Home'
    };

    render(){
        return(
            <CheckList drops={this.props.drops.drops} />
        );
    }
}

export default connect(mapStateToProps)(Home);