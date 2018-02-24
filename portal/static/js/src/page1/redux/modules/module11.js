import axios from 'axios';
import { Map, List } from 'immutable';

// App
import { MODULE_NAME } from '../constants';

const CURRENT_NAME = 'module11';

// ACTION CONSTANTS
const GET_REQUEST = `${MODULE_NAME}/${CURRENT_NAME}/GET_REQUEST`;
const GET_SUCCESS = `${MODULE_NAME}/${CURRENT_NAME}/GET_SUCCESS`;

const NOTIFY_REQUEST = `${MODULE_NAME}/${CURRENT_NAME}/NOTIFY_REQUEST`;
const NOTIFY_SUCCESS = `${MODULE_NAME}/${CURRENT_NAME}/NOTIFY_SUCCESS`;
const NOTIFICATION_ADD = `${MODULE_NAME}/${CURRENT_NAME}/NOTIFICATION_ADD`;
const NOTIFICATION_REMOVE = `${MODULE_NAME}/${CURRENT_NAME}/NOTIFICATION_REMOVE`;

const URL_BASE = '/api/v1/document/';
const getDocumentByKey = (key) => `${URL_BASE}${key}`;

// ACTION CREATORS
const getRequest = () => {
  return {
    type: GET_REQUEST
  }
};

const getSuccess = (data) => {
  return {
    type: GET_SUCCESS,
    data
  }
};


// ACTION CREATORS
const notifyRequest = () => {
  return {
    type: NOTIFY_REQUEST
  }
};

const notifySuccess = () => {
  return {
    type: NOTIFY_SUCCESS
  }
};

export const notificationAdd = (data) => {
  return {
    type: NOTIFICATION_ADD,
    data
  }
};

export const notificationRemove = (data) => {
  return {
    type: NOTIFICATION_REMOVE,
    data
  }
};

// Async actions
export const getFromServer = () => {
  return (dispatch, getState) => {
    dispatch(getRequest());
    return axios.get(URL_BASE)
      .then(response => {
        dispatch(getSuccess(response.data && response.data[0]))
      }).catch((err) => {
        console.error(err.response || err);
        throw err;
      });
  }
};

// Async actions
export const notifyServer = () => {
  return (dispatch, getState) => {
    dispatch(notifyRequest());
    return axios.get(getDocumentByKey('notify_action'))
      .then(response => {
        dispatch(notifySuccess())
      }).catch((err) => {
        console.error(err.response || err);
        throw err;
      });
  }
};


// REDUCERS
const initialState = Map({
  isInitialized: false,
  isNotify: false,
  notifyStatus: '',
  notifications: List()
});


export default (state=initialState, action={}) => {
  switch (action.type) {
  case GET_REQUEST: {
    return state
  }

  case GET_SUCCESS: {
    return state.merge({
      isInitialized: true,
      ... action.data
    })
  }

  case NOTIFY_REQUEST: {
    return state.merge({
      notifyStatus: 'Requested Server',
    })
  }

  case NOTIFY_SUCCESS: {
    return state.merge({
      notifyStatus: 'Waiting for Socket',
      isNotify: true,
    })
  }

  case NOTIFICATION_ADD: {
    return state.update('notifications', notifications => notifications.insert(0, Map(action.data))).merge({
      isNotify: false
    });
  }

  case NOTIFICATION_REMOVE: {
    return state.update('notifications', notifications => notifications.filter(x => x.get('message_uuid') !== action.data.message_uuid));
  }

  default: {
    return state
  }
  }
};
