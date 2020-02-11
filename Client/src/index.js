import React from 'react';
import ReactDom from 'react-dom';
import App from './Component/App';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware, compose} from 'redux';
import Reducers from './Component/Reducers';
import reduxthunk from 'redux-thunk';
import setAuthHeader from './Component/utils/setAuthHeader';
import {LoginProfil,GetCurrentUser,LogOutProfil} from './Component/Action';
import jwt_decode from 'jwt-decode'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(Reducers,composeEnhancers(applyMiddleware(reduxthunk)));

if (localStorage.getItem('jwtToken')) {
    const currentTime = Date.now() /1000;
    const decode= jwt_decode(localStorage.getItem('jwtToken'))

if (currentTime> decode.exp) {
    store.dispatch(LogOutProfil)
}else{
    setAuthHeader(localStorage.getItem('jwtToken'))
    store.dispatch(GetCurrentUser())
}

}



ReactDom.render(
<Provider  store={store}>
<App/>
</Provider>



,document.querySelector('#root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

