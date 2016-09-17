import * as types from './actionTypes';
import * as config from '../config/';
import Api from '../lib/api';
import {ToastAndroid} from 'react-native';

export function populateSchoolInfo(school){
  return {
    type: types.POPULATE_SCHOOL_INFO,
    school: school,
  };
}
export function checkSchool(schoolId) {
  return (dispatch, getState) => {
    var baseUrl = getState().schoolSetting.MOBILE_URL;
    const params = {
      action_key: "Pu0QUvj82x",
      url: schoolId,
    }
    //console.log(config.app_api_url);
    return Api.post(config.app_api_url, params).then( resp => {
      //console.log(resp);
      if(resp.success == true){
        resp.data.schoolId = schoolId;
        dispatch(populateSchoolInfo(resp.data));
      }
    }).catch( (ex) => {
      var exText = "" + ex;
      //console.log(exText);
      ToastAndroid.show(exText, ToastAndroid.SHORT)
    });
  }
}
