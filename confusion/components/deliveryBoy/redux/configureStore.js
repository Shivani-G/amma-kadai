import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { drops } from './reducer';


const middleware = applyMiddleware(thunk,logger);

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            drops
        }),
        middleware
    );

    return store;
}