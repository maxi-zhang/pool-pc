import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './store/index'
import {persistor} from "./store/index";
import {PersistGate} from 'redux-persist/lib/integration/react'

import './css/index.less'
// import Router from './Router';
import Index from './components/Index'
import * as serviceWorker from './serviceWorker';

import Initialize from "./components/common/view/Initialize"
import App from './App'


// ReactDOM.render(<Router />, document.getElementById('root'));
ReactDOM.render(<Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
        <Initialize />
        <Index />
        {/*<App />*/}
    </PersistGate>
</Provider>, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
