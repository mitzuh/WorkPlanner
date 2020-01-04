import CalendarScreen from './CalendarScreen.js'
import DayScreen from './DayScreen.js'
import ProjectsScreen from './ProjectsScreen.js'
import NewProjectScreen from './NewProjectScreen.js'
import ProjectInfoScreen from './ProjectInfoScreen.js'

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Animated, Easing } from 'react-native';

const transitionConfig = () => {
  return {
    transitionSpec: {
      duration: 500,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: sceneProps => {
      const { layout, position, scene } = sceneProps;

      const thisSceneIndex = scene.index;
      const width = layout.initWidth;

      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex],
        outputRange: [width, 0],
        extrapolate: 'clamp'
      });

      return {
        transform: [{ translateX }]
      }
    }
  }
}

const MainNavigator = createStackNavigator(
  {
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
  },
  {
    transitionConfig
  }
);

const App = createAppContainer(MainNavigator);

export default App;