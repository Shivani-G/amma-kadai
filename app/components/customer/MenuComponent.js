import React, { Component } from 'react';
import { View, FlatList, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';



const List = ({updateCart}) => {


    // onPressNumericInput = (item, value) => {
    //     item.quantity=value;
    //     console.log(item.name+":"+item.quantity);
    //     this.props.updateCart(item)

    // }





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
