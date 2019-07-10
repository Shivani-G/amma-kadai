import * as ActionTypes from './ActionTypes';
import {fromJS} from 'immutable';

const initialState = {
    isLoading: true,
    errMess: null,
    drops:[],
    userId: 1,
    reached:[]
};

export const drops = (state = initialState, action) => {
  switch (action.type) {
      case ActionTypes.ADD_DROPS:
          return {...state, isLoading: false, errMess: null, drops: action.payload};

      case ActionTypes.DROPS_LOADING:
          return {...state, isLoading: true, errMess: null, drops: []}

      case ActionTypes.DROPS_FAILED:
          return {...state, isLoading: false, errMess: action.payload};
      
      case ActionTypes.ADD_DROP_TO_REACHED_LIST:
          newReachedList = [...state.reached];
          var index = newReachedList.indexOf(action.payload)
          if(index <= -1){
            newReachedList.push(action.payload);
          }
          return {...state, reached: newReachedList}
      
      case ActionTypes.REMOVE_DROP_FROM_REACHED_LIST:
          newReachedList = [...state.reached];
          var index = newReachedList.indexOf(action.payload)
          if(index > -1){
            newReachedList.splice(index, 1);
          }
          return {...state, reached: newReachedList}

      default:
        return state;
    }
};