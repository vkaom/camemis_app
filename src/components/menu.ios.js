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
    PanResponder,
    LayoutAnimation,
    Dimensions,
    PixelRatio
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CamemisLogo from './camhead';

var {height, width} = Dimensions.get('window');

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
      _previousLeft: 0-width,
      _tranparant: 'rgba(0,0,0,0)',
    };
    this._panResponder = PanResponder.create({
        // Ask to be the responder:
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

        onPanResponderGrant: (evt, gestureState) => {
          // The guesture has started. Show visual feedback so the user knows
          // what is happening!
          // gestureState.{x,y}0 will be set to zero now
        },
        onPanResponderMove: (evt, gestureState) => {
          // The most recent move distance is gestureState.move{X,Y}
          //alert('it is move x:' + gestureState.dx + 'it is move y:' + gestureState.dy);
          // The accumulated gesture distance since becoming responder is
          // gestureState.d{x,y}
        },
        onPanResponderTerminationRequest: (evt, gestureState) => true,
        onPanResponderRelease: (evt, gestureState) => {
          // The user has released all touches while this view is the
          // responder. This typically means a gesture has succeeded
          if(gestureState.dx < 0){
            //LayoutAnimation.easeInEaseOut();
            this.setState({_previousLeft:this.state._previousLeft?0:0-width});
            LayoutAnimation.configureNext(animate);
          }
          //alert('it is gesture x:' + gestureState.dx + 'it is gesture y:' + gestureState.dy);
        },
        onPanResponderTerminate: (evt, gestureState) => {
          // Another component has become the responder, so this gesture
          // should be cancelled
        },
        onShouldBlockNativeResponder: (evt, gestureState) => {
          // Returns whether this component should block native components from becoming the JS
          // responder. Returns true by default. Is currently only supported on android.
          return true;
        },
      });

      this._ViewPanResponder = PanResponder.create({
          // Ask to be the responder:
          onStartShouldSetPanResponder: (evt, gestureState) => true,
          onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
          onMoveShouldSetPanResponder: (evt, gestureState) => true,
          onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

          onPanResponderGrant: (evt, gestureState) => {
            // The guesture has started. Show visual feedback so the user knows
            // what is happening!
            // gestureState.{x,y}0 will be set to zero now
          },
          onPanResponderMove: (evt, gestureState) => {
            // The most recent move distance is gestureState.move{X,Y}
            //alert('it is move x:' + gestureState.dx + 'it is move y:' + gestureState.dy);
            // The accumulated gesture distance since becoming responder is
            // gestureState.d{x,y}
          },
          onPanResponderTerminationRequest: (evt, gestureState) => true,
          onPanResponderRelease: (evt, gestureState) => {
            // The user has released all touches while this view is the
            // responder. This typically means a gesture has succeeded
            if(gestureState.dx < 0){
              this.setState({_previousLeft:0-width});
              LayoutAnimation.configureNext(animate);
            }else{
              this.setState({_previousLeft:0});
              this.setState({_tranparant: 'rgba(0,0,0,0)'});
              LayoutAnimation.configureNext(animate);
            }
            //alert('it is gesture x:' + gestureState.dx + 'it is gesture y:' + gestureState.dy);
          },
          onPanResponderTerminate: (evt, gestureState) => {
            // Another component has become the responder, so this gesture
            // should be cancelled
          },
          onShouldBlockNativeResponder: (evt, gestureState) => {
            // Returns whether this component should block native components from becoming the JS
            // responder. Returns true by default. Is currently only supported on android.
            return true;
          },
        });
  }

  slidebarStyle(){
    return({
            flex:1,
            height:height,
            width:width,
            position: 'absolute',
            left: this.state._previousLeft,
            top: 0,
            backfaceVisibility: 'visible',
            backgroundColor:this.state._tranparant,
          });
  }

  render(){
    return(
      <View style={{flex:1}}>
        <View style={styles.topStyle}>
            <View style={{flexDirection: 'row',}}>
              <TouchableWithoutFeedback onPress={this._handleToggle}>
                <View style={{width:30,justifyContent:'center'}}>
                  <Icon name='bars' size={25} color="#fff" />
                </View>
              </TouchableWithoutFeedback>
              <CamemisLogo text={'CAMEMIS Education'}/>
            </View>
            <TouchableWithoutFeedback onPress={this._handlePress} style={{justifyContent:'center',alignItems: 'flex-end'}}>
              <View style={{justifyContent:'center',alignItems: 'flex-end'}}>
                <Text style={{ fontSize: 25, color:'#ffffff'}}>&#8942;</Text>
              </View>
            </TouchableWithoutFeedback>
        </View>
        <ScrollView style={styles.container} {...this._ViewPanResponder.panHandlers}>
          <View style={styles.contentStyle}>
            <Text>Hello!</Text>
          </View>
        </ScrollView>

        <View {...this._panResponder.panHandlers} style={this.slidebarStyle()}>
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
        </View>
      </View>
    );
  }
  changeRout = (_v) => {
      this.props.navigator.push({name: _v});
  }
  _handlePress = () => {
    this.props.navigator.push({name: 'setting'});
  }
  _handleToggle = () => {
    LayoutAnimation.configureNext(animate);
    //LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    this.setState({_previousLeft:this.state._previousLeft?0:0-width});
  }

}

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
      paddingTop:22,
      shadowColor: '#ccc',
      shadowOpacity: 1.0,
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
