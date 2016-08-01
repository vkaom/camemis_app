import * as types from './actionTypes';

export function receiveChatList(data) {
  return {
    type: types.RECEIVE_CHAT_LIST,
    data: data
  };
}
export function fetchChatList() {
  var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';
  return (dispatch, getState) => {
    return fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        //console.log(responseData.movies);
        dispatch(receiveChatList(responseData.movies))
      })
      //.done();
    //console.log(getState());
  }
}
