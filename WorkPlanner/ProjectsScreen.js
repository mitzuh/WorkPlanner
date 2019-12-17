import React from 'react';
import { StyleSheet, Text, View, StatusBar, FlatList, TouchableOpacity, AsyncStorage, ToastAndroid } from 'react-native';
import Project from './Project'

export default class ProjectsScreen extends React.Component {

  constructor(props) {
    super(props);

    this.loadData = this.loadData.bind(this);

    this.state = { data: [] }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Projects"
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
  }

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

  addProjectToList(p) {
    var arr = []
    arr = this.state.data

    if (arr.length = 0) {
      arr = []
    }

    arr.push(JSON.parse(p))
    this.setState((prevstate) => ({data: arr}))
    console.log(arr)
    console.log(this.state.data)
  }

  clearData = async () => {
    await AsyncStorage.clear();
    this.setState((prevstate) => ({data: []}))

    ToastAndroid.show('Data Cleared!', ToastAndroid.SHORT);
  }

  onClick(item) {
    console.log(item);
    this.props.navigation.navigate('ProjectInfoScreen', {project: item})
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
                <Text >
                  {`${item.projectName}, ${item.deadline}`}
                </Text>
              </TouchableOpacity>
              
            </View>}
        />
        <TouchableOpacity style={styles.clearButton}
          onPress={() => this.clearData()}>
          <Text>Clear Data</Text>
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
  clearButton: {
    backgroundColor: '#FAF5F4',
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    margin: 5,
  },
});