import React from 'react';
import { StyleSheet, Text, View, StatusBar, FlatList, TouchableOpacity } from 'react-native';
import Project from './Project'

export default class ProjectsScreen extends React.Component {
  state = {
    data: this.getProjects()
  };

  constructor(props) {
    super(props);
  }

  getProjects() {
    var projectsList = [];
    const testProject = new Project(
      'Cool project',
      '2019-12-24',
      '100',
      '0'
    );
    const testProject2 = new Project(
      'Awesome project',
      '2019-12-30',
      '40',
      '0'
    );

    projectsList.push(testProject, testProject2);

    return projectsList;
  }

  onClick(item) {
    console.log(item);
  }

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <StatusBar hidden={true}/>
        <FlatList
          data={this.state.data}
          keyExtractor={(x, i) => i}
          renderItem={({item}) =>
          <View style={styles.container}>
            <TouchableOpacity style={styles.name}
            onPress={() => this.onClick(item)}>
              <Text >
                {`${item.projectName}`}
              </Text>
              
            </TouchableOpacity>
            </View>}
        />
        <TouchableOpacity style={styles.newProjectButton}>
          <Text>NEW PROJECT</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 20,
  },
  newProjectButton: {
    backgroundColor: '#FAF5F4',
    borderWidth:1,
    borderColor:'black',
    alignItems:'center',
    justifyContent:'center',
    height:40,
    margin:10,
 },
});