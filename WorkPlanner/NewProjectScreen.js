import React from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, TextInput, AsyncStorage } from 'react-native';
import Project from './Project'

export default class NewProjectScreen extends React.Component {
  constructor(props) {
    super(props);

    this.nameInputRef = React.createRef();
    this.hourInputRef = React.createRef();

    this.state = { nameInput: '', hourInput: 0 }

    this.saveData = this.saveData.bind(this);
    this.loadData = this.loadData.bind(this);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "New Project"
    };
  };

  // Storage
  saveData = async newProject => {
    projectObject = JSON.parse(newProject);
    try {
      await AsyncStorage.setItem(projectObject.projectName, newProject);
    } catch (error) {
      console.log("Error saving data!!!")
    }
  };
  loadData = async () => {
    try {
      AsyncStorage.getAllKeys()
        .then((ks) => {
          ks.forEach((k) => {
            AsyncStorage.getItem(k)
              .then((v) => console.log(v));
          });
        });
    } catch (error) {
      console.log("Error loading data!!!")
    }
  };

  saveProject(date) {
    if (this.state.hourInput > 0 && this.state.nameInput != '') {
      const save = this.saveData

      this.nameInputRef.current.clear();
      this.hourInputRef.current.clear();

      const newProject = new Project(
        this.state.nameInput,
        date,
        this.state.hourInput,
        '0'
      );

      save(JSON.stringify(newProject));
    }
  }

  testLoad() {
    const load = this.loadData
    load();
  }

  onChangeName(name) {
    this.setState((prevstate) => ({ nameInput: name }))
  }

  onChangeHours(hours) {
    this.setState((prevstate) => ({ hourInput: hours }))
  }

  render() {
    const { navigation } = this.props;
    const date = navigation.getParam('date');
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <Text>New project for deadline: {date}</Text>

        <Text>Project Name:</Text>
        <TextInput style={styles.textInput} ref={this.nameInputRef} onChangeText={textInput => this.onChangeName(textInput)} />

        <Text>Hours for the project:</Text>
        <TextInput keyboardType='numeric' ref={this.hourInputRef} style={styles.textInput} onChangeText={textInput => this.onChangeHours(textInput)} />

        <TouchableOpacity style={styles.addButton} onPress={() => this.saveProject(date)}>
          <Text>Add Project</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton} onPress={() => this.testLoad()}>
          <Text>Load projects</Text>
        </TouchableOpacity>
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