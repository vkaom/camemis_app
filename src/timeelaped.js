/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

'use strict';
var formatTime = require('minutes-seconds-milliseconds');
var React = require('react');
var ReactNative = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} = ReactNative;

var timeelaped = React.createClass({
  getInitialState: function(){
    return {
        timeElapsed: null,
        statusRuning: false,
        startTime: false,
        laps: [],
    }
  },
  render:function() {
    return  <View style={styles.container}>
              <View style={[styles.header]}>
                <View style={[styles.timerWrapper]}>
                  <Text style={styles.timeElapsed}>{formatTime(this.state.timeElapsed)}</Text>
                </View>
                <View style={[styles.buttonWrapper]}> 
                  {this.startStopButton()}
                  {this.lapButton()}
                </View>
              </View>
              <View style={[styles.footer]}>
                  {this.displayLaps()}           
              </View>
            </View>
    
  }
  ,startStopButton:function(){
    return (<TouchableHighlight 
                style={this.state.statusRuning ? styles.buttonStop : styles.buttonStart }
                underlayColor="#eff0f1"
                onPress={this.handleStartPress}

            >
              <Text>{ this.state.statusRuning ? 'Stop' : 'Start' }</Text>
            </TouchableHighlight>);    
  },lapButton:function(){
    return  (<TouchableHighlight 
                style={styles.button}
                underlayColor="#eff0f1"
                onPress={this.handleLapPress}
            >
              <Text>Lap</Text>
            </TouchableHighlight>);      
  },
  handleStartPress: function(){
    if(this.state.statusRuning){
      clearInterval(this.interval);
      this.setState({statusRuning: false});
      return;
    }
    this.setState({
      startTime: new Date() 
    });
    
    this.interval = setInterval(()=>{
      this.setState({
        timeElapsed: new Date() - this.state.startTime,
        statusRuning: true,
      });  
    }, 30);     
  },
  handleLapPress: function(){
    var lap = this.state.timeElapsed;
    this.setState({
      laps: this.state.laps.concat([lap]),
      startTime: new Date()
    });
  },
  displayLaps: function(){
    return(<View>
            {
              this.state.laps.map(function(val,index){
              return(<View style={styles.timeElapsedDisplay}>
                      <Text style={styles.timeElapsedDisplayText}>{index+1}. Time Elapsed: </Text>
                      <Text style={styles.timeElapsedDisplayText}>{formatTime(val)}</Text>
                    </View>);
              })
            }  
           
          </View>
      )
  }
  
});

var styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'stretch'
    },
    header:{
      flex: 1
    },
    footer:{
      flex: 1
    },
    timerWrapper:{
      flex: 5,
      justifyContent: 'center',
      alignItems: 'center'
    },
    timeElapsed: {
      fontSize: 60,
      color: '#000000'
    },
    buttonWrapper:{
      flex: 3,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center'
    },
    buttonStop:{
      borderWidth: 2,
      borderRadius: 50,
      width:80,
      height:80,
      borderColor: '#d67e21',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonStart:{
      borderWidth: 2,
      borderRadius: 50,
      width:80,
      height:80,
      borderColor: '#5fba7d',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button:{
      borderWidth: 2,
      borderRadius: 50,
      width:80,
      height:80,
      borderColor: '#5fba7d',
      alignItems: 'center',
      justifyContent: 'center',  
    },
    timeElapsedDisplay:{
      flex: 1,
      flexDirection: 'row',  
      justifyContent: 'space-around',
      
    },
    timeElapsedDisplayText:{
      color: '#000000',
      fontSize: 16,
    }    
});

module.exports = timeelaped;
