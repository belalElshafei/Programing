/** @format */

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Quiz_start from './quiz';
import Quiz_home from './quiz_home';
import LoginAndSignUp from './Login and SignUp';
import SplashScreen from './quiz_splash';

const QuizApp = createStackNavigator({
  Splash: {
    screen: SplashScreen,
    navigationOptions: {
      headerShown: false,
    },
  },

  LoginAndSignUp: {
    screen: LoginAndSignUp,
    navigationOptions: {
      headerShown: false,
    },
  },

  Home: {
    screen: Quiz_home,
    navigationOptions: {
      headerShown: false,
    },
  },
  Quiz_start: {
    screen: Quiz_start,
    navigationOptions: {
      headerShown: false,
    },
  },
});

export default createAppContainer(QuizApp);
