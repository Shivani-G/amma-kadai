import React, { Component } from 'react';
import { View, FlatList, ScrollView, Text } from 'react-native';
import { ListItem, CheckBox, Icon, Card } from 'react-native-elements';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { updateCart } from './redux/ActionCreators';
import NumericInput from 'react-native-numeric-input';
import Row from '../common/Row';
import Label from '../common/Label';

const mapStateToProps = state => {
    return {
      menu: state.order.menu,
      cart: state.order.cart
    }
}


const mapDispatchToProps = (dispatch) =>{
    return {
        updateCart: bindActionCreators( updateCart, dispatch)
    };
}

class List extends Component {

    constructor(props){
        super(props);
        this.onPressNumericInput = this.onPressNumericInput.bind(this);

    }

    onPressNumericInput = (item, value) => {
        item.quantity=value; 
        console.log(item.name+":"+item.quantity);
        this.props.updateCart(item)

    }

    
    render(){

        const renderItem = ({item, index}) => {
            return (
                <ListItem
                    key={index}
                    rightElement={
                        <NumericInput rounded
                                      minValue={0}
                                      maxValue={50}
                                      // leftButtonBackgroundColor='#000000'
                                      // rightButtonBackgroundColor='#000000'
                                      totalWidth={60} 
                                      totalHeight={30}
                                      // iconStyle={{ color: 'white' }} 
                                      onChange={value => this.onPressNumericInput(item, value)} />
                    }
                    title = {  
                      <Row>
                      <View>
                          {
                            (item.veg === true) ?
                            <Icon
                              style={{bottom:0}}
                              name='circle'
                              type='font-awesome'            
                              size={16}
                              color='#008000'
                            /> : 
                            <Icon
                              name='circle'
                              type='font-awesome'            
                              size={14}
                              color='#FF0000'
                            />
                        }
                      </View>
                      {item.name && <Label text={item.name}/>}
                    </Row>
                    }
                    titleStyle = { {fontWeight: 'bold'} }
                    topDivider = { true }
                    
                    subtitle={'₹' + item.price}
                    hideChevron={true}
                />
            );
        };

        // var data = [...this.props.menu]
        // console.log("Old data:", data);
        // console.log("props.cart list:", this.props.cart);
        // var newData = data.map((item) => {
        //     var index = this.props.cart.indexOf(item.id);
        //     return {...item, quantity: index > -1};
        //     // console.log("new:", {...item, reached: index > -1});
        //     // console.log("modified old:", item);
        // });
        // console.log("New data:", newData);

        return (
                <FlatList 
                    data={this.props.menu}
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
                this.props.menu.length > 0 && this.props.menu.length === this.props.cart.length ?  
                <Card><Text style={{color: 'blue', fontSize: 24, fontWeight: 'bold', justifyContent: 'center'}}>Delivery Completed.</Text></Card> :
                <Text></Text>
            }
            <Card>
            <Text style={{fontSize: 15}} >Place your lunch order before 10:30am for assured delivery {"\n"}</Text>
            <List menu={this.props.menu}
                  cart={this.props.cart}
                  updateCart={this.props.updateCart}
                  />
            </Card>
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);