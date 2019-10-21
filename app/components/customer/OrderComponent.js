import React, { Component } from 'react';
import { View, FlatList, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Dialog, { DialogContent } from 'react-native-popup-dialog';  
import { ListItem, CheckBox, Icon, Card } from 'react-native-elements';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { updateCart, emptyCart } from './redux/ActionCreators';
import { fetchRecentOrder } from './services/FoodService';
import NumericInput from 'react-native-numeric-input';
import Row from '../common/Row';
import Label from '../common/Label';
import Button from '../common/Button';
import RequestedOrderComponent from './RequestedOrderComponent';
import { orderStatus } from './Constants';

const mapStateToProps = state => {
    return {
      menu: state.order.menu,
      cart: state.order.cart,
      recentOrder: state.order.recentOrder,
      user: state.order.userProfile
    }
}


const mapDispatchToProps = (dispatch) =>{
    return {
        updateCart: bindActionCreators( updateCart, dispatch),
        fetchRecentOrder: bindActionCreators( fetchRecentOrder, dispatch),
        emptyCart: bindActionCreators( emptyCart, dispatch),
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
                        <NumericInput minValue={0}
                                      initValue={item.quantity}
                                      maxValue={50}
                                      totalWidth={60} 
                                      totalHeight={30}
                                      onChange={value => this.onPressNumericInput(item, value)} />
                    }
                    title = {
                        item.isExtraItem ?
                          <Row>
                              {item.name && <Label style = {styles.extraItemText} text={item.name}/>}
                          </Row>
                        :
                            <Row>
                              <View>
                                  {
                                    (item.veg === true) ?
                                    <Icon
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
                              {item.name && <Label style = {styles.menuItemText} text={item.name}/>}
                          </Row>
                        
                    }
                    
                    topDivider = { true }
                    
                    subtitle={'₹' + item.price}
                    subtitleStyle={item.isExtraItem?styles.extraItemSubText:''}
                    hideChevron={true}
                />
            );
        };

        var mo = [...this.props.menu]
        console.log("Menu behind scenes, Mo:");
        var menuToBeDisplayed = []
        console.log("Menu for customer, Mn:", menuToBeDisplayed);
        console.log("Shopping cart: ", this.props.cart);
        mo.forEach((item) => {
            x = new MenuItem(item.id, item.name, false, item.price, item.quantity, item.veg);
            menuToBeDisplayed.push(x);
            var itemInCart = this.props.cart.find(c=>c.id===item.id.toString() && c.quantity>0);
            if(itemInCart){
                x.quantity = itemInCart.quantity;
                item.extras.forEach((extra)=>{
                    var itemInCart = this.props.cart.find(c=>c.id===getIdForExtra(item.id, extra.id) && c.quantity>0);
                    extra.quantity = itemInCart?itemInCart.quantity : 0; 
                    menuToBeDisplayed.push(
                        new MenuItem(getIdForExtra(item.id, extra.id), extra.name, true, extra.price, extra.quantity, extra.veg));    
                })
            }
            else{
                x.quantity=0;
                item.extras.forEach((extra)=>{
                    var index = menuToBeDisplayed.findIndex(m=>m.id===getIdForExtra(item.id, extra.id));
                    if(index>-1){
                        menuToBeDisplayed.splice(index, 1);
                    }    
                })
            }
            console.log("Mn after item:", menuToBeDisplayed, item);
        })

        return (
                <FlatList 
                    data={menuToBeDisplayed}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
        );
    }
}

const getIdForExtra = (mainItemId, extraItemId) => (mainItemId.toString()+"."+extraItemId.toString());

const getTotalCartValue = (cartItems) => (cartItems.reduce((acc, ci) => acc + (ci.price * ci.quantity), 0));
const getTotalCartItems = (cartItems) => (cartItems.reduce((acc, ci) => acc + (ci.quantity), 0));

function MenuItem(id, name, isExtraItem, price, quantity, veg){
  this.id=id.toString(),
  this.name=name,
  this.isExtraItem=isExtraItem,
  this.price=price,
  this.quantity=quantity,
  this.veg=veg
}


class Home extends Component {

    state = {
        visible: false,
    };

    setVisible(visible) {
        this.setState({visible: visible});
    }

    constructor(props){
        super(props);
        this.onPressButton = this.onPressButton.bind(this);
    }

    static navigationOptions = {
        title:'Home'
    };

    onPressButton = () => {
        // fetchRecentOrder() is supposed to call backend which updates order status to requested and returns the order with updated status- 
        // and hence changes recentorder property of state- and hence on rerendering which then 
        // will make condition in render() function true hence rendering the requestedorder component. 
        // i.e the line to explicitly navigate to requestedcomponent is unnecessary when integrated with backend
        if(typeof this.props.cart !== 'undefined' && this.props.cart.length > 0){
            this.props.fetchRecentOrder(); // does not change redux state
            this.props.navigation.navigate('RequestedOrder');
        }
        else {
            this.setVisible(!this.state.visible);
        }
    }

    componentDidMount() {
        this.props.fetchRecentOrder();
    }

    render(){
        return(
            this.props.recentOrder && this.props.recentOrder.status===orderStatus.REQUESTED?
            <RequestedOrderComponent/> :
            (<ScrollView>
             <Dialog
                visible={this.state.visible}
                onTouchOutside={() => {
                  this.setVisible(false);
                }}
              >
                <DialogContent>
                    <View style={styles.dialogContent}>
                    <Text>But your cart is empty.</Text>
                    </View>
                </DialogContent>
              </Dialog>
            <Card>
            {this.props.user?
              <Text style={styles.menuSmallText} >Place your lunch order before 10:30am for assured delivery.{"\n"}</Text>:
              <Text style={styles.menuSmallText} >You need to be logged in to place an order.{"\n"}</Text>
            }
            <List menu={this.props.menu}
                  cart={this.props.cart}
                  updateCart={this.props.updateCart}
                  />
            <TouchableOpacity 
                onPress={() => this.onPressButton()}
                disabled={this.props.user?false:true}
                style={this.props.user? styles.button : styles.disabledButton}
            >
                <View style={styles.row}>
                  <Text style={styles.totalLabel}>{getTotalCartItems(this.props.cart)+" Items"+"| ₹"+getTotalCartValue(this.props.cart).toString()}</Text>
                  <Text style={styles.label}>Place Request</Text>
                </View>
            </TouchableOpacity>
            </Card>
            </ScrollView>)
            
        );
    }
}

const styles = StyleSheet.create({
    dialogContent: {
        marginTop: 20
    },
    menuSmallText: {
        fontSize: 15
    },
    menuItemText: {
        fontWeight: 'bold',
        fontSize: 20
    },
    extraItemText: {
        fontSize: 20,
        marginLeft:30
    },
    extraItemSubText: {
        marginLeft:30
    },
    totalLabel: 
     {
        color: '#fff',
        fontSize: 16
     },
    label: 
    {
       color: '#fff',
       fontSize: 20,
       marginLeft:70
    },
     alignRight: 
     {
     },
     row: {
        flex: 1,
        flexDirection: "row"
     },
     button: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#512DA8'
     },
     disabledButton: {
        // alignItems: 'center',
        // justifyContent: 'center',
        padding: 20,
        backgroundColor: '#D3D3D3'
     }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);