import axios from 'axios';
import { Map, List } from 'immutable';
import Cookies from "universal-cookie";

// App
import { MODULE_NAME } from '../constants';

const CURRENT_NAME = 'contract_helper';

// ACTION CONSTANTS
const GET_REQUEST = `${MODULE_NAME}/${CURRENT_NAME}/GET_REQUEST`;
const GET_SUCCESS = `${MODULE_NAME}/${CURRENT_NAME}/GET_SUCCESS`;

const UPLOAD_REQUEST = `${MODULE_NAME}/${CURRENT_NAME}/UPLOAD_REQUEST`;
const UPLOAD_SUCCESS = `${MODULE_NAME}/${CURRENT_NAME}/UPLOAD_SUCCESS`;
const NOTIFICATION_ADD = `${MODULE_NAME}/${CURRENT_NAME}/NOTIFICATION_ADD`;
const NOTIFICATION_REMOVE = `${MODULE_NAME}/${CURRENT_NAME}/NOTIFICATION_REMOVE`;
const ADD_FILE = `${MODULE_NAME}/${CURRENT_NAME}/ADD_FILE`;


var cookies = new Cookies();
var axiosConf = { headers: { 'Content-Type': 'application/json', Accept: 'application/json' } };

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
const uploadRequest = () => {
  return {
    type: UPLOAD_REQUEST
  }
};

const uploadSuccess = (sentences,highlight) => {
  return {
    type: UPLOAD_SUCCESS,
    sentences: sentences,
    highlight: highlight
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

export const addFile = (file) => {
  return {
    type: ADD_FILE,
    file: file
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
export const uploadFile = (data, headers) => {
  var formData = new FormData();
  formData.append("image", data);
  console.log(formData);
  return (dispatch, getState) => {
    dispatch(uploadRequest());
    return axios.post('/upload/', formData, {headers: { 'content-type': 'multipart/form-data;boundary=BoUnDaRyStRiNg' }})
      .then(response => {
        dispatch(uploadSuccess(response.data.sentences,response.data.highlights))
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
  notifications: List(),
  uploaded_contract: [],
  sentences:[],
  highlight: []
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

  case UPLOAD_REQUEST: {
    return state.merge({
      isInitialized: 'req',
    })
  }

  case UPLOAD_SUCCESS: {
    return state.merge({
      isInitialized: 'succ',
      sentences: action.sentences,
      highlight: action.highlight
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

  case ADD_FILE: {
    return state.merge({
      uploaded_contract: action.file
    })
  }

  default: {
    return state
  }
  }
};
