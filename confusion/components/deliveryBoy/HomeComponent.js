import React, { Component } from 'react';
import { View, FlatList, ScrollView, Text } from 'react-native';
import { ListItem, CheckBox, Icon, Card } from 'react-native-elements';
import { DROPS } from './data/dropLocations';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { addDropToReachedList, removeDropFromReachedList } from './redux/ActionCreators';

const mapStateToProps = state => {
    return {
      drops: state.drops.drops,
      reached: state.drops.reached
    }
}


const mapDispatchToProps = (dispatch) =>{
    return {
        addDropToReachedList: bindActionCreators( addDropToReachedList, dispatch),
        removeDropFromReachedList: bindActionCreators( removeDropFromReachedList, dispatch)
    };
}

class CheckList extends Component {

    constructor(props){
        super(props);
        this.onPressCheckBox = this.onPressCheckBox.bind(this);

    }

    onPressCheckBox = (item) => {
        console.log("inside onpresscheckbox:", item)
        if(item.reached === true){
            console.log("the box is checked. Uncheck it");
            this.props.removeDropFromReachedList(item.id);
            console.log("reached list:", this.props.reached);
        }
        else{
            console.log("the box is unchecked. check it");
            this.props.addDropToReachedList(item.id);
            console.log("reached list:", this.props.reached);
        }
    }

    
    render(){

        const renderItem = ({item, index}) => {
            return (
                <ListItem
                    key={index}
                    title={
                        <CheckBox
                            title={item.name}
                            iconRight
                            checkedIcon={<Icon
                                          name='check-square'
                                          type='font-awesome'            
                                          size={24}
                                        />
                                        }
                            uncheckedIcon={<Icon
                                              name='square'
                                              type='font-awesome'            
                                              size={24}
                                            />
                                        }
                            checked={ item.reached }
                            onPress={ _=> this.onPressCheckBox(item) }
                        />
                    }
                    subtitle={item.orderCount + ' Lunches to be delivered.'}
                    hideChevron={true}
                />
            );
        };

        var data = [...this.props.drops]
        console.log("Old data:", data);
        console.log("props.reached list:", this.props.reached);
        var newData = data.map((item) => {
            var index = this.props.reached.indexOf(item.id);
            return {...item, reached: index > -1};
            // console.log("new:", {...item, reached: index > -1});
            // console.log("modified old:", item);
        });
        console.log("New data:", newData);

        return (
                <FlatList 
                    data={newData}
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
            <ScrollView>
            {
                this.props.drops.length > 0 && this.props.drops.length === this.props.reached.length ?  
                <Card><Text style={{color: 'blue', fontSize: 24, fontWeight: 'bold', justifyContent: 'center'}}>Delivery Completed.</Text></Card> :
                <Text></Text>
            }
            <Card>
            <CheckList drops={this.props.drops}
                       reached={this.props.reached}
                       removeDropFromReachedList={this.props.removeDropFromReachedList}
                       addDropToReachedList={this.props.addDropToReachedList}
                        />
            </Card>
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);