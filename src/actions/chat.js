import * as types from './actionTypes';
import Api from '../lib/api';
import * as config from '../config/';
import {ToastAndroid} from 'react-native';

export function receiveChatList(data) {
  return {
    type: types.RECEIVE_CHAT_LIST,
    data: data
  };
}
export function receiveChatMessageList(data) {
  return {
    type: types.RECEIVE_CHAT_MESSAGE_LIST,
    data: data
  };
}
export function fetchChatList() {
  return (dispatch, getState) => {
    const params = {
      //action_key: "Pu0QUvj82x",
      //url: schoolId,
    }
    return Api.get(config.app_api_url+'/chat', params).then( resp => {
      if(resp.success == true){
        //console.log(resp.data);
        dispatch(receiveChatList(resp.data))
      }
    }).catch( (ex) => {
      //console.log(ex);
      var exText = "" + ex;
      ToastAndroid.show(exText, ToastAndroid.SHORT)
    });
  }
}
export function fetchChatMessageList() {
  return (dispatch, getState) => {
    const params = {
      action_key: "getChatMessageList"
    };
    return Api.post(config.app_api_url+'/chat', params).then( resp => {
      console.log(resp);
      if(resp.success == true){
        console.log(resp.data);
        dispatch(receiveChatMessageList(resp.data))
      }
    }).catch( (ex) => {
      var exText = "" + ex;
      console.log(exText);
      ToastAndroid.show(exText, ToastAndroid.SHORT)
    });
  }
}
