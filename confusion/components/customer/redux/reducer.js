import * as ActionTypes from './ActionTypes';
import {fromJS} from 'immutable';

const initialState = {
    isLoading: true,
    errMess: null,
    menu:[],
    userId: 1,
    cart:[]
};

export const order = (state = initialState, action) => {
  switch (action.type) {
      case ActionTypes.FETCH_MENU:
          return {...state, isLoading: false, errMess: null, menu: action.payload};

      case ActionTypes.MENU_LOADING:
          return {...state, isLoading: true, errMess: null, menu: []}

      case ActionTypes.MENU_FAILED:
          return {...state, isLoading: false, errMess: action.payload};
      
      case ActionTypes.UPDATE_CART:
          newCart = [...state.cart];
          var index = newCart.findIndex(x => x.id === action.payload.id && x.isExtraItem === action.payload.isExtraItem)
          if(index <= -1){
            newCart.push(new CartItem(
              action.payload.id, action.payload.name, action.payload.isExtraItem, action.payload.price, action.payload.id.quantity));
          }
          else{
            console.log("item value in old cart: ",newCart[index]);
            if(action.payload.quantity<=0){
              newCart.splice(index, 1);
            }
            else{
              newCart[index].quantity = action.payload.quantity;
            }
          }
          console.log("item value in new cart: ",newCart[index], action.payload);
          return {...state, cart: newCart}

      default:
        return state;
    }
};

function CartItem(id, name, isExtraItem, price, quantity){
  this.id=id,
  this.name=name,
  this.isExtraItem=isExtraItem,
  this.price=price,
  this.quantity=quantity
}
