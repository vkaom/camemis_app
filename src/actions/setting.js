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

export function updateSchoolId(schoolId){
  return {
    type: types.CHECK_SCHOOL,
    schoolId: schoolId,
  };
}
export function checkSchool(schoolId) {
  return (dispatch, getState) => {
    var baseUrl = getState().schoolSetting.MOBILE_URL;
    const params = [
      //`i=${encodeURIComponent(ingredients)}`,
      //'p=1'
    ].join('&')

    return Api.get('https://raw.githubusercontent.com' + `/facebook/react-native/master/docs/MoviesExample.json`).then( resp => {
      //if(schoolId == "12345"){
        dispatch(updateSchoolId(schoolId))
      //}
    }).catch( (ex) => {
      var exText = "" + ex;
      ToastAndroid.show(exText, ToastAndroid.SHORT)
    });
  }
}
