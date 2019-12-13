import React from 'react';
import { StyleSheet, Text, View, StatusBar, SafeAreaView, SectionList, TextInput, ToastAndroid, AsyncStorage } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Project from './Project'

export default class ProjectInfoScreen extends React.Component {

  constructor(props) {
    super(props);

    this.hourInputRef = React.createRef();
    this.state = { hourInput: false, hours: 0 }
    this.saveData = this.saveData.bind(this);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('project').projectName
    };
  };

  // Storage
  saveData = async newProject => {
    projectObject = JSON.parse(newProject);
    console.log(projectObject)
    try {
      await AsyncStorage.mergeItem(projectObject.projectName, newProject);
    } catch (error) {
      console.log(error)
    }
  };

  enableHourInput = () => {
    this.setState((prevstate) => ({ hourInput: true }))
  }

  addHours = () => {
    ToastAndroid.show(this.state.hours + ' hours marked to project!', ToastAndroid.SHORT);

    this.updateProject();
    this.setState((prevstate) => ({ hourInput: false, hours: 0 }))
    this.hourInputRef.current.clear();
  }

  onChangeHours(hours) {
    this.setState((prevstate) => ({ hours: hours }))
  }

  updateProject() {
    const project = this.props.navigation.getParam('project')

    newCompletedHours = Number(project.completedHours) + Number(this.state.hours);
    console.log("kopleted " + newCompletedHours)
    newRemainingHours = project.remainingHours - this.state.hours;
    if (newRemainingHours < 0) {
      newRemainingHours = 0;
    }

    const updatedProject = new Project(
      project.projectName,
      project.deadline,
      newRemainingHours,
      newCompletedHours
    );

    const save = this.saveData
    save(JSON.stringify(updatedProject));
  }

  render() {
    const { navigation } = this.props;
    const project = navigation.getParam('project')

    const data = [
      {
        title: 'Project Name',
        data: [project.projectName],
      },
      {
        title: 'Deadline',
        data: [project.deadline],
      },
      {
        title: 'Remaining Hours',
        data: [project.remainingHours],
      },
      {
        title: 'Completed Hours',
        data: [project.completedHours],
      }
    ]

    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />

        <SafeAreaView style={styles.container}>
          <SectionList
            sections={data}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => <Item title={item} />}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={styles.header}>{title}</Text>
            )}
          />
        </SafeAreaView>

        <View style={styles.bottomView}>
          <TouchableOpacity style={styles.hourButton}
            onPress={this.state.hourInput ? this.addHours : this.enableHourInput}>
            <Text>{this.state.hourInput ? 'Save Hours' : 'Mark Hours'}</Text>
          </TouchableOpacity>

          {this.state.hourInput &&
            <TextInput keyboardType='numeric' ref={this.hourInputRef} style={styles.textInput} onChangeText={textInput => this.onChangeHours(textInput)} />
          }
        </View>

      </View>
    );
  }
}

function Item({ title }) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 20,
  },
  bottomView: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    fontSize: 24,
  },
  hourButton: {
    backgroundColor: '#FAF5F4',
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    margin: 5,
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1
  },
});