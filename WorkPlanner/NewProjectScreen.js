import React from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, TextInput, AsyncStorage, ToastAndroid } from 'react-native';
import Project from './Project'
import CustomCalendar from './CustomCalendar';

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
      title: "New Project: " + dateString
    };
  };

  componentDidMount() {
    this.props.navigation.navigate('TextScreen', { text: 'Give a name or description for your new project.' })
  }

  // Storage
  saveData = async newProject => {
    projectObject = JSON.parse(newProject);
    try {
      await AsyncStorage.setItem(projectObject.projectName, newProject);
      ToastAndroid.show('Project "' + projectObject.projectName + '" created!', ToastAndroid.SHORT);
    } catch (error) {
      console.log("Error saving data!!!")
    }
  };

  saveProject() {
    console.log(this.state)

    const save = this.saveData

    const newProject = new Project(
      this.state.nameInput,
      this.state.deadline,
      this.state.hourInput,
      0,
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
   * Goes to next step if input is correct.
   */
  nextStep = () => {
    let currentStep = this.state.step;

    if (currentStep == 1) {
      if (this.state.nameInput != '') {
        this.props.navigation.navigate('TextScreen', { text: 'How many hours do you want to work with this project?' })
        this.setState((prevstate) => ({ step: prevstate.step + 1 }))
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
      return <OverviewView name={this.state.nameInput} hours={this.state.hourInput} deadline={this.state.deadline} save={this.saveProject} />
    }
  }
}

/**
 * View constants.
 */
const NameInputView = ({ onChangeName, nextStep }) => (
  <View style={styles.container}>
    <StatusBar hidden={true} />
    <Text>Project Name:</Text>
    <TextInput style={styles.textInput} onChangeText={textInput => onChangeName(textInput)} />

    <TouchableOpacity style={styles.addButton} onPress={() => {
      nextStep()
    }}>
      <Text>OK</Text>
    </TouchableOpacity>
  </View>
);

const HourInputView = ({ onChangeHours, nextStep }) => (
  <View style={styles.container}>
    <StatusBar hidden={true} />
    <Text>Hours for the project:</Text>
    <TextInput keyboardType='numeric' style={styles.textInput} onChangeText={textInput => onChangeHours(textInput)} />

    <TouchableOpacity style={styles.addButton} onPress={() => {
      nextStep()
    }}>
      <Text>OK</Text>
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
    <Text>Project Name: {name}</Text>

    <Text>Deadline: {deadline}</Text>

    <Text>Hours: {hours}</Text>

    <TouchableOpacity style={styles.addButton} onPress={() => save()}>
      <Text>Add Project</Text>
    </TouchableOpacity>
  </View>
)

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