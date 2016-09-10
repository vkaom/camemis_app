/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Animated,
  ActivityIndicator,
  View,
  Image,
  ScrollView,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import '../lib/UserAgent';
import io from 'socket.io-client/socket.io';
import Icon from 'react-native-vector-icons/FontAwesome';
class ChatRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    // var nodeServerUrl = 'http://192.168.0.101:8081';
    // //var nodeServerUrl = 'http://admin-tool.camemis.de:8081';
    // this.socket = io(nodeServerUrl, {transports: ['websocket'], jsonp: false});
    //this.chatSocket = io(nodeServerUrl + '/chat', {transports: ['websocket'], jsonp: false});
  }
  componentDidMount() {
    // this.socket.emit('getUserId', this.props.tokenId);
    // this.socket.on('receiveChatNotification', function (data) {
    //   console.log('----------------------CHAT MESSAGE----------------------');
    //   console.log(data);
    // });
  }
  _renderPostItem(){
    return (
      <View style={styles.postWrapper}>
        <View style={styles.postMiddle}>
          <View style={{flexDirection: 'row', paddingBottom:10,}}>
            <Image
              source={require('../images/av1.png')}
              style={{width:40, height:40, borderRadius:30, resizeMode: 'contain', marginRight: 10}}
            />
            <View style={{backgroundColor:'#ddd', borderRadius: 30, alignItems:'center',padding:10,}}>
              <Text style={styles.postTime}>Hi!</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', paddingBottom:10,}}>
            <Image
              source={require('../images/av1.png')}
              style={{width:40, height:40, borderRadius:30, resizeMode: 'contain', marginRight: 10}}
            />
            <View style={{backgroundColor:'#ddd', borderRadius: 30, alignItems:'center',padding:10,}}>
              <Text style={styles.postTime}>How are you?</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', paddingBottom:10, justifyContent: 'flex-end'}}>
            <View style={{backgroundColor:'#4682B4', borderRadius: 30, alignItems:'center',padding:10,}}>
              <Text style={[styles.postTime,{color: 'white'}]}>Fine, thanks. and u?</Text>
            </View>
            <Image
              source={require('../images/av2.png')}
              style={{width:40, height:40, borderRadius:30, resizeMode: 'contain', marginLeft: 10}}
            />
          </View>
          <View style={{flexDirection: 'row', paddingBottom:10, justifyContent: 'flex-end'}}>
            <View style={{backgroundColor:'#4682B4', borderRadius: 30, alignItems:'center',padding:10,}}>
              <Text style={[styles.postTime,{color: 'white'}]}>Fine, thanks. and u?</Text>
            </View>
            <Image
              source={require('../images/av2.png')}
              style={{width:40, height:40, borderRadius:30, resizeMode: 'contain', marginLeft: 10}}
            />
          </View>
          <View style={{flexDirection: 'row', paddingBottom:10, justifyContent: 'flex-end'}}>
            <View style={{backgroundColor:'#4682B4', borderRadius: 30, alignItems:'center',padding:10,}}>
              <Text style={[styles.postTime,{color: 'white'}]}>Fine, thanks. and u?</Text>
            </View>
            <Image
              source={require('../images/av2.png')}
              style={{width:40, height:40, borderRadius:30, resizeMode: 'contain', marginLeft: 10}}
            />
          </View>
        </View>
      </View>
    );
  }
  render() {
    return(
      <View style={styles.container}>
        <ScrollView>
          {this._renderPostItem()}
        </ScrollView>
        <View style={{borderTopColor: '#bbb',borderTopWidth: StyleSheet.hairlineWidth,
        flexDirection: 'row',justifyContent:'center', alignItems:'center'}}>
          <View style={{flex: 11}}>
          <TextInput
            style={styles.input}
            placeholder="Write a message..."
            blurOnSubmit = {true}
            underlineColorAndroid = 'transparent'
            autoFocus = {true}
            tintColor = {'green'}
          />
          </View>
          <TouchableHighlight style={{backgroundColor:'#4682B4',padding:15}}>
            <Icon name="send-o" size={20} color="#fff" />
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  boldText:{
    fontWeight: 'bold',
  },
  postWrapper: {
    //flex: 1,
    backgroundColor: '#fff',
    marginTop: 15,
  },
  postTime: {
    color: '#000',
  },
  postTop: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CDCDCD',
  },
  postMiddle: {
    padding: 10,
  },
  postToolbar:{
    borderTopWidth: 1,
    borderTopColor: '#CDCDCD',
    marginLeft:10,
    marginRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  postToolbarIconGroup: {
    flexDirection:'row',
    alignItems: 'center',
  },
  postToolbarIcon:{
    fontSize: 14,
    marginRight: 5,
  },
  postBottom: {
    flex: 1,
    padding: 10,
    backgroundColor: '#eee'
  }
});
const mapStateToProps = (state) => {
  return {
    tokenId: state.login.tokenId
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(ChatRoom);
