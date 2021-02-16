import React, { Component } from 'react';
import { View, Image } from 'react-native';

export class Quiz_splash extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate('LoginAndSignUp');
    }, 3000);
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          style={{ width: 300, height: 300, borderRadius: 150 }}
          source={require('./assets/quizLogo.jpeg')}
        />
      </View>
    );
  }
}

export default Quiz_splash;
