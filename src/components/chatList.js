/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  PixelRatio,
  RefreshControl,
  Modal,
  TouchableHighlight,
} from 'react-native';

import CamemisToolbar from './toolbar';

var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';
var personList = [];
var toolbarActions = [
  {title: 'Search', icon: 'search', action: 'search'},
];
var EventBus = require('eventbusjs');
module.exports = class ChatList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      loaded: false,
      searchModalVisible: false,
    };
    //this._setSearchModalVisible = this._setSearchModalVisible.bind(this);
  }
  componentWillMount() {
    this._fetchData();
  }
  _onRefresh() {
    this._fetchData();
  }
  _fetchData() {
    this.setState({refreshing: true});
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        //console.log(responseData.movies);
        responseData.movies.map(function(object, i){
          personList.unshift({name: object.title, img: object.posters.thumbnail, lastChatText: 'Oh yeah?'});
        });
        this.setState({
          refreshing: false,
          loaded: true,
        });
      })
      .done();
  }
  _setSearchModalVisible(visible){
    this.setState({searchModalVisible: visible});
  }
  _renderSearchModal(){
    return(
      <Modal
        animationType={"none"}
        transparent={false}
        visible={this.state.searchModalVisible}
        onRequestClose={() => {
          //alert("Modal has been closed.")
        }}
        >
       <View style={{}}>
        <View>
          <CamemisToolbar navigator={this.props.navigator} onNavIconPress={this._setSearchModalVisible.bind(this, false)} title="Search" />
          <Text>Hello World!</Text>
          <TouchableHighlight onPress={() => {
            this._setSearchModalVisible(!this.state.searchModalVisible)
          }}>
            <Text>Hide Modal</Text>
          </TouchableHighlight>
        </View>
       </View>
      </Modal>
    );
  }
  _renderLoadingView() {
    return (
      <View style={{flex: 1}}>
        <View>
          <CamemisToolbar navigator={this.props.navigator} title="Chat" onActionSelected={this._onActionSelected} actions={toolbarActions} />
        </View>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center',backgroundColor: '#FFFFFF',}}>
          <Text>
            Loading...
          </Text>
        </View>
      </View>
    );
  }
  _onActionSelected = (action) => {
    switch (action) {
      case 'search':
        console.log('action: search');
        this._setSearchModalVisible(true);
        break;
      default:
        console.log('action: default');
    }
    //console.log(this.props.navigator.getCurrentRoutes(0));
  }
  render() {
    if (!this.state.loaded) {
      return this._renderLoadingView();
    }
    return (
      <View style={{flex: 1}}>
        <View>
          <CamemisToolbar navigator={this.props.navigator} title="Chat" onActionSelected={this._onActionSelected} actions={toolbarActions} />
        </View>
        {this._renderSearchModal()}
        <ScrollView
          style={styles.container}
          contentContainerStyle={{paddingTop:10}}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
        >
          {
            personList.map(function(object, i){
              return (
                <View style={styles.chatItemList} key={i}>
                  <Image
                    //source={object.img}
                    source={{uri: object.img}}
                    style={styles.thumbnail}
                  />
                  <View style={styles.rightContainer}>
                    <Text style={styles.name}>{object.name}</Text>
                    <Text style={styles.lastChatText}>{object.lastChatText}</Text>
                  </View>
                </View>
              );
            }, this)
          }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
  },
  chatItemList: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  thumbnail: {
    width: 50,
    height: 50,
    marginLeft: 10,
    marginRight:20,
    borderRadius: 60,
  },
  rightContainer: {
    flex: 1,
    marginRight: 10,
	  //backgroundColor: '#FF0000',
  },
  name: {
    fontSize: 16,
    marginBottom: 8,
    // textAlign: 'center',
  },
});
