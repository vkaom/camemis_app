import * as types from './actionTypes';
import Api from '../lib/api';
import {ToastAndroid} from 'react-native';
export function receiveChatList(data) {
  return {
    type: types.RECEIVE_CHAT_LIST,
    data: data
  };
}
export function fetchChatList() {
  return (dispatch, getState) => {
    const params = [
      //`i=${encodeURIComponent(ingredients)}`,
      //'p=1'
    ].join('&')
    return Api.get(`/facebook/react-native/master/docs/MoviesExample.json`).then( resp => {
      dispatch(receiveChatList(resp.movies))
    }).catch( (ex) => {
      var exText = "" + ex;
      ToastAndroid.show(exText, ToastAndroid.SHORT)
    });
  }
}
