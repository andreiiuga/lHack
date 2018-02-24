import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';

// App
import { reducers as contract_helper }  from './contractHelper';
import { notificationAdd,  notificationRemove}  from './contractHelper/redux/modules/contract_helper';
import { reducers as module1}  from './page2';
import { reducers as user } from './base';

let serverAddress;

if (window.location.hostname === 'localhost') {
  // If local bind the port
  serverAddress = `${window.location.protocol}//${window.location.hostname}:4000`;
} else {
  serverAddress = `${window.location.protocol}//${window.location.hostname}`;
}

const reducers = combineReducers({
  contract_helper,
  module1,
  user
});

function reduxStore(initialState) {
  const store = createStore(
    reducers,
    initialState,
    compose(
      applyMiddleware(
        thunk
      ),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );
  return store;
}

export default reduxStore;
