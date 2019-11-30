import CalendarScreen from './CalendarScreen.js'
import DayScreen from './DayScreen.js'

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
});

const App = createAppContainer(MainNavigator);

export default App;