import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import io from 'socket.io-client';

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

const socket = io(serverAddress);
const reducers = combineReducers({
  contract_helper,
  module1,
  user
});

export const socketMiddleware = (socket) => {
  return ({ dispatch }) => {
    socket.on('message', resp => {
      dispatch(notificationAdd(resp));
      setTimeout(() => dispatch(notificationRemove(resp)), 1000 * 10);
    });

    return next => action => {
      return next(action);
    }
  };
};

function reduxStore(initialState) {
  const store = createStore(
    reducers,
    initialState,
    compose(
      applyMiddleware(
        thunk,
        socketMiddleware(socket)
      ),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );
  return store;
}

export default reduxStore;
