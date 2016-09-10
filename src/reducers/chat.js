import * as types from '../actions/actionTypes';

const initialState = {

};

export default function chat(state = initialState, action = {}) {
  switch (action.type) {
    case types.RECEIVE_CHAT_LIST:
      return state;
    default:
      return state;
  }
}
