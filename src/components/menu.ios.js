'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Navigator,
    TouchableWithoutFeedback,
    TouchableHighlight,
    PanResponder,
    LayoutAnimation,
    Dimensions,
    Image,
    PixelRatio
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

var MUNUROUTES = {
    dashboard: Dashboard,
    academic: Academic,
    schedule: Schedule,
    attendance: Attendance,
    discipline: Discipline,
    transcript: Transcript,
};
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
export default class menu extends Component{
  constructor(props) {
    super(props);
    this.state = {
      _previousLeft: 0-Dimensions.get('window').width,
      _tranparant: 'rgba(0,0,0,0)',
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
    };

    this._ViewPanResponder = PanResponder.create({
        // Ask to be the responder:
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
      flex:1,
      flexDirection:'row',
      height:this.state.height,
      width:this.state.width,
      position: 'absolute',
      left: this.state._previousLeft,
      top: 0,
      backfaceVisibility: 'visible',
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
          initialRoute={{name: 'dashboard'}}
          renderScene={(route, navigator) =>this.renderScene(route, navigator)}
          configureScene={(route, routeStack) => Navigator.SceneConfigs.FloatFromRight}
      />
    );
  }
  renderScene(route, navigator){
      var MySceneComponent = MUNUROUTES[route.name];
      return (
          <View style={{flex:1}}>
            <View>
              <CamemisToolbar title={route.name} openDrawer={this._handleToggle} onActionSelected={this._onActionSelected} actions={toolbarActions} />
            </View>
            <ScrollView style={styles.container} {...this._ViewPanResponder.panHandlers}>
                <MySceneComponent route={route} navigator={navigator} />
            </ScrollView>
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
      this.props.navigator.immediatelyResetRouteStack([{name:'singin'}]);
      this._handleToggle();
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
  /////////////
  //////Rada
  //////////////
  _onActionSelected = (position) => {
    switch (position) {
      case 0:
        this.props.navigator.push({name: 'setting'});
        break;
      case 1:
        this.props.navigator.pop();
        break;
      default:
        this.props.navigator.pop();
    }
    //console.log(this.props.navigator.getCurrentRoutes(0));
  }
}

var toolbarActions = [
  {title: 'Create', icon: 'star-o', show: 'always'},
  {title: 'Filter', icon: 'calendar-check-o'},
  {title: 'Settings', icon: 'paw', show: 'always'},
];

const styles = StyleSheet.create({
  container:{
      backgroundColor: '#FFFFFF',
      shadowColor: "#000000",
  },
  contentStyle:{
      alignItems: 'center',
      justifyContent: 'center',
  },
  topStyle:{
      padding: 15,
      flexDirection: 'row',
      backgroundColor: '#4682B4',
      justifyContent: 'space-between'
  },
});
