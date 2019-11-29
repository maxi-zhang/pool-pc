import {createStore,compose,applyMiddleware} from 'redux'
import reducers from './reducer'
import {persistStore, persistReducer} from 'redux-persist';
import thunk from 'redux-thunk';
import {routerMiddleware} from 'react-router-redux';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

let createHistory = require('history').createHashHistory;
let history = createHistory();   // 初始化history
let routerWare = routerMiddleware(history);

const persistConfig = {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel2
};

const myPersistReducer = persistReducer(persistConfig, reducers)

// const store = createStore(myPersistReducer,
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(applyMiddleware(thunk, routerWare))
// )
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(myPersistReducer, composeEnhancers(
    applyMiddleware(thunk, routerWare)
));

export const persistor = persistStore(store)

export default store
