import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import uiReducer from './reducers/uiReducer';

const initialState = {};
const middleware = [thunk];

const reducers = combineReducers({
    ui: uiReducer
})

const composeEnhancers = typeof window === "object"
    && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middleware));
const store = createStore(reducers, initialState, enhancer);

export default store;