import CalendarScreen from './CalendarScreen.js'
import DayScreen from './DayScreen.js'
import ProjectsScreen from './ProjectsScreen.js'
import NewProjectScreen from './NewProjectScreen.js'
import ProjectInfoScreen from './ProjectInfoScreen.js'

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
  },
  ProjectsScreen: {
    screen: ProjectsScreen,
  },
  AddProjectScreen: {
    screen: NewProjectScreen,
  },
  ProjectInfoScreen: {
    screen: ProjectInfoScreen,
  }
});

const App = createAppContainer(MainNavigator);

export default App;