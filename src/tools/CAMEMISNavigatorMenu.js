'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet,Navigator, View,Text } from 'react-native';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import CamemisToolbar from '../components/toolbar';
import Dashboard from '../components/dashboard';
import Academic from '../components/academic';
import Schedule from '../components/schedule';
import Attendance from '../components/attendance';
import Discipline from '../components/discipline';
import Transcript from '../components/transcript';
import ChatList from '../components/chatList';
import ChatRoom from '../components/chatRoom';
import {navOnDidFocus} from '../actions/navigator';
import t from '../languages/menu';
var MUNUROUTES;
var toolbarActions = [
  {title: 'Chat List', icon: 'comment', action: 'chatList'},
];
class CAMEMISNavigatorMenu extends Component{
  constructor(props) {
    super(props);
  }
  componentWillMount(){
    var language = this.props.schoolSetting.LANGUAGE;
    t.setLanguage(language);
    MUNUROUTES = {
        dashboard: {
          Component:Dashboard,
          title: t.getString("DASHBOARD", language)
        },
        academic: {
          Component:Academic,
          title:t.getString("ACADEMIC", language)
        },
        schedule: {
          Component:Schedule,
          title:t.getString("SCHEDULE", language)
        },
        attendance: {
          Component: Attendance ,
          title:t.getString("ATTENDANCE", language)
        },
        discipline: {
          Component:Discipline,
          title:t.getString("DISCIPLINE", language)
        },
        transcript: {
          Component:Transcript,
          title:t.getString("TRANSCRIPT", language)
        },
        chatList: {
          Component:ChatList,
          title:t.getString("CHAT", language)
        },
        chatRoom: {
          Component:ChatRoom,
          title:t.getString("CHAT_ROOM", language)
        },
    };
  }
  render(){
    return(
      <Navigator
          ref={this.props.refName}
          style={styles.container}
          initialRoute={{name: 'dashboard'}}
          renderScene={(route, navigator) =>this.renderScene(route, navigator)}
          configureScene={(route, routeStack) => Navigator.SceneConfigs.FloatFromRight}
          onDidFocus={(route) => {
            this.props.dispatch(navOnDidFocus())
          }}
      />
    );
  }
  renderScene(route, navigator){
      var CamemisRoute = MUNUROUTES[route.name];
      var MySceneComponent = CamemisRoute.Component;
      if(route.name=='chatList'){
        return (
          <View style={{flex: 1,}}>
            <View style={styles.container}>
              <MySceneComponent route={route} navigator={navigator} />
            </View>
          </View>
        );
      }else{
        return (
          <View style={{flex: 1,}}>
            <View>
              <CamemisToolbar navIcon="bars" title={CamemisRoute.title} onNavIconPress={this._openDrawer} onActionSelected={this._onActionSelected} actions={toolbarActions} />
            </View>
            <View style={styles.container}>
              <MySceneComponent route={route} navigator={navigator} />
            </View>
          </View>
        );
    }
  }
  _openDrawer = () => {
    this.props.openDrawer();
  }
  _onActionSelected = (action) => {
    switch (action) {
      case 'chatList':
        this.props.navigator.push({name: 'chatList'});
        break;
      case 1:
        this.props.navigator.pop();
        break;
      default:
        tthis.props.navigator.pop();
    }
  }
}

CAMEMISNavigatorMenu.propTypes = {
    refName: React.PropTypes.func,
};

const styles = StyleSheet.create({
  container:{
      flex: 1,
      backgroundColor: '#FFFFFF',
      shadowColor: "#000000",
  },
});
const mapStateToProps = (state) => {
  const lang = state.schoolSetting.LANGUAGE;
  return {
    login: state.login,
    school: state.school,
    schoolSetting: state.schoolSetting,
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect(mapStateToProps)(CAMEMISNavigatorMenu);
