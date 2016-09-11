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
  RefreshControl,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import * as config from '../config/';
import '../lib/UserAgent';
import io from 'socket.io-client/socket.io';
import Icon from 'react-native-vector-icons/FontAwesome';

var roomId;
class ChatRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      isLoading: true,
      message: "",
    };

    // this.socket = io(nodeServerUrl, {transports: ['websocket'], jsonp: false});
    this.chatSocket = io(config.app_node_url + '/chat', {transports: ['websocket'], jsonp: false});
    var room = ['Pu0QUvj82xZ15AcO0PTe6L2EnOLNTB1QJaH', '6E6B3F2E-DC84-4C'];
    this.chatSocket.emit('joinroom', room);
  }
  componentDidMount() {
    this.setState({messageList: {message: 'hi'}});
    this.chatSocket.on('chatmessage', function (data) {
      this.props.receiveChatMessage(data);
    });
    this.props.receiveChatMessage([{message: 'Hi'}]);
    this.chatSocket.on('getroom', function (data) {
      roomId = data;
    });
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
  _onRefresh() {
    //this._fetchChatList();
  }
  _sendMessage = () => {
    this.chatSocket.emit('chatmessage', roomId, {
        PROFILE_PHOTO: '/public/nifty-bootstrap/img/av1.png',
        NAME: 'Thuận Trần Sĩ',
        MESSAGE: this.state.message,
        TIME: '4:00 PM',
        RECEIVE_ID: '6E6B3F2E-DC84-4C',
        ID: 'Pu0QUvj82xZ15AcO0PTe6L2EnOLNTB1QJaH'
    });
    this.setState({message: ''});
  }
  render() {
    return(
      <View style={styles.container}>
        <ScrollView>
        {
          this.props.messageList.map(function(object, i){
            return (
              <Text key={i}>{object.message}</Text>
            );
          })
        }
        </ScrollView>
        <View style={{borderTopColor: '#bbb',borderTopWidth: StyleSheet.hairlineWidth,flexDirection: 'row',justifyContent:'center', alignItems:'center'}}>
          <View style={{flex: 11}}>
            <TextInput
              style={styles.input}
              placeholder="Write a message..."
              blurOnSubmit = {true}
              underlineColorAndroid = 'transparent'
              autoFocus = {true}
              tintColor = {'green'}
              onChangeText={(text) => this.setState({message:text})} value={this.state.message}
            />
          </View>
          <TouchableHighlight style={{backgroundColor:'#4682B4',padding:15}} onPress={()=>{this._sendMessage()}}>
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
    messageList: state.chat.messageList,
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(ChatRoom);
