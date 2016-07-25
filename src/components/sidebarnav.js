'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    PixelRatio,
    TouchableWithoutFeedback,
    Dimensions,
    ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
var widthSideBar = 280;
module.exports = class CamemisSideBarNave extends Component{
    constructor(props) {
      super(props);
      this.state = {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
      };
    }
    _changeRout = (route) => {
        this.props.navigator.push({name:route});
        this.props.loggle();
    }
    _logout = () => {
        this.props.logout();
    }
    viewsideBarStyle(){
      return( {
          backgroundColor:'#FFF',
          width:widthSideBar,
          flexDirection:'column',
          paddingTop:0,
          shadowColor: '#ccc',
          shadowOpacity: 1.0,
          //height:this.state.height
      });
    }
    render() {
      return(
          <ScrollView style={this.viewsideBarStyle()}>
            <View style={styles.schoolStyle}>
              <Icon name="home" size={25} color="#FFF" />
              <Text style={styles.schoolStyleText}> ELT Elemetary School</Text>
            </View>
            <View style={[styles.schoolStyle,styles.schoolStyleImageProf]}>
              <Image
                source={require('../images/av1.png')}
                style={styles.profileImg}
                />
              <Text style={styles.schoolStyleText}> Sna Sor</Text>
            </View>
            <View style={styles.wrapperdropdown}>
              <TouchableHighlight  onPress={()=>{this._changeRout('dashboard')}} underlayColor="#4682B6" >
                <View style={styles.dropdownOptions}>
                  <Icon name="tachometer" size={20} color="#006400" />
                  <Text style={styles.textDropdownOptions}> bảng điều khiển</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight  onPress={()=>{this._changeRout('academic')}} underlayColor="#4682B6" >
                <View style={styles.dropdownOptions}>
                  <Icon name="graduation-cap" size={20} color="#3cb371" />
                  <Text style={styles.textDropdownOptions}> học Mỹ</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight  onPress={()=>{this._changeRout('schedule')}} underlayColor="#4682B6" >
                <View style={styles.dropdownOptions}>
                  <Icon name="calendar-check-o" size={20} color="#b22222" />
                  <Text style={styles.textDropdownOptions}> Schedule</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight onPress={()=>{this._changeRout('attendance')}} underlayColor="#4682B6" >
                <View style={styles.dropdownOptions}>
                  <Icon name="pencil" size={20} color="#20b2aa" />
                  <Text style={styles.textDropdownOptions}> Attendance</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight onPress={()=>{this._changeRout('discipline')}} underlayColor="#4682B6" >
                <View style={styles.dropdownOptions}>
                  <Icon name="paw" size={20} color="#3cb371" />
                  <Text style={styles.textDropdownOptions}> Discipline</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight onPress={()=>{this._changeRout('transcript')}} underlayColor="#4682B6" >
                <View style={styles.dropdownOptions}>
                  <Icon name="star-o" size={20} color="#daa520" />
                  <Text style={styles.textDropdownOptions}> Gradebook</Text>
                </View>
              </TouchableHighlight>
            </View>
            <TouchableHighlight onPress={()=>{this._logout()}} underlayColor="#4682B6" >
              <View style={styles.dropdownOptions}>
                <Icon name="sign-out" size={20} color="#000" />
                <Text style={{color:'#000',}}> Logout</Text>
              </View>
            </TouchableHighlight>
          </ScrollView>
      );
    }
}
const styles = StyleSheet.create({

  wrapperdropdown: {
      flexDirection: 'column',
      borderBottomWidth: 1 / PixelRatio.get(),
      borderBottomColor: '#CDCDCD',
  },
  dropdownOptions: {
      flexDirection: 'row',
      padding: 15,
      borderBottomColor: '#CDCDCD',
      alignItems: 'center'
  },
  textDropdownOptions:{
      color:'#000',
      marginLeft:10,
      fontSize:16,
  },
  schoolStyle: {
      flexDirection: 'row',
      paddingTop: 22,
      paddingLeft: 10,
      paddingRight: 10,
      paddingBottom: 10,
      backgroundColor: '#4682B4',
      borderBottomColor: '#CDCDCD',
      justifyContent: 'center',
      alignItems: 'center'
  },
  schoolStyleText: {
      color:'#FFF',
      fontSize:18,
      marginLeft:10
  },
  profileImg: {
      width: 30,
      height: 30,
      borderRadius:15
  },
  schoolStyleImageProf: {
      paddingTop:20,
      paddingBottom:20,
      justifyContent: 'center',
  }
});
