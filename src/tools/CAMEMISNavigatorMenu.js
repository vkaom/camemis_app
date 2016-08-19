'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet,Navigator, View } from 'react-native';
import CamemisToolbar from '../components/toolbar';
import Dashboard from '../components/dashboard';
import Academic from '../components/academic';
import Schedule from '../components/schedule';
import Attendance from '../components/attendance';
import Discipline from '../components/discipline';
import Transcript from '../components/transcript';
import ChatList from '../components/chatList';
import {navOnDidFocus} from '../actions/navigator';
var MUNUROUTES = {
    dashboard: {
      Component:Dashboard,
      title:'My Dashboard'
    },
    academic: {
      Component:Academic,
      title:'My Academic'
    },
    schedule: {
      Component:Schedule,
      title:'My Schedule'
    },
    attendance: {
      Component:Attendance,
      title:'My Attendance'
    },
    discipline: {
      Component:Discipline,
      title:'My Discipline'
    },
    transcript: {
      Component:Transcript,
      title:'My Transcript'
    },
    chatList: {
      Component:ChatList,
      title:'ChatList'
    },
};
var toolbarActions = [
  {title: 'Chat List', icon: 'comment', action: 'chatList'},
];
class CAMEMISNavigatorMenu extends Component{
  constructor(props) {
    super(props);
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
              <CamemisToolbar title={CamemisRoute.title} openDrawer={this._openDrawer} onActionSelected={this._onActionSelected} actions={toolbarActions} />
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
export default connect()(CAMEMISNavigatorMenu);
