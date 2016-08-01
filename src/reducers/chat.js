import * as types from '../actions/actionTypes';

const initialState = {
  //isLoading: true,
  result: {
    items: []
  }
};

export default function chat(state = initialState, action = {}) {
  switch (action.type) {
    case types.RECEIVE_CHAT_LIST:
      return Object.assign({}, state, {
        //isLoading: false,
        result: Object.assign({}, state.result, {
          items: action.data.map(function(object, i){
            return {name: object.title, img: object.posters.thumbnail, lastChatText: 'Oh yeah?'};
          })
        }),
      })
    default:
      return state;
  }
}
