import React from 'react';
import { StyleSheet, Text, View, StatusBar, SafeAreaView, SectionList, TextInput, ToastAndroid, AsyncStorage } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Project from './Project'

export default class ProjectInfoScreen extends React.Component {

  constructor(props) {
    super(props);

    this.hourInputRef = React.createRef();
    this.state = {
      hourInput: false,
      hours: 0,
      project: this.props.navigation.getParam('project'),
      today: this.props.navigation.getParam('today')
    }
    this.saveData = this.saveData.bind(this);
  }

  /**
   * Set the title to project name and
   * header background color to white, green or red, based on project status.
   */
  static navigationOptions = ({ navigation }) => {
    project = navigation.getParam('project')
    today = navigation.getParam('today')
    var color = '#fff'

    if (project.remainingHours == 0) {
      color = '#00FF00';
    }
    else if (project.deadline < today) {
      color = '#FF0000';
    }

    return {
      title: navigation.getParam('project').projectName,
      headerStyle: {
        backgroundColor: color,
      },
    };
  };

  // Storage
  saveData = async newProject => {
    projectObject = JSON.parse(newProject);
    try {
      await AsyncStorage.mergeItem(projectObject.projectName, newProject);
    } catch (error) {
      console.log(error)
    }
  };

  enableHourInput = () => {
    if (this.state.project.deadline < this.state.today) {
      ToastAndroid.show('Project deadline has passed!', ToastAndroid.SHORT);
    }
    else {
      this.setState((prevstate) => ({ hourInput: true }))
    }
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
    this.setState((prevstate) => ({ project: updatedProject }))
  }

  getFormatedDateString(deadline) {
    date = new Date(deadline)
    dateString = date.getUTCDate() + '.' + (date.getUTCMonth()+1) + '.' + date.getUTCFullYear();
    return dateString;
  }

  render() {
    const data = [
      {
        title: 'Project Name',
        data: [this.state.project.projectName],
      },
      {
        title: 'Deadline',
        data: [this.getFormatedDateString(this.state.project.deadline)],
      },
      {
        title: 'Remaining Hours',
        data: [this.state.project.remainingHours],
      },
      {
        title: 'Completed Hours',
        data: [this.state.project.completedHours],
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