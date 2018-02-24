import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Link, browserHistory, IndexRedirect } from 'react-router'

import configureStore from './store';
import contractHelper from './contractHelper/';
import Page2 from './page2/';
import Sidebar from './base/components/Sidebar';

const store = configureStore();

const router = (
  <Router history={browserHistory}>
    <Route path="/" component={ Sidebar }>
      <IndexRedirect to="/contract_helper" />
      <Route path="contract_helper" component={ contractHelper }/>
      <Route path="page2" component={ Page2 }/>
    </Route>
  </Router>
)

render(
  <Provider store={store}>
    { router }
  </Provider>,

  document.getElementById('app')
);
