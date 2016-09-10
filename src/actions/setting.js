import * as types from './actionTypes';
import Api from '../lib/api';
import {ToastAndroid} from 'react-native';
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
