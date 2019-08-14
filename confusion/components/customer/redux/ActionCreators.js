import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../config/baseUrl';

export const menuLoading = () => ({
    type: ActionTypes.MENU_LOADING
});

export const menuFailed = (errmess) => ({
    type: ActionTypes.MENU_FAILED,
    payload: errmess
});

export const addMenu = (menu) => ({
    type: ActionTypes.FETCH_MENU,
    payload: menu
});

export const updateCart = (meal) => ({
    type: ActionTypes.UPDATE_CART,
    payload: meal
});

export const updateRecentOrder = (order) => ({
    type: ActionTypes.UPDATE_RECENT_ORDER,
    payload: order
});

export const emptyCart = () => ({
    type: ActionTypes.EMPTY_CART,
    payload: null
});

export const login = (user) => ({
  type: ActionTypes.LOGIN,
  payload: user
});

export const logout = (user) => ({
  type: ActionTypes.LOGOUT,
  payload: user
});