import * as types from '../actions/actionTypes';

const initialState = {
  list: {},
  messageList: {}
};

export default function chat(state = initialState, action = {}) {
  switch (action.type) {
    case types.RECEIVE_CHAT_LIST:
      return Object.assign({}, state, {list: action.data});
    case types.RECEIVE_CHAT_MESSAGE_LIST:
      return Object.assign({}, state, {messageList: action.data});
    default:
      return state;
  }
}
