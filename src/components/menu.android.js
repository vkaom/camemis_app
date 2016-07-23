'use strict';
import React, { Component } from 'react';
import {
      AppRegistry,
      StyleSheet,
      Text,
      TextInput,
      View,
      ScrollView,
      Navigator,
      TouchableWithoutFeedback,
      LayoutAnimation,
      TouchableHighlight,
      Dimensions,
      DrawerLayoutAndroid,
      PixelRatio
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CamemisLogo from './camhead';
import CamemisToolbar from './toolbar';
import CamemisSideBarNave from './sidebarnav';
var widthSideBar = 280;
var {height, width} = Dimensions.get('window');

var Dashboard = require('./dashboard');
var Academic = require('./academic');
var Schedule = require('./schedule');
var Attendance = require('./attendance');
var Discipline = require('./discipline');
var Transcript = require('./transcript');
var ChatList = require('./chatList');
var MUNUROUTES = {
    dashboard: Dashboard,
    academic: Academic,
    schedule: Schedule,
    attendance: Attendance,
    discipline: Discipline,
    transcript: Transcript,
    chatList: ChatList,
};
export default class menu extends Component{
  constructor(props) {
    super(props);
    this.state = {tab: 'dashboard'};
    this._renderDrawerContent = this._renderDrawerContent.bind(this);
  }
  render(){
      return (
        <DrawerLayoutAndroid
          drawerPosition={DrawerLayoutAndroid.positions.Left}
          drawerWidth={widthSideBar}
          keyboardDismissMode="on-drag"
          onDrawerOpen={() => {
            this._overrideBackPressForDrawerLayout = true;
          }}
          onDrawerClose={() => {
            this._overrideBackPressForDrawerLayout = false;
          }}
          ref={(drawer) => { this.drawer = drawer; }}
          renderNavigationView={this._renderDrawerContent}
        >
          {this._renderMainContent()}

        </DrawerLayoutAndroid>
      );
    }
    _renderDrawerContent(){
      return(
          <CamemisSideBarNave navigator={this.navigator} loggle={this._closeDrawer} logout={this._logout}/>
      );
    }
  /*_renderDrawerContent(){
    return(
      <View>
        <ScrollView style={styles.viewsideBarStyle}>
            <TouchableWithoutFeedback onPress={this._setTab.bind(this, 'dashboard')}>
              <View style={styles.schoolStyle}>
                <Icon name="home" size={25} color="#4682B4" />
                <Text style={{color:'#000',fontSize:16}}> ELT Elemetary School</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={this._setTab.bind(this, 'dashboard')}>
              <View style={styles.dropdownOptions}>
                <Icon name="tachometer" size={15} color="#006400" />
                <Text style={{color:'#000',}}> Dashboard</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={this._setTab.bind(this, 'academic')}>
              <View style={styles.dropdownOptions}>
                <Icon name="graduation-cap" size={15} color="#3cb371" />
                <Text style={{color:'#000',}}> My Academic</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={this._setTab.bind(this, 'schedule')}>
              <View style={styles.dropdownOptions}>
                <Icon name="calendar-check-o" size={15} color="#b22222" />
                <Text style={{color:'#000',}}> Schdeule</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={this._setTab.bind(this, 'attendance')}>
              <View style={styles.dropdownOptions}>
                <Icon name="pencil" size={15} color="#20b2aa" />
                <Text style={{color:'#000',}}> Attendance</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={this._setTab.bind(this, 'discipline')}>
              <View style={styles.dropdownOptions}>
                <Icon name="paw" size={15} color="#3cb371" />
                <Text style={{color:'#000',}}> Disciline</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => {this._setTab('transcript')}}>
              <View style={styles.dropdownOptions}>
                <Icon name="star-o" size={15} color="#daa520" />
                <Text style={{color:'#000',}}> Transcript</Text>
              </View>
            </TouchableWithoutFeedback>
        </ScrollView>
      </View>
    );
  }*/
  ///////////////////
  ///using navigator
  ////////////////////
  _renderMainContent(){
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
      var MySceneComponent = MUNUROUTES[route.name];
      return (
        <View style={{flex: 1,}}>
          <View>
            <CamemisToolbar title={route.name} openDrawer={this._openDrawer} onActionSelected={this._onActionSelected} actions={toolbarActions} />
          </View>
          <View style={styles.container}>
            <MySceneComponent route={route} navigator={navigator} />
          </View>
        </View>
      );
  }

  /*_renderMainContent(){
    switch (this.state.tab) {
      case 'dashboard':
        return (
          <View style={{flex: 1, flexDirection:'column'}}>
            <View>
              <CamemisToolbar title="Dashboard" openDrawer={this._openDrawer} onActionSelected={this._onActionSelected} actions={toolbarActions} />
            </View>
            <ScrollView style={styles.container}>
              <Dashboard></Dashboard>
            </ScrollView>
          </View>
        );
        break;
      case 'academic':
        return (
          <View style={{flex: 1, flexDirection:'column'}}>
            <View>
              <CamemisToolbar title="Academic" openDrawer={this._openDrawer} onActionSelected={this._onActionSelected} actions={toolbarActions} />
            </View>
            <ScrollView style={styles.container}>
              <Academic></Academic>
            </ScrollView>
          </View>
        );
        break;
      case 'schedule':
        return (
          <View style={{flex: 1, flexDirection:'column'}}>
            <View>
              <CamemisToolbar title="Schedule" openDrawer={this._openDrawer} onActionSelected={this._onActionSelected} actions={toolbarActions} />
            </View>
            <ScrollView style={styles.container}>
              <Schedule></Schedule>
            </ScrollView>
          </View>
        );
        break;
      case 'attendance':
        return (
          <View style={{flex: 1, flexDirection:'column'}}>
            <View>
              <CamemisToolbar title="Attendance" openDrawer={this._openDrawer} onActionSelected={this._onActionSelected} actions={toolbarActions} />
            </View>
            <ScrollView style={styles.container}>
              <Attendance></Attendance>
            </ScrollView>
          </View>
        );
        break;
      case 'discipline':
        return (
          <View style={{flex: 1, flexDirection:'column'}}>
            <View>
              <CamemisToolbar title="Discipline" openDrawer={this._openDrawer} onActionSelected={this._onActionSelected} actions={toolbarActions} />
            </View>
            <ScrollView style={styles.container}>
              <Discipline></Discipline>
            </ScrollView>
          </View>
        );
        break;
      case 'transcript':
        return (
          <View style={{flex: 1, flexDirection:'column'}}>
            <View>
              <CamemisToolbar title="Transcript" openDrawer={this._openDrawer} onActionSelected={this._onActionSelected} actions={toolbarActions} />
            </View>
            <ScrollView style={styles.container}>
              <Transcript></Transcript>
            </ScrollView>
          </View>
        );
        break;
      default:
    }
  }*/
  _setTab (tab) {
    this.setState({tab: tab});
    this._closeDrawer();
  }
  _logout = () => {
      this.props.navigator.immediatelyResetRouteStack([{name:'signin'}]);
  }

  _openDrawer = () => {
    this.drawer.openDrawer();
  }
  _closeDrawer = () => {
    this.drawer.closeDrawer();
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
        this.props.navigator.pop();
    }
    //console.log(this.props.navigator.getCurrentRoutes(0));
  }
}
var toolbarActions = [
  // {title: 'Create', icon: 'star-o', action: 'create'},
  // {title: 'Filter', icon: 'calendar-check-o', action: 'filter'},
  {title: 'Chat List', icon: 'comment', action: 'chatList'},
];
const styles = StyleSheet.create({
  container:{
      flex: 1,
      backgroundColor: '#FFFFFF',
      shadowColor: "#000000",
  },
  contentStyle:{
      alignItems: 'center',
      marginTop: 15,
      flex: 1,
  },
  topStyle:{
      paddingTop: 15,
      paddingBottom: 15,
      flexDirection: 'row',
      backgroundColor: '#4682B4',
      justifyContent: 'space-between'
  }

});
