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
  RefreshControl
} from 'react-native';

import CamemisToolbar from './toolbar';

var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';
var personList = [
  // {name: 'Ethan Fox', img: require('../images/person-1.jpg'), lastChatText: 'Sweet! I heard they had a great time over at the cabin. Next time we should bring the croquest set.'},
  // {name: 'John Son', img: require('../images/person-2.jpg'), lastChatText: 'You: Nope! We are good!'},
  // {name: 'Marry', img: require('../images/person-3.jpg'), lastChatText: 'Oh yeah? Because I think no.:)'},
  // {name: 'Steven', img: require('../images/person-4.png'), lastChatText: 'Oh yeah? Because I think no.:)'},
  // {name: 'Hungary', img: require('../images/person-5.jpg'), lastChatText: 'Oh yeah? Because I think no.:)'},
];
module.exports = class ChatList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      loaded: false,
    };
    //this._renderDrawerContent = this._renderDrawerContent.bind(this);
  }
  componentDidMount() {
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
  _renderLoadingView() {
    return (
      <View style={{flex: 1}}>
        <View>
          <CamemisToolbar navigator={this.props.navigator} title="Chat" />
        </View>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center',backgroundColor: '#FFFFFF',}}>
          <Text>
            Loading...
          </Text>
        </View>
      </View>
    );
  }
  render() {
    if (!this.state.loaded) {
      return this._renderLoadingView();
    }
    return (
      <View style={{flex: 1}}>
        <View>
          <CamemisToolbar navigator={this.props.navigator} title="Chat" />
        </View>
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
    width: 70,
    height: 70,
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
    fontSize: 20,
    marginBottom: 8,
    // textAlign: 'center',
  },
});
