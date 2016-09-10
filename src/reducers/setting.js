import * as types from '../actions/actionTypes';

export default function setting(state={SCHOOL_NAME:null, MOBILE_URL: null , MOBILE_CODE: null, LANGUAGE: null}, action = {}) {
  switch (action.type) {
    case types.DO_SETTING:
      var a = Object.assign({},state);
      a[action.key] = action.value;
      return a;
    default:
      return state;
  }
}
