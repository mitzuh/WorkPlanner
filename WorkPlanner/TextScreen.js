import React from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, TextInput, AsyncStorage, ToastAndroid } from 'react-native';
import Project from './Project'

export default class TextScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = { data: [] }
  }

  componentDidMount() {
    setTimeout(() => {
        this.props.navigation.navigate('AddProjectScreen')
    }, 3000)
  }

  render() {
    const { navigation } = this.props;
    const text = navigation.getParam('text');
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <Text style={styles.text}>{text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3684ff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    fontSize: 40,
    color: '#ffffff',
    fontWeight: 'bold'
  },
});