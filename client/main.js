import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { ConnectedRouter, routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history';

import { setAppInitialState } from '/imports/redux/app-reducer';
import createRootReducer from '/imports/redux/reducers';
import App      from '/imports/ui/App'

import '/imports/startup/accounts-config.js';

const history    = createBrowserHistory();
const middleware = routerMiddleware(history);

setAppInitialState({});

const store = createStore(createRootReducer(history), {}, applyMiddleware(middleware));

Meteor.startup(() => {
  render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('react-target')
  );
});
