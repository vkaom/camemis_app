'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import {
    StyleSheet,
    View,
    ScrollView,
    Navigator,
    TouchableWithoutFeedback,
    PanResponder,
    LayoutAnimation,
    Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CamemisToolbar from './toolbar';
import CamemisSideBarNave from './sidebarnav';
import Dashboard from './dashboard';
import Academic from './academic';
import Schedule from './schedule';
import Attendance from './attendance';
import Discipline from './discipline';
import Transcript from './transcript';
import ChatList from './chatList';

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
      title:'My Gradebook'
    },
    chatList: {
      Component:ChatList,
      title:'ChatList'
    },
};
var toolbarActions = [
  {title: 'Chat List', icon: 'comment', action: 'chatList'},
];
var widthSideBar = 280;
var animate = {
      duration: 550,
      create: {
      type: LayoutAnimation.Types.easeInEaseOut,
      property: LayoutAnimation.Properties.opacity,
    },update: {
      type: LayoutAnimation.Types.easeInEaseOut,
      springDamping: 0.7,
    }};
class menu extends Component{
  constructor(props) {
    super(props);
    this.state = {
      _previousLeft: 0-Dimensions.get('window').width,
      _tranparant: 'rgba(0,0,0,0)',
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
    };

    this._ViewPanResponder = PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
        onPanResponderGrant: (evt, gestureState) => {

        },
        onPanResponderMove: (evt, gestureState) => {

        },
        onPanResponderTerminationRequest: (evt, gestureState) => true,
        onPanResponderRelease: (evt, gestureState) => {
          if(gestureState.dx < 0){
              this.setState({
                  _previousLeft:0-Dimensions.get('window').width,
                  width:Dimensions.get('window').width,
                  height:Dimensions.get('window').height,
              });
              LayoutAnimation.configureNext(animate);
          }else{

            if(evt.nativeEvent.locationX < 30){
                this.setState({
                    _previousLeft:0,
                    _tranparant: 'rgba(0,0,0,0)',
                    width:Dimensions.get('window').width,
                    height:Dimensions.get('window').height,
                });
                LayoutAnimation.configureNext(animate);
            }
          }
        },
        onPanResponderTerminate: (evt, gestureState) => {

        },
        onShouldBlockNativeResponder: (evt, gestureState) => {
          return true;
        },
      });
  }
  slidebarStyle(){
    return({
      flexDirection:'row',
      height:this.state.height,
      width:this.state.width,
      position: 'absolute',
      left: this.state._previousLeft,
      top: 0,
      backfaceVisibility: 'visible',
      justifyContent: 'flex-end',
      backgroundColor:this.state._tranparant,
    });
  }
  dropBlurStyle(){
    return({
        backgroundColor:'rgba(0,0,0,0.008)',
        width:this.state.width-widthSideBar,
    });
  }
  render() {
    return (
      <Navigator
          style={styles.container}
          ref={(navigator) => { this.navigator = navigator; }}
          initialRoute={{name: 'academic'}}
          renderScene={(route, navigator) =>this.renderScene(route, navigator)}
          configureScene={(route, routeStack) => Navigator.SceneConfigs.FloatFromRight}
      />
    );
  }
  renderScene(route, navigator){
      var CamemisRoute = MUNUROUTES[route.name];
      var MySceneComponent = CamemisRoute.Component;
      if(route.name=='chatList'){
          return (<View style={{flex:1}}>
                    <View style={styles.container}>
                      <MySceneComponent route={route} navigator={navigator} />
                    </View>
                    <View style={this.slidebarStyle()}>
                      <CamemisSideBarNave loggle={this._handleToggle} navigator={navigator} logout={this._logout}/>
                      <TouchableWithoutFeedback onPress={this._handleToggle}>
                        <View style={this.dropBlurStyle()} {...this._ViewPanResponder.panHandlers}></View>
                      </TouchableWithoutFeedback>
                    </View>
                  </View>
                );
      }
      return (
          <View style={{flex:1}}>
            <View style={{flex:1}}>
              <CamemisToolbar title={CamemisRoute.title} openDrawer={this._handleToggle} onActionSelected={this._onActionSelected} actions={toolbarActions} />
            </View>
            <View style={{flex:9}}>
              <MySceneComponent route={route} navigator={navigator} />
            </View>
            <View style={this.slidebarStyle()}>
              <CamemisSideBarNave loggle={this._handleToggle} navigator={navigator} logout={this._logout}/>
              <TouchableWithoutFeedback onPress={this._handleToggle}>
                <View style={this.dropBlurStyle()} {...this._ViewPanResponder.panHandlers}></View>
              </TouchableWithoutFeedback>
            </View>
        </View>
      );
  }
  _logout = () => {
      this.props.doLogout();
  }
  _changeRout = (route) => {
      this.navigator.push({name:route});
      this._handleToggle();
  }
  _handleToggle = () => {
      LayoutAnimation.configureNext(animate);
      this.setState({
        _previousLeft:this.state._previousLeft?0:0-Dimensions.get('window').width,
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
      });
  }

  _onActionSelected = (action) => {
    switch (action) {
      case 'chatList':
        this.navigator.push({name: 'chatList'});
        break;
      case 1:
        this.navigator.pop();
        break;
      default:
        this.navigator.pop();
    }
  }
}

const styles = StyleSheet.create({
  container:{
      backgroundColor: '#FFFFFF',
      shadowColor: "#000000",
      flex: 1,
  },
  contentStyle:{
      alignItems: 'center',
      justifyContent: 'center',
  },
});

function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect((state) => {return {}},mapDispatchToProps)(menu);
