import * as types from './actionTypes';

export function doSetting(key, value) {
  return {
    type: types.DO_SETTING,
    key: key,
    value: value
  };
}

export function saveSetting(key, value){
    return (dispatch, getState) => {
        return dispatch(doSetting(key, value));
    }
}
