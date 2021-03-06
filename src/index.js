import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import  orderReducer from './store/reducers/order'
import authReducer from './store/reducers/auth'
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
    order: orderReducer,
    auth: authReducer
})

const store = createStore(rootReducer , applyMiddleware(thunk))

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)
ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
