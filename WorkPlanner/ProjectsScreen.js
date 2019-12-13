import React from 'react';
import { StyleSheet, Text, View, StatusBar, FlatList, TouchableOpacity, AsyncStorage } from 'react-native';
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

  componentDidMount() {
    const load = this.loadData
    load();
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
    arr = this.state.data
    arr.push(JSON.parse(p))
    this.setState((prevstate) => ({data: arr}))
    console.log(this.state.data)
  }

  clearData = async () => {
    await AsyncStorage.clear();
    this.setState((prevstate) => ({data: []}))
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
          keyExtractor={(x, i) => i}
          renderItem={({ item }) =>
            <View style={styles.container}>

              <TouchableOpacity style={styles.name}
                onPress={() => this.onClick(item)}>
                <Text >
                  {`${item.projectName}, ${item.deadline}`}
                </Text>
              </TouchableOpacity>
            </View>}
        />
        <TouchableOpacity style={styles.name}
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
});