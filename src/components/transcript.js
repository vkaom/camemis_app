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
    ScrollView,
    View
} from 'react-native';
import moment from 'moment';
import ScrollableTabView from 'react-native-scrollable-tab-view';
var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

module.exports = class Transcript extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
        <StudentTranscript />
    );
  }
}
class StudentTranscript extends Component {
    constructor(props){
        super(props);

        var myScoreData = [
            {RT: 'Assignment',Subject: 'Subject', Score: 'Score',  Date:'Date',color:'#7FDBFF'},
            {RT: 'RT', Subject: 'Math', Score: '7.8', Date:'30/05/2016',color:'#DDDDDD'},
            {RT: 'PT', Subject: 'Science', Score: '6.0', Date:'25/05/2016',color:'#FFFFFF'},
            {RT: 'PT', Subject: 'English', Score: '8.2', Date:'29/05/2016',color:'#DDDDDD'},
            {RT: 'PT', Subject: 'Physics', Score: '6.0', Date:'25/05/2016',color:'#FFFFFF'},
            {RT: 'RT', Subject: 'Math', Score: '7.8', Date:'30/05/2016',color:'#DDDDDD'},
            {RT: 'RT', Subject: 'Computer', Score: '7.5', Date:'24/05/2016',color:'#FFFFFF'},
            {RT: 'PT', Subject: 'English', Score: '8.2', Date:'29/05/2016',color:'#DDDDDD'},
            {RT: 'PT', Subject: 'Mathematics', Score: '6.0', Date:'25/05/2016',color:'#FFFFFF'},
            {RT: 'PT', Subject: 'English', Score: '8.2', Date:'29/05/2016',color:'#DDDDDD'}
        ];

        var FIRST_SEMESTER = [
            {SUB: 'Subject', Average: 'Average', Rank: 'Rank', Remark:'Remark',color:'#7FDBFF'},
            {SUB: 'Vietnamese', Average: '8.5', Rank: '2', Remark:'Very Good',color:'#DDDDDD'},
            {SUB: 'Music', Average: '7.3', Rank: '1', Remark:'Good', color:'#FFFFFF'},
            {SUB: 'IT', Average: '6.6', Rank: '1', Remark:'Good',color:'#DDDDDD'},
            {SUB: 'Sport', Average: '7.6', Rank: '5', Remark:'Very Good',color:'#FFFFFF'},
            {SUB: 'Mathematics', Average: '6.6', Rank: '1', Remark:'Good',color:'#DDDDDD'},
            {SUB: 'Geography', Average: '7.6', Rank: '5', Remark:'Very Good',color:'#FFFFFF'},
            {SUB: 'Chemistry', Average: '6.6', Rank: '1', Remark:'Good',color:'#DDDDDD'},
            {SUB: 'Science', Average: '7.6', Rank: '5', Remark:'Very Good',color:'#FFFFFF'},
            {SUB: 'Physics', Average: '7.8', Rank: '8', Remark:'Good',color:'#DDDDDD'}
        ];

        var SECOND_SEMESTER = [
            {SUB: 'Subject', Average: 'Average', Rank: 'Rank', Remark:'Remark',color:'#7FDBFF'},
            {SUB: 'Music', Average: '6.5', Rank: '2', Remark:'Very Good',color:'#DDDDDD'},
            {SUB: 'Physics', Average: '10.0', Rank: '1', Remark:'Good', color:'#FFFFFF'},
            {SUB: 'IT', Average: '8.3', Rank: '1', Remark:'Good',color:'#DDDDDD'},
            {SUB: 'Vietnamese', Average: '6.0', Rank: '5', Remark:'Very Good',color:'#FFFFFF'},
            {SUB: 'Geography', Average: '8.0', Rank: '1', Remark:'Good',color:'#DDDDDD'},
            {SUB: 'Chemistry', Average: '7.6', Rank: '5', Remark:'Very Good',color:'#FFFFFF'},
            {SUB: 'Sport', Average: '9.3', Rank: '1', Remark:'Good',color:'#DDDDDD'},
            {SUB: 'Science', Average: '7.6', Rank: '5', Remark:'Very Good',color:'#FFFFFF'},
            {SUB: 'Mathematics', Average: '7.8', Rank: '8', Remark:'Good',color:'#DDDDDD'}
        ];

        this.state = {
            dataScoreSource: ds.cloneWithRows(myScoreData),
            FIRST_SEMESTER_DATA: ds.cloneWithRows(FIRST_SEMESTER),
            SECOND_SEMESTER_DATA: ds.cloneWithRows(SECOND_SEMESTER),
        };
    }

    renderMenuNav(TabView){
      return(
        <View style={[styles.tabs]}>
          {
            TabView.tabs.map((tab, i) => {
            return(
            <TouchableHighlight
              key={tab}
              style={[styles.tab,{backgroundColor:TabView.activeTab === i ?'#4682B4':'#fff',}]}
              underlayColor="#4682B4"
              onPress={() => TabView.goToPage(i)} >
              <View><Text style={{color:TabView.activeTab === i ?'#fff':'#000'}}>{tab}</Text></View>
            </TouchableHighlight>
          );
          })
        }
        </View>
      );
    }

