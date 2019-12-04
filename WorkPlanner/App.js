import CalendarScreen from './CalendarScreen.js'
import DayScreen from './DayScreen.js'
import ProjectsScreen from './ProjectsScreen.js'
import NewProjectScreen from './NewProjectScreen.js'

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

const MainNavigator = createStackNavigator({
  MainCalendarScreen: {
    screen: CalendarScreen,
    navigationOptions: {
      header: null,
    }
  },
  SelectedDateScreen: {
    screen: DayScreen,
    navigationOptions: {
      header: null,
    }
  },
  ProjectsScreen: {
    screen: ProjectsScreen,
    navigationOptions: {
      header: null,
    }
  },
  AddProjectScreen: {
    screen: NewProjectScreen,
    navigationOptions: {
      header: null
    }
  }
});

const App = createAppContainer(MainNavigator);

export default App;