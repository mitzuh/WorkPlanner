import React from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, TextInput, AsyncStorage, ToastAndroid } from 'react-native';
import Project from './Project'
import CustomCalendar from './CustomCalendar';

/**
 * Class for project creation.
 */
export default class NewProjectScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = { nameInput: '', hourInput: 0, deadline: 11 - 11 - 1111, step: 1 }

    this.saveData = this.saveData.bind(this);
    this.saveProject = this.saveProject.bind(this)
  }

  static navigationOptions = ({ navigation }) => {
    date = new Date(navigation.getParam('date'))
    dateString = date.getUTCDate() + '.' + (date.getUTCMonth() + 1) + '.' + date.getUTCFullYear();
    return {
      title: "New Project",
      headerStyle: {
        backgroundColor: '#3684ff',
      },
    };
  };

  /**
   * Saved new project to async storage with project name as key.
   */
  saveData = async newProject => {
    projectObject = JSON.parse(newProject);
    try {
      await AsyncStorage.setItem(projectObject.projectName, newProject);
      ToastAndroid.show('Project "' + projectObject.projectName + '" created!', ToastAndroid.SHORT);
      this.props.navigation.navigate('HomeScreen')
    } catch (error) {
      console.log("Error saving data!!!")
    }
  };

  /**
   * Loads a project from storage. Used for preventing project creation with the same name.
   * Return true if there is a duplicate project.
   */
  loadData = async keyID => {
    try {
      const value = await AsyncStorage.getItem(keyID);
      if (value != null) {
        return true;
      }
      else {
        return false
      }
    } catch (error) {
      console.log("Error loading data!!!")
    }
  };

  /**
   * Makes new project and calls the saveData function by passing the created project to it.
   */
  saveProject() {
    const save = this.saveData

    const newProject = new Project(
      this.state.nameInput,
      this.state.deadline,
      this.state.hourInput,
      0,
      this.state.hourInput
    );

    save(JSON.stringify(newProject));
  }

  onChangeName = (name) => {
    this.setState((prevstate) => ({ nameInput: name }))
  }

  onChangeHours = (hours) => {
    this.setState((prevstate) => ({ hourInput: hours }))
  }

  setDeadline = (deadline) => {
    this.setState((prevstate) => ({ deadline: deadline }))
  }

  /**
   * Formats the date to dd-mm-yyy
   * @param {*} deadline deadline for the project.
   */
  getFormatedDateString(deadline) {
    date = new Date(deadline)
    dateString = date.getUTCDate() + '.' + (date.getUTCMonth()+1) + '.' + date.getUTCFullYear();
    return dateString;
  }

  /**
   * Goes to next step if input is correct.
   */
  nextStep = () => {
    let currentStep = this.state.step;

    if (currentStep == 1) {
      if (this.state.nameInput != '') {
        const load = this.loadData
        duplicate = load(this.state.nameInput).then(value => {
          if (!value) {
            this.props.navigation.navigate('TextScreen', { text: 'How many hours do you want to work with this project?' })
            this.setState((prevstate) => ({ step: prevstate.step + 1 }))
          }
          else {
            ToastAndroid.show('Project name already in use!', ToastAndroid.SHORT);
          }
        })
      
      }
      else {
        ToastAndroid.show('Please input a name!', ToastAndroid.SHORT);
      }
    }
    else if (currentStep == 2) {
      if (this.state.hourInput > 0) {
        this.props.navigation.navigate('TextScreen', { text: 'Finally, select a deadline for your project.' })
        this.setState((prevstate) => ({ step: prevstate.step + 1 }))
      }
      else {
        ToastAndroid.show('Please input hours!', ToastAndroid.SHORT);
      }
    }
    else if (currentStep == 3) {
      this.setState((prevstate) => ({ step: prevstate.step + 1 }))
    }
  }

  render() {
    const { navigation } = this.props;

    if (this.state.step == 1) {
      return <NameInputView onChangeName={this.onChangeName} nextStep={this.nextStep} />
    }
    else if (this.state.step == 2) {
      return <HourInputView onChangeHours={this.onChangeHours} nextStep={this.nextStep} />
    }
    else if (this.state.step == 3) {
      return <DeadlinePickerView navigation={this.props.navigation} nextStep={this.nextStep} setDeadline={this.setDeadline} />
    }
    else if (this.state.step == 4) {
      return <OverviewView name={this.state.nameInput} hours={this.state.hourInput} deadline={this.getFormatedDateString(this.state.deadline)} save={this.saveProject} />
    }
  }
}

const NameInputView = ({ onChangeName, nextStep }) => (
  <View style={styles.container}>
    <StatusBar hidden={true} />
    <Text style={styles.text}>Project Name:</Text>
    <TextInput style={styles.textInput} placeholder='Name your project' onChangeText={textInput => onChangeName(textInput)} />

    <TouchableOpacity style={styles.button} onPress={() => {
      nextStep()
    }}>
      <Text style={styles.text}>OK</Text>
    </TouchableOpacity>
  </View>
);

const HourInputView = ({ onChangeHours, nextStep }) => (
  <View style={styles.container}>
    <StatusBar hidden={true} />
    <Text style={styles.text}>Hours for the project:</Text>
    <TextInput keyboardType='numeric' style={styles.textInput} placeholder='Amount of hours' onChangeText={textInput => onChangeHours(textInput)} />

    <TouchableOpacity style={styles.button} onPress={() => {
      nextStep()
    }}>
      <Text style={styles.text}>OK</Text>
    </TouchableOpacity>
  </View>
)

const DeadlinePickerView = ({ navigation, nextStep, setDeadline }) => (
  <View style={styles.container}>
    <StatusBar hidden={true} />
    <CustomCalendar navigation={navigation} nextStep={() => { nextStep() }} setDeadline={dedis => setDeadline(dedis)} />
  </View>
)

const OverviewView = ({ name, hours, deadline, save }) => (
  <View style={styles.container}>
    <StatusBar hidden={true} />
    <Text style={styles.overviewText}>Project Name: {name}</Text>

    <Text style={styles.overviewText}>Deadline: {deadline}</Text>

    <Text style={styles.overviewText}>Hours: {hours}</Text>

    <TouchableOpacity style={styles.addButton} onPress={() => save()}>
      <Text style={styles.text}>Add Project</Text>
    </TouchableOpacity>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#243E4F',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
  },
  button: {
    backgroundColor: '#3684ff',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 50,
    margin: 10,
    borderRadius: 10,
  },
  addButton: {
    backgroundColor: '#3684ff',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 90,
    margin: 10,
    padding: 5,
    borderRadius: 10,
  },
  textInput: {
    height: 40,
    borderColor: '#000000',
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 5
  },
  text: {
    color: 'white',
    fontWeight: 'bold'
  },
  overviewText: {
    color: 'white',
    fontSize: 24
  }
});