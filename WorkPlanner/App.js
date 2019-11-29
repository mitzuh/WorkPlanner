import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import CustomCalendar from './CustomCalendar';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    StatusBar.setHidden(true);
  }

  render() {
    return (
      <View style={styles.container}>
        <CustomCalendar/>
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
