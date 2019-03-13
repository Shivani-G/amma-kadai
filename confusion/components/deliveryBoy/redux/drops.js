import * as ActionTypes from './ActionTypes';

export const drops = (state = { isLoading: true,
                                 errMess: null,
                                 drops:[]}, action) => {
  switch (action.type) {
      case ActionTypes.ADD_DROPS:
          return {...state, isLoading: false, errMess: null, drops: action.payload};

      case ActionTypes.DROPS_LOADING:
          return {...state, isLoading: true, errMess: null, drops: []}

      case ActionTypes.DROPS_FAILED:
          return {...state, isLoading: false, errMess: action.payload};

      default:
        return state;
    }
};