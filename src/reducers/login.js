import * as types from '../actions/actionTypes';

const initialState = {
};

export default function login(state = initialState, action = {}) {
  switch (action.type) {
    case types.DO_LOGIN:
      return true;
    case types.DO_LOGOUT:
        return false;
    default:
      return false;
  }
}
