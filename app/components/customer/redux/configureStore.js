import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { order } from './reducer';


const middleware = applyMiddleware(thunk,logger);

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            order
        }),
        middleware
    );

    return store;
}