import React from 'react';
import { StyleSheet, Text, View, StatusBar, FlatList, TouchableOpacity, AsyncStorage, ToastAndroid, Alert } from 'react-native';

/**
 * Class for the project list screen, where every created project is listed.
 */
export default class ProjectsScreen extends React.Component {

  constructor(props) {
    super(props);

    this.loadData = this.loadData.bind(this);

    this.state = { data: [], today: this.props.navigation.getParam('today') }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Projects",
      headerStyle: {
        backgroundColor: '#3684ff',
      },
    };
  };

  componentDidFocus() {
    const load = this.loadData
    load();
  }

  componentDidMount() {
    this.subs = [
      this.props.navigation.addListener('didFocus', (payload) => this.componentDidFocus(payload)),
    ];
  }

  componentWillUnmount() {
    this.subs.forEach(sub => sub.remove());
    this.setState((prevstate) => ({ data: [] }))
  }

  /**
   * Loads all data from the async storage.
   */
  loadData = async () => {
    try {
      AsyncStorage.getAllKeys()
        .then((ks) => {
          ks.forEach((k) => {
            AsyncStorage.getItem(k)
              .then((v) => this.addProjectToList(v));
          });
        });
    } catch (error) {
      console.log("Error loading data!!!")
    }
  };

  /**
   * Adds project to list
   * @param {*} p project to be added to list.
   */
  addProjectToList(p) {
    var arr = []
    arr = this.state.data

    arr.push(JSON.parse(p))

    arr.sort((a,b) => {
      return new Date(a.deadline).getTime() - 
        new Date(b.deadline).getTime()
    })
    this.setState((prevstate) => ({ data: arr }))
  }

  /**
   * Displays alert if user really wants to clear all data. Possibility to cancel.
   */
  clearButtonPressed = () => {
    Alert.alert(
      'Clear all data?',
      'All data will be erased!',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {text: 'OK', onPress: () => this.clearData()},
      ],
      {cancelable: true},
    );
  }

  /**
   * Clears all data from async storage.
   */
  clearData = async () => {
    await AsyncStorage.clear();
    this.setState((prevstate) => ({ data: [] }))

    ToastAndroid.show('Data Cleared!', ToastAndroid.SHORT);
  }

  /**
   * Navigates to project info screen of the selected project.
   * @param {*} item Clicked project, which info is going to be displayed in the upcoming screen.
   */
  onClick(item) {
    this.setState((prevstate) => ({ data: [] }))
    this.props.navigation.navigate('ProjectInfoScreen', { project: item, today: this.state.today })
  }

  getStyle(project) {
    var style = styles.projectInProgress;

    if (project.remainingHours == 0) {
      style = styles.projectDone;
    }
    else if (project.deadline < this.state.today) {
      style = styles.projectFailed;
    }

    return style;
  }

  getFormatedDateString(deadline) {
    date = new Date(deadline)
    dateString = date.getUTCDate() + '.' + (date.getUTCMonth()+1) + '.' + date.getUTCFullYear();
    return dateString;
  }

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <FlatList
          data={this.state.data}
          extraData={this.state}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) =>
            <View style={styles.container}>

              <TouchableOpacity
                onPress={() => this.onClick(item)}>
                <Text style={this.getStyle(item)}>
                  {`${item.projectName}, ${this.getFormatedDateString(item.deadline)}`}
                </Text>
              </TouchableOpacity>

            </View>}
        />
        <TouchableOpacity style={styles.clearButton}
          onPress={() => this.clearButtonPressed()}>
          <Text>Clear Data</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#243E4F',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 20,
  },
  clearButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    padding: 5,
    borderRadius: 10,
  },
  projectInProgress: {
    color: 'white',
  },
  projectDone: {
    color: '#00FF00',
  },
  projectFailed: {
    color: '#FF0000',
  },
});