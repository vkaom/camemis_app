import * as types from './actionTypes';
import * as config from '../config/';
import Api from '../lib/api';
import {ToastAndroid} from 'react-native';

export function doLogin(data) {
  return {
    type: types.DO_LOGIN,
    data: data
  };
}

export function doLogout() {
  return {
    type: types.DO_LOGOUT,
  };
}

export function signin(username, password, role) {
  return (dispatch, getState) => {
    var baseUrl = getState().schoolSetting.MOBILE_URL;
    // const params = [
    //   `username=${encodeURIComponent(username)}`,
    //   `password=${encodeURIComponent(password)}`,
    //   `url=${encodeURIComponent(url)}`,
    //   `role=1`
    // ].join('&')
    const params = {
      username: username,
      password: password,
      role: role,
      action_key: "EnOLNTB1Q"
    }

    return Api.post(config.app_api_url, params).then( resp => {
      if(resp.success == true){
        dispatch(doLogin(resp.data));
      }
      return resp;
    }).catch( (ex) => {
      //console.log(ex);
      var exText = "" + ex;
      ToastAndroid.show(exText, ToastAndroid.SHORT)
    });
  }
}
