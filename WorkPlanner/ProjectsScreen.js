import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import Project from './Project'

export default class ProjectsScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { navigation } = this.props;

    const testProject = new Project(
      'Cool project',
      '2019-12-24',
      '100',
      '0'
      );

    return (
      <View style={styles.container}>
        <StatusBar hidden={true}/>
        <Text>{testProject.projectName}</Text>
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