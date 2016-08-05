import * as types from '../actions/actionTypes';

export default function login(state = false, action = {}) {
  switch (action.type) {
    case types.DO_LOGIN:
      return true;
    case types.DO_LOGOUT:
        return false;
    default:
      return state;
  }
}
