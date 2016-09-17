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
  NetInfo
} from 'react-native';
import CamemisToolbar from './toolbar';
import ChatListSearch from './chatListSearch';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import t from '../languages/chat';
var toolbarActions = [
  {title: 'Search', icon: 'search', action: 'search'},
];

class ChatListCom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      isLoading: true,
      searchModalVisible: false,
    };
  }
  componentWillReceiveProps(nextProps) {
    // if (this.props.navOnDidFocus !== nextProps.navOnDidFocus) {
    //   this._fetchChatList();
    // }
  }
  componentWillMount(){
    t.setLanguage(this.props.language);
  }
  componentDidMount(){
    this._fetchChatList();
  }
  _onRefresh() {
    //this._fetchChatList();
  }
  _fetchChatList(){
    this.props.fetchChatList().then(() => {
      this.setState({isLoading: false});
    });
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
        style={{flex:1,backgroundColor: 'yellow', margin:0, padding:0}}
        >
        <ChatListSearch navIcon="chevron-left" navigator={this.props.navigator} placeholder={t.SEARCH_USER} onNavIconPress={this._setSearchModalVisible.bind(this, false)} onActionSelected={this._onActionSelected} actions={toolbarActions} />

      </Modal>
    );
  }
  _renderLoadingView() {
    return (
      <View style={{flex: 1}}>
        <CamemisToolbar navIcon="chevron-left" navigator={this.props.navigator} title={t.CHAT} onActionSelected={this._onActionSelected} actions={toolbarActions} />
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
        this._setSearchModalVisible(true);
        break;
      default:
        console.log('action: default');
    }
  }
  render() {
    if (this.state.isLoading) {
      return this._renderLoadingView();
    }
    return (
      <View style={{flex: 1}}>
        <CamemisToolbar navIcon="chevron-left" navigator={this.props.navigator} onNavIconPress={() => this.props.navigator.pop()} title={t.CHAT} onActionSelected={this._onActionSelected} actions={toolbarActions} />
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
            this.props.list.map(function(object, i){
              return (
                <TouchableHighlight onPress={()=>{this.props.navigator.push({name:'chatRoom', toId: object.id})}} key={i}>
                  <View style={styles.chatItemList}>
                    <Image
                      source={{uri: object.profileImage}}
                      style={styles.thumbnail}
                    />
                    <View style={styles.rightContainer}>
                      <Text style={styles.name}>{object.name}</Text>
                      <Text style={styles.lastChatText}>{object.lastMessage}</Text>
                    </View>
                  </View>
                </TouchableHighlight>
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
    marginBottom: 6,
    fontWeight: 'bold',
    // textAlign: 'center',
  },
});

const mapStateToProps = (state) => {
  return {
    navOnDidFocus: state.navigator.navOnDidFocus,
    list: state.chat.list,
    language: state.schoolSetting.LANGUAGE,
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators, dispatch);
}
const ChatList = connect(mapStateToProps, mapDispatchToProps)(ChatListCom)

module.exports = ChatList
