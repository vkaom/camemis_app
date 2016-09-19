/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TouchableHighlight,
    ListView,
    Modal,
    DatePickerIOS,
    DatePickerAndroid,
    ScrollView,
    View
} from 'react-native';
import moment from 'moment';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import t from '../languages/schedule';

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class Schedule extends Component {
  componentWillMount(){
    t.setLanguage(this.props.schoolSetting.LANGUAGE)
  }
  constructor(props){
    super(props);
    var myDialyData = [{starttime:'13:00PM',endtime:'14:00PM',subject:'Math',room:'RM_007',teacher:'Chun Veng',color:'#228b22'},
                      {starttime:'14:30PM',endtime:'15:30PM',subject:'Khmer',room:'RM_009',teacher:'Rada Klourk',color:'#1e90ff'},
                      {starttime:'15:40PM',endtime:'16:40PM',subject:'English',room:'RM_987',teacher:'Raskmey',color:'#20b2aa'},
                      {starttime:'16:45PM',endtime:'17:45PM',subject:'Science',room:'RM_987',teacher:'Chantra',color:'#4169e1'},
                      {starttime:'17:45PM',endtime:'18:45PM',subject:'Music',room:'RM_987',teacher:'Sor Veasna',color:'#ff6347'}];

    var myWeekData = [{time: '', Mon: 'Mo', Tu: 'Tu', We: 'We', Thu:'Th', Fr: 'Fr',color:'#4682B4'},
                      {time:'13:00\n14:00', Mon: 'Khmer', Tu: 'Science', 'We': 'IT', Thu:'Music', Fr: 'English',color:'#90ee90'},
                      {time:'14:30\n15:30', Mon: 'Science', Tu: 'Khmer', 'We': 'IT', Thu:'Music', Fr: 'Science',color:'#20b2aa'},
                      {time:'15:40\n16:40', Mon: 'IT', Tu: 'Science', 'We': 'Khmer', Thu:'Music', Fr: 'English',color:'#ff6347'},
                      {time:'16:45\n17:45', Mon: 'Science', Tu: 'English', 'We': 'Music', Thu:'IT', Fr: 'Science',color:'#228b22'},
                      {time:'17:45\n18:45', Mon: 'Khmer', Tu: 'Music', 'We': 'IT', Thu:'English', Fr: 'Khmer',color:'#20b2aa'}];
    this.state = {
      dataSource: ds.cloneWithRows(myDialyData),
      dataSourceWeek: ds.cloneWithRows(myWeekData),
      modalVisible: false,
      selectedIndex: 0,
      date: new Date(),
      displaydate: moment().format('ddd, Do MMMM YYYY'),
    };
  }
  buttonStyleDialy(){
      return({
          paddingTop:5,
          paddingBottom:5,
          paddingLeft:15,
          paddingRight:15,
          backgroundColor:(this.state.selectedIndex==0)?'#4682B4':'#f0f8ff',
          borderRadius:5
      });
  }
  buttonStyleWeek(){
      return({
          paddingTop:5,
          paddingBottom:5,
          paddingLeft:15,
          paddingRight:15,
          backgroundColor:(this.state.selectedIndex==1)?'#4682B4':'#f0f8ff',
          borderRadius:5
      });
  }
  renderMenuNav(TabView){
    return(
      <View style={[styles.tabs]}>
          <TouchableHighlight
            style={[styles.tab,{backgroundColor:TabView.activeTab === 0 ?'#4682B4':'#fff',}]}
            underlayColor="#4682B4"
            onPress={() => TabView.goToPage(0)} >
            <View><Text style={{color:TabView.activeTab === 0 ?'#fff':'#000'}}>{t.DAILY}</Text></View>
          </TouchableHighlight>
          <View>
              {this.renderSelectDisplayDate()}
          </View>
          <TouchableHighlight
            style={[styles.tab,{backgroundColor:TabView.activeTab === 1 ?'#4682B4':'#fff',}]}
            underlayColor="#4682B4"
            onPress={() => TabView.goToPage(1)} >
            <View><Text style={{color:TabView.activeTab === 1 ?'#fff':'#000'}}>{t.WEEKLY}</Text></View>
          </TouchableHighlight>
      </View>
    );
  }
  render() {
    return (<ScrollableTabView
              initialPage={0}
              renderTabBar={(TabView) => this.renderMenuNav(TabView)}
              >
              <ScrollView tabLabel="Dialy" style={styles.tabView}>
                <View style={{padding:5}}>
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={(rowData)=>this.renderRow(rowData)}
                      />
                      {this.modalDisplay()}
                </View>
              </ScrollView>
              <ScrollView tabLabel="Week" style={styles.tabView}>
                <View style={{padding:5,marginTop:5}}>
                    <ListView
                        dataSource={this.state.dataSourceWeek}
                        renderRow={(rowData)=>this.renderWeekRow(rowData)}
                      />
                      {this.modalDisplay()}
                </View>
              </ScrollView>
            </ScrollableTabView>
          );
  }

  async showPicker(stateKey, options) {
    try {
      var newState = {};
      const {action, year, month, day} = await DatePickerAndroid.open(options);
      if (action === DatePickerAndroid.dismissedAction) {
        //newState[stateKey + 'Text'] = 'dismissed';
      } else {
        var date = new Date(year, month, day);
        this._onDateChange(date);
      }
    } catch ({code, message}) {
      console.warn(`Error in example '${stateKey}': `, message);
    }
  }

  currectScedule(time){
    if(time=='Math'){
      return(
          <Text style={{color:'#fff',backgroundColor:'#ff4500',padding:2,textAlign:'center',borderRadius:5}}>Now</Text>
      );
    }else {
      return;
    }
  }
  renderWeekRow(rowData) {
      return(
        <View style={{flexDirection:'row', backgroundColor:rowData['color']}}>
            <View style={{alignItems:'center',flex:1,paddingTop:5,paddingBottom:5, backgroundColor:'#333'}}><Text style={{color:'#fff',fontSize:10,textAlign:'center'}}>{rowData['time']}</Text></View>
            <View style={{alignItems:'center',flex:2,paddingTop:15,paddingBottom:15}}>
              <Text style={{color:'#fff',textAlign:'center'}}>{rowData['Mon']}</Text>
            </View>
            <View style={{alignItems:'center',flex:2,paddingTop:15,paddingBottom:15}}>
              <Text style={{color:'#fff',textAlign:'center'}}>{rowData['Tu']}</Text>
            </View>
            <View style={{alignItems:'center',flex:2,paddingTop:15,paddingBottom:15}}>
              <Text style={{color:'#fff',textAlign:'center'}}>{rowData['We']}</Text>
            </View>
            <View style={{alignItems:'center',flex:2,paddingTop:15,paddingBottom:15}}>
              <Text style={{color:'#fff',textAlign:'center'}}>{rowData['Thu']}</Text>
            </View>
            <View style={{alignItems:'center',flex:2,paddingTop:15,paddingBottom:15}}>
              <Text style={{color:'#fff',textAlign:'center'}}>{rowData['Fr']}</Text>
            </View>
        </View>
      );
  }
  renderRow(rowData) {
      return(
        <View style={{flexDirection:'row',padding:10, backgroundColor:rowData['color'],marginBottom:5,marginTop:5,borderRadius:5}}>
            <View style={{width:70,alignItems:'center',justifyContent:'center'}}>
              <Text style={{color:'#fff'}}>{rowData['starttime']}</Text>
              <Text style={{color:'#fff',marginTop:8,marginBottom:8}}>To</Text>
              <Text style={{color:'#fff'}}>{rowData['endtime']}</Text>
            </View>
            <View style={{flex:1,paddingLeft:50,justifyContent:'center'}}>
              <Text style={{color:'#fff'}}>{rowData['subject']}</Text>
              <Text style={{color:'#fff'}}>{rowData['room']}</Text>
              <Text style={{color:'#fff'}}>{rowData['teacher']}</Text>
              {this.currectScedule(rowData['subject'])}
            </View>
        </View>
      );
  }
  renderSelectDisplayDate(){
    if(Platform.OS === 'android'){
        return(
          <TouchableHighlight onPress={this.showPicker.bind(this, 'simple', {date: this.state.date})} underlayColor="#fff" style={{padding:5}}>
            <Text style={{fontSize:16,color:'#4169e1'}}>{this.state.displaydate}</Text>
          </TouchableHighlight>
        );
    }else if(Platform.OS === 'ios'){
        return(
          <TouchableHighlight onPress={()=>{this._setModalVisible(true)}} underlayColor="#fff" style={{padding:5}}>
            <Text style={{fontSize:16,color:'#4169e1'}}>{this.state.displaydate}</Text>
          </TouchableHighlight>
        );
    }
  }
  modalDisplay(){
      return(
        <Modal
          animationType={"none"}
          transparent={true}
          onRequestClose={() => {this.setState({modalVisible: false})}}
          visible={this.state.modalVisible}>
           <View style={[styles.modalContainer]}>
              <View style={[styles.innerModal, {backgroundColor: '#fff', padding: 20}]}>
                <DatePickerIOS
                    date={this.state.date}
                    mode="date"
                    onDateChange={(date)=>{this._onDateChange(date)}}
                  />
                  <View style={{alignItems:'center'}}>
                    <TouchableHighlight
                      style={{padding:10,borderRadius:10}}
                      onPress={()=>{this._setModalVisible(false)}}
                      >
                      <View><Text style={{color:'#ff4500'}}>Ok</Text></View>
                    </TouchableHighlight>
                </View>
              </View>
            </View>
        </Modal>
      );
  }
  _onChange(event){
    LayoutAnimation.linear();
    this.setState({
      selectedIndex: event,
    });
  }
  _onDateChange(date) {
    this.setState({
        date: date,
        displaydate:moment(date).format('ddd, Do MMMM YYYY')
    });
  }
  _setModalVisible(visible) {
    this.setState({
        modalVisible: visible
      });
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContainer: {
      flex: 1,
      padding: 20,
      paddingTop: 80,
    },
    innerModal: {
      borderRadius: 10,
    },
    tab: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop:5,
      paddingBottom:5,
      paddingLeft:10,
      paddingRight:10,
      borderRadius:5,
    },
    tabs: {
      height: 45,
      flexDirection: 'row',
      paddingTop: 5,
      borderWidth: 1,
      borderTopWidth: 0,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      justifyContent:'space-around',
      borderBottomColor: 'rgba(0,0,0,0.05)',
    },

});
function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators, dispatch);
}
const mapStateToProps = (state) => {
  return {schoolSetting:state.schoolSetting}
}
export default connect(mapStateToProps,mapDispatchToProps)(Schedule);