    render() {
      return (<ScrollableTabView
                initialPage={0}
                renderTabBar={(TabView) => this.renderMenuNav(TabView)}
                >
                <ScrollView tabLabel="Score" style={styles.tabView}>
                  <View style={styles.card}>
                      <ListView
                          dataSource={this.state.dataScoreSource}
                          renderRow={(rowData)=>this.renderViewScore(rowData)}
                        />
                  </View>
                </ScrollView>
                <ScrollView tabLabel="1st Semester" style={styles.tabView}>
                  <View style={styles.card}>
                      <ListView
                          dataSource={this.state.FIRST_SEMESTER_DATA}
                          renderRow={(rowData)=>this.renderViewAverage(rowData)}
                        />
                  </View>
                </ScrollView>
                <ScrollView tabLabel="2nd Semester" style={styles.tabView}>
                  <View style={styles.card}>
                      <ListView
                          dataSource={this.state.SECOND_SEMESTER_DATA}
                          renderRow={(rowData)=>this.renderViewAverage(rowData)}
                        />
                  </View>
                </ScrollView>
                <ScrollView tabLabel="Year" style={styles.tabView}>
                  <View style={{padding:5}}>
                      <View style={{flexDirection:'row',padding:10, backgroundColor:'#DDDDDD',marginBottom:5,marginTop:5,borderRadius:5}}>
                          <View style={{flex:1,paddingLeft:50,justifyContent:'center'}}>
                            <Text style={{color:'#000'}}>1st Semester</Text>
                            <Text style={{color:'#000'}}>90.8</Text>
                            <Text style={{color:'#000'}}>1</Text>
                            <Text style={{color:'#000'}}>Very Good</Text>
                          </View>
                      </View>
                      <View style={{flexDirection:'row',padding:10, backgroundColor:'#f1f1f1',marginBottom:5,marginTop:5,borderRadius:5}}>
                          <View style={{flex:1,paddingLeft:50,justifyContent:'center'}}>
                            <Text style={{color:'#000'}}>2nd Semester</Text>
                            <Text style={{color:'#000'}}>90.8</Text>
                            <Text style={{color:'#000'}}>1</Text>
                            <Text style={{color:'#000'}}>Very Good</Text>
                          </View>
                      </View>
                      <View style={{flexDirection:'row',padding:10, backgroundColor:'#DDDDDD',marginBottom:5,marginTop:5,borderRadius:5}}>
                          <View style={{flex:1,paddingLeft:50,justifyContent:'center'}}>
                            <Text style={{color:'#000'}}>Total</Text>
                            <Text style={{color:'#000'}}>90.8</Text>
                            <Text style={{color:'#000'}}>1</Text>
                            <Text style={{color:'#000'}}>Very Good</Text>
                          </View>
                      </View>
                      <View style={{flexDirection:'row',padding:10, backgroundColor:'#f1f1f1',marginBottom:5,marginTop:5,borderRadius:5}}>
                          <View style={{flex:1,paddingLeft:50,justifyContent:'center'}}>
                            <Text style={{color:'#000'}}>Behavior</Text>
                            <Text style={{color:'#000'}}>90.8</Text>
                            <Text style={{color:'#000'}}>1</Text>
                            <Text style={{color:'#000'}}>Very Good</Text>
                          </View>
                      </View>
                      <View style={{flexDirection:'row',padding:10, backgroundColor:'#DDDDDD',marginBottom:5,marginTop:5,borderRadius:5}}>
                          <View style={{flex:1,paddingLeft:50,justifyContent:'center'}}>
                            <Text style={{color:'#000'}}>Award</Text>
                            <Text style={{color:'#000'}}>90.8</Text>
                            <Text style={{color:'#000'}}>1</Text>
                            <Text style={{color:'#000'}}>Very Good</Text>
                          </View>
                      </View>
                  </View>
                </ScrollView>
              </ScrollableTabView>
            );
    }

  renderViewScore(rowData) {
      return(
        <View style={{flexDirection:'row',backgroundColor:rowData['color'],borderTopWidth:1,borderTopColor:'#fff'}}>
            <View style={{alignItems:'center',flex:2,paddingTop:15,paddingBottom:15}}>
              <Text style={{color:'#000',textAlign:'center'}}>{rowData['RT']}</Text>
            </View>
            <View style={{alignItems:'center',flex:2,paddingTop:15,paddingBottom:15}}>
              <Text style={{color:'#000',textAlign:'center'}}>{rowData['Subject']}</Text>
            </View>
            <View style={{alignItems:'center',flex:2,paddingTop:15,paddingBottom:15}}>
              <Text style={{color:'#000',textAlign:'center'}}>{rowData['Score']}</Text>
            </View>
            <View style={{alignItems:'center',flex:2,paddingTop:15,paddingBottom:15}}>
              <Text style={{color:'#000',textAlign:'center'}}>{rowData['Date']}</Text>
            </View>
        </View>
      );
  }
  renderViewAverage(rowData) {
      return(
        <View style={{flexDirection:'row',backgroundColor:rowData['color'],borderTopWidth:1,borderTopColor:'#fff'}}>
            <View style={{alignItems:'center',flex:2,paddingTop:15,paddingBottom:15}}>
              <Text style={{color:'#000',textAlign:'center'}}>{rowData['SUB']}</Text>
            </View>
            <View style={{alignItems:'center',flex:2,paddingTop:15,paddingBottom:15}}>
              <Text style={{color:'#000',textAlign:'center'}}>{rowData['Average']}</Text>
            </View>
            <View style={{alignItems:'center',flex:2,paddingTop:15,paddingBottom:15}}>
              <Text style={{color:'#000',textAlign:'center'}}>{rowData['Rank']}</Text>
            </View>
            <View style={{alignItems:'center',flex:2,paddingTop:15,paddingBottom:15}}>
              <Text style={{color:'#000',textAlign:'center'}}>{rowData['Remark']}</Text>
            </View>
        </View>
      );
  }
  renderView(rowData) {
      return(
        <View style={{flexDirection:'row',backgroundColor:rowData['color'],borderTopWidth:1,borderTopColor:'#fff'}}>
            <View style={{alignItems:'center',flex:2,paddingTop:15,paddingBottom:15}}>
              <Text style={{color:'#fff',textAlign:'center'}}>{rowData['Sub']}</Text>
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
