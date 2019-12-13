import React from 'react';
import { StyleSheet, Text, View, StatusBar, SafeAreaView, SectionList } from 'react-native';

export default class ProjectInfoScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('project').projectName
    };
  };

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
  header: {
    fontSize: 24,
  },
});