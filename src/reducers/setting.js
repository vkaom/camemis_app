import * as types from '../actions/actionTypes';



export default function setting(state={SCHOOL_NAME:null, SCHOOL_ID: "", MOBILE_URL: null , MOBILE_CODE: null, LANGUAGE: null}, action = {}) {
  switch (action.type) {
    case types.DO_SETTING:
      var a = Object.assign({},state);
      a[action.key] = action.value;
      return a;
    case types.CHECK_SCHOOL:
      return Object.assign({}, state, {SCHOOL_ID: action.schoolId});
    default:
      return state;
  }
}
