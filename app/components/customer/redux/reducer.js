import * as ActionTypes from './ActionTypes';
import {fromJS} from 'immutable';

const initialState = {
    isLoading: true,
    errMess: null,
    menu:[],
    cart:[],
    recentOrder: null,
    userProfile: null
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
          var index = newCart.findIndex(x => x.id === action.payload.id)
          if(index <= -1){
            if(action.payload.quantity>0){
              newCart.push(new CartItem(
                action.payload.id, action.payload.name, action.payload.isExtraItem, action.payload.price, action.payload.quantity));
            }
          }
          else{
            console.log("item value in old cart: ",newCart[index]); 
            if(action.payload.quantity<=0){
              newCart.splice(index, 1);
              if(action.payload.isExtraItem===false){
                newCart = removeDependentItems(newCart, action.payload.id);
              }
            }
            else{
              newCart[index].quantity = action.payload.quantity;
            }
          }
          console.log("item value in new cart: ",newCart[index], action.payload);
          return {...state, cart: newCart}
      
      case ActionTypes.EMPTY_CART:
          console.log("Emptying cart");
          return {...state, cart: []}
      
      case ActionTypes.UPDATE_RECENT_ORDER:
        return {...state, recentOrder: action.payload, isLoading: true, errMess: null}

      case ActionTypes.LOGIN:
        return {...state, userProfile: action.payload, errMess:null}

      case ActionTypes.LOGOUT:
        return {...state, userProfile: null, errMess:null}

      default:
        return state;
    }
    
};

const removeDependentItems = (newCart, mainItemId) => {
  console.log("in here");
  dependentItems = newCart.filter(i=>i.isExtraItem===true && i.id.split(".")[0]===mainItemId);
  console.log(dependentItems);
  newCart = newCart.filter(i=>!dependentItems.includes(i));
  console.log(newCart);
  return newCart
}

function CartItem(id, name, isExtraItem, price, quantity){
  this.id=id,
  this.name=name,
  this.isExtraItem=isExtraItem,
  this.price=price,
  this.quantity=quantity
}
