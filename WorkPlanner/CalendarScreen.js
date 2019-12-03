import React from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native';
import CustomCalendar from './CustomCalendar';

export default class CalendarScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  dateSelected() {
    this.props.navigation.navigate('ProjectsScreen')
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <CustomCalendar navigation={this.props.navigation} />
        <TouchableOpacity style={styles.projectsButton}
          onPress={() => this.dateSelected()}>
          <Text>Projects</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0.8,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  projectsButton: {
    backgroundColor: '#FAF5F4',
    borderWidth:1,
    borderColor:'black',
    alignItems:'center',
    justifyContent:'center',
    height:40,
    margin:5,
 },
});