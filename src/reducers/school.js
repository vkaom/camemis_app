import * as types from '../actions/actionTypes';

const initialState = {
  schoolId: "",
  schoolName:"",
  schoolPhone: "",
  schoolEmail: "",
};
export default function school(state = initialState, action = {}) {

  switch (action.type) {
    case types.POPULATE_SCHOOL_INFO:
      return Object.assign({}, state, {
        schoolId: action.school.schoolId? action.school.schoolId: "",
        schoolName: action.school.name? action.school.name : "",
        schoolPhone: action.school.phone? action.school.phone : "",
        schoolEmail: action.school.email? action.school.email : "",
      });
    default:
      return state;
  }
}
