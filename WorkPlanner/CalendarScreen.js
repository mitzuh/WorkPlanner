import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import CustomCalendar from './CustomCalendar';

export default class CalendarScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden={true}/>
        <CustomCalendar navigation={this.props.navigation}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});