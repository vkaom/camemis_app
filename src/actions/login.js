import * as types from './actionTypes';

export function doLogin() {
  return {
    type: types.DO_LOGIN,
  };
}

export function doLogout() {
  return {
    type: types.DO_LOGOUT,
  };
}
