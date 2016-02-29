import "babel-polyfill";

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { ReduxRouter, reduxReactRouter, pushState } from 'redux-router';
import createHistory from 'history/lib/createBrowserHistory';

import routes from '../routes';
import reducer from '../reducers';
import config from '../config';

var finalCreateStore = compose(
  applyMiddleware(thunk),
  reduxReactRouter({ routes, createHistory })
)(createStore);

function configureStore(initialState) {
  var store = finalCreateStore(reducer, initialState);
  return store;
}

const store = configureStore();

const container = document.createElement('div');
document.body.appendChild(container);

ReactDOM.render(
  <Provider store={store}>
    <ReduxRouter />
  </Provider>,
  container
);
