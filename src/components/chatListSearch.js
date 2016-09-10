'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
module.exports = class ChatListSearch extends Component{
    constructor(props) {
      super(props);
    }

    render() {
      return(
        <View style={[styles.toolbar, this.props.styles]}>
          <TouchableHighlight style={styles.toolbarNavIcon} onPress={()=>{this.props.onNavIconPress()}} underlayColor="#4682B6" >
            <Icon name={this.props.navIcon} size={25} color="#ccc" />
          </TouchableHighlight>
          <View style={styles.toolbarMain}>
            <View style={{flex: 1, alignItems: 'stretch',}}>
              <TextInput
                style={styles.input}
                placeholder="Search user"
                blurOnSubmit = {true}
                underlineColorAndroid = 'transparent'
                autoFocus = {true}
                tintColor = {'green'}
              />
            </View>
            {this._renderActions()}
          </View>
        </View>
      );
    }
    _renderActions(){
      if(this.props.actions && this.props.actions.length > 0){
        return this.props.actions.map(function(object, i){
          return (
            <TouchableHighlight style={styles.toolbarAction} key={i} onPress={()=>{this.props.onActionSelected(object.action)}} underlayColor="#4682B6">
              <Icon name={object.icon} size={20} color="#ccc" />
            </TouchableHighlight>
          );
        }, this)
      }else{
        return null;
      }
    }
}

var styles = StyleSheet.create({
  toolbar: {
    flexDirection: 'row',
    paddingTop:5,
    paddingBottom:5,
    backgroundColor: '#fff',
    height: 60,
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  toolbarNavIcon: {
    flex: 1,
    //backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    padding:10,
  },
  toolbarMain: {
    flex: 11,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 5,
    //backgroundColor: 'blue',
  },
  toolbarTitle: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  toolbarAction: {
    justifyContent: 'center',
    alignItems: 'center',
    padding:5,
    //backgroundColor: 'yellow',
  },
  input:{
      // padding: 4,
      // height: 40,
      // borderColor: '#DDDDDD',
      // borderWidth: 1,
      // borderRadius: 5,
      // marginTop: 10,
      // marginBottom: 10,
      // width:250,
      // alignSelf: 'center',
      // color: '#000000',
      fontSize: 16,
      borderColor: 'gray',
      borderWidth: 0,
  },
});
