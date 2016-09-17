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
import t from '../languages/chat';
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
    this._fetchChatMessageList();

    //socket events
    this.chatSocket.on('chatmessage', function (data) {
      this.props.receiveChatMessage(data);
    });
    this.chatSocket.on('getroom', function (data) {
      roomId = data;
    });
  }
  componentWillMount(){
    t.setLanguage(this.props.language);
  }
  _fetchChatMessageList(){
    this.props.fetchChatMessageList().then(() => {
      this.setState({isLoading: false});
    });
  }
  _renderLoadingView() {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center',backgroundColor: '#FFFFFF',}}>
          <Text>
            Loading...
          </Text>
        </View>
      </View>
    );
  }
  _renderMessageList(){
    return (
      <View style={styles.postWrapper}>
        <View style={styles.postMiddle}>
          {
            this.props.messageList.map(function(object, i){
              return (
                <View style={styles.chatItemList} key={i}>
                  <Text style={styles.name}>{object.MESSAGE + " - with " + this.props.route.toId}</Text>
                </View>
              );
            }, this)
          }
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
    if (this.state.isLoading) {
      return this._renderLoadingView()
    }
    return(
      <View style={styles.container}>
        <ScrollView>
        {
            this._renderMessageList()
        }
        </ScrollView>
        <View style={{borderTopColor: '#bbb',borderTopWidth: StyleSheet.hairlineWidth,flexDirection: 'row',justifyContent:'center', alignItems:'center'}}>
          <View style={{flex: 11}}>
            <TextInput
              style={styles.input}
              placeholder={t.WRITE_A_MESSAGE}
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
    language: state.schoolSetting.LANGUAGE,
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(ChatRoom);
