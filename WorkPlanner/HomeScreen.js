import React from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native';

const date = new Date();
const formatedDate = date.toISOString().slice(0,10);

/**
 * Class for home screen, where user can navigate to project creation or
 * projects screen.
 */
export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {today: formatedDate}
  }

  /**
   * Navigates to project creation screen.
   */
  navigateToNewProject() {
    this.props.navigation.navigate('AddProjectScreen')
    this.props.navigation.navigate('TextScreen', { text: 'Give a name or description for your new project.' })
  }

  /**
   * Navigate to project list screen.
   */
  navigateToProjects(){
    this.props.navigation.navigate('ProjectsScreen', {today: this.state.today})
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.projectsButton}
          onPress={() => this.navigateToNewProject()}>
          <Text style={styles.text}>New Project</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.projectsButton}
          onPress={() => this.navigateToProjects()}>
          <Text style={styles.text}>My Projects</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#243E4F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  projectsButton: {
    backgroundColor: '#FAF5F4',
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    height: 70,
    width: 120,
    margin: 5,
    borderRadius: 10,
    paddingHorizontal: 5
  },
  text: {
    fontSize: 20,
  }
});