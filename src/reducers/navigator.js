import * as types from '../actions/actionTypes';

const initialState = {
  navOnDidFocus: false
};

export default function navigator(state = initialState, action = {}) {
  switch (action.type) {
    case types.NAV_ON_DID_FOCUS:
      return {
        navOnDidFocus: !state.navOnDidFocus
      };

    default:
      return state;
  }
}
