import { combineReducers } from 'redux';
import chat from './chat';
import navigator from './navigator';
import login from './login';
import schoolSetting from './setting';
import school from './school';

const camemisApp = combineReducers({
  chat,
  login,
  navigator,
  schoolSetting,
  school,
});
export default camemisApp;

//====>>>>>is equivalent to below comment block

// export default function todoApp(state = {}, action) {
//   return {
//     visibilityFilter: visibilityFilter(state.visibilityFilter, action),
//     todos: todos(state.todos, action)
//   }
// }
