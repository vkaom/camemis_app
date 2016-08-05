import * as chatActions from './chat';
import * as loginActions from './login';
import * as settingActions from './setting';
//import * as navigatorActions from './navigator';
//***not gonna work
//export const ActionCreators = {chatActions};
//***use below

export const ActionCreators = Object.assign({},
  //navigatorActions,
  chatActions,
  loginActions,
  settingActions,
);
