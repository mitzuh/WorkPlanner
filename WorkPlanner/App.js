import HomeScreen from './HomeScreen.js'
import CalendarScreen from './CalendarScreen.js'
import ProjectsScreen from './ProjectsScreen.js'
import NewProjectScreen from './NewProjectScreen.js'
import ProjectInfoScreen from './ProjectInfoScreen.js'
import TextScreen from './TextScreen.js'

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
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: {
        header: null,
      }
    },
    MainCalendarScreen: {
      screen: CalendarScreen,
      navigationOptions: {
        header: null,
      }
    },
    ProjectsScreen: {
      screen: ProjectsScreen,
    },
    AddProjectScreen: {
      screen: NewProjectScreen,
    },
    ProjectInfoScreen: {
      screen: ProjectInfoScreen,
    },
    TextScreen: {
      screen: TextScreen,
      navigationOptions: {
        header: null,
      }
    }
  },
  {
    transitionConfig
  }
);

const App = createAppContainer(MainNavigator);

export default App;