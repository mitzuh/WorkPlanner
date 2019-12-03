import React from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, TextInput } from 'react-native';
import Project from './Project'

export default class NewProjectScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { navigation } = this.props;
    const date = navigation.getParam('date');
    return (
      <View style={styles.container}>
        <StatusBar hidden={true}/>
        <Text>New project for deadline: {date}</Text>

        <Text>Project Name:</Text>
        <TextInput style={styles.textInput} ref={this.myTextInput}/>

        <Text>Hours for the project:</Text>
        <TextInput style={styles.textInput} ref={this.myTextInput}/>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
  },
  addButton: {
    backgroundColor: '#FAF5F4',
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    margin: 10,
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1
  },
});