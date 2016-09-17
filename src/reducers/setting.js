import * as types from '../actions/actionTypes';
const initialState = {
  SCHOOL_NAME: "",
  MOBILE_URL: "",
  MOBILE_CODE: "",
  LANGUAGE: 'en',
};
export default function setting(state = initialState, action = {}) {
  switch (action.type) {
    case types.DO_SETTING:
      var a = Object.assign({},state);
      a[action.key] = action.value;
      return a;
    default:
      return state;
  }
}
