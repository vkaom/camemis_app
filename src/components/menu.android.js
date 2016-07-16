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

var {height, width} = Dimensions.get('window');

export default class menu extends Component{
  constructor(props) {
    super(props);
  }
  render(){
      return (<DrawerLayoutAndroid
          drawerPosition={DrawerLayoutAndroid.positions.Left}
          drawerWidth={Dimensions.get('window').width/1.5}
          keyboardDismissMode="on-drag"
          onDrawerOpen={() => {
            this._overrideBackPressForDrawerLayout = true;
          }}
          onDrawerClose={() => {
            this._overrideBackPressForDrawerLayout = false;
          }}
          ref={(drawer) => { this.drawer = drawer; }}
          renderNavigationView={this._renderDrawerContent}>
          <View style={{flex:1}}>
            <View style={styles.topStyle}>
                <View style={{flexDirection: 'row',}}>
                  <TouchableHighlight onPress={()=>{this.drawer.openDrawer()}} underlayColor="#4682B6" style={{justifyContent:'center',alignItems: 'flex-start'}}>
                    <View style={{width:40,justifyContent:'center',alignItems:'center'}}>
                      <Icon name='bars' size={25} color="#fff" />
                    </View>
                  </TouchableHighlight>
                  <CamemisLogo text={'CAMEMIS Education'}/>
                </View>
                <TouchableHighlight onPress={this._handlePress} underlayColor="#4682B6" style={{justifyContent:'center',alignItems: 'flex-end'}}>
                  <View style={{justifyContent:'center',alignItems: 'center',width:40}}>
                    <Text style={{ fontSize: 25, color:'#ffffff'}}>&#8942;</Text>
                  </View>
                </TouchableHighlight>
            </View>
            <ScrollView style={styles.container}>
              <View style={styles.contentStyle}>
                <Text>Hello!</Text>
              </View>
            </ScrollView>
          </View>
        </DrawerLayoutAndroid>
      );
    }
  _renderDrawerContent(){
    return(<View>
      <ScrollView style={styles.viewsideBarStyle}>
          <TouchableWithoutFeedback>
            <View style={styles.schoolStyle}>
              <Icon name="home" size={25} color="#4682B4" />
              <Text style={{color:'#000',fontSize:16}}> ELT Elemetary School</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <View style={styles.dropdownOptions}>
              <Icon name="tachometer" size={15} color="#006400" />
              <Text style={{color:'#000',}}> Dashboard</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <View style={styles.dropdownOptions}>
              <Icon name="graduation-cap" size={15} color="#3cb371" />
              <Text style={{color:'#000',}}> My Academic</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <View style={styles.dropdownOptions}>
              <Icon name="calendar-check-o" size={15} color="#b22222" />
              <Text style={{color:'#000',}}> Schdeule</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <View style={styles.dropdownOptions}>
              <Icon name="pencil" size={15} color="#20b2aa" />
              <Text style={{color:'#000',}}> Attendance</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <View style={styles.dropdownOptions}>
              <Icon name="paw" size={15} color="#3cb371" />
              <Text style={{color:'#000',}}> Disciline</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <View style={styles.dropdownOptions}>
              <Icon name="star-o" size={15} color="#daa520" />
              <Text style={{color:'#000',}}> Transparent</Text>
            </View>
          </TouchableWithoutFeedback>
      </ScrollView>
    </View>);
  }
  changeRout = (_v) => {
      this.props.navigator.push({name: _v});
  }
  _handlePress = () => {
    this.props.navigator.push({name: 'setting'});
  }
  _handleToggle = () => {
    //toggle the sidebar
    this._overrideBackPressForDrawerLayout = true;
  }
}

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
  },
  dropdownOptions: {
      flexDirection: 'row',
      padding: 20,
      borderBottomWidth: 1 / PixelRatio.get(),
      borderBottomColor: '#CDCDCD',
      alignItems: 'center'
  },
  viewsideBarStyle: {
      backgroundColor:'#f0f8ff',
      width:width/1.5,
      flexDirection:'column',
      shadowColor: 'black',
      shadowOpacity: 1.0,
      borderRightWidth:2,
      borderRightColor: '#000',
      height:height
  },
  schoolStyle: {
      flexDirection: 'row',
      padding: 10,
      backgroundColor: '#dcdcdc',
      borderBottomWidth: 1 / PixelRatio.get(),
      borderBottomColor: '#CDCDCD',
      alignItems: 'center'
  },

});
