import * as types from '../actions/actionTypes';

const initialState = {
  tokenId: "",
  code: "",
  lastname: "",
  firstname: "",
  email: "",
  phone: "",
};

export default function login(state = initialState, action = {}) {
  switch (action.type) {
    case types.DO_LOGIN:
      return action.data;
    case types.DO_LOGOUT:
        return initialState;
    default:
      return state;
  }
}
