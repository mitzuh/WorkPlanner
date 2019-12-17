import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';

export default class DayScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { navigation } = this.props;
    console.log(navigation.getParam('date'))
    return (
      <View style={styles.container}>
        <StatusBar hidden={true}/>
        <Text>{navigation.getParam('date')}</Text>
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