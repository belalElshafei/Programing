import * as React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5'

export default class Quiz_home extends React.Component {
  constructor() {
    super();
    this.state = {
      goToJS: 'js',
      goToCpp: 'cpp',
      displayButtons: false
    };
  }

  _renderButtons() {
    return (

      <Animatable.View
        animation="slideInUp"

        style={{ alignItems: 'center', justifyContent: 'center', width: '100%', height: '50%', backgroundColor: "#DAECEC", paddingVertical: '10%' }}>

        <ScrollView style={{ width: '100%' }}>









          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('Quiz_start', {
                choose: this.state.goToJS,
              })
            }
            style={{ width: '100%', alignItems: 'center' }}>
            <Animatable.View
              duration={2000}
              animation="slideInUp"
              style={{
                width: '100%',
                height: 60,
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: 15,
              }}>
              <LinearGradient
                style={{
                  width: '80%',
                  height: 60,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 20,
                }}
                colors={['#0052d4', '#4364f7', '#6fb1fc']}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}>
                <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#fff' }}>Start Js Quiz</Text>
              </LinearGradient>
            </Animatable.View>
          </TouchableOpacity>











          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('Quiz_start', {
                choose: this.state.goToCpp,
              })
            }
            style={{ width: '100%', alignItems: 'center' }}>
            <Animatable.View
              duration={3000}
              animation="slideInUp"
              style={{
                width: '100%',
                height: 60,
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: 15,
              }}>
              <LinearGradient
                style={{
                  width: '80%',
                  height: 60,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 20,
                }}
                colors={['#0052d4', '#4364f7', '#6fb1fc']}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}>
                <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#fff' }}>Start C++ Quiz</Text>
              </LinearGradient>
            </Animatable.View>
          </TouchableOpacity>

        </ScrollView>
      </Animatable.View>



    );
  }

  _renderName() {
    let UserName =
      this.props.navigation.state.params.userName != ''
        ? this.props.navigation.state.params.userName
        : 'def';
    let ImageSrc =
      this.props.navigation.state.params.imgSrc != ''
        ? this.props.navigation.state.params.imgSrc
        : 'https://lh3.googleusercontent.com/proxy/c_DR9Wh5k4gRecd7a2xaB5GuSigl_fYMY4jABgoyqUDzAIQi6HLwWG9pFScRi-tOcfYHnEss6SXU1aYjYarkLvGdQmnFPeoSq0rSoePSnhwjaHFj6nSsGoAoF0qS';
    return (
      <Animatable.View
        duration={2000}
        animation="slideInDown"
        style={{ width: '100%', height: '50%', alignItems: 'center', justifyContent: 'space-around' }}>
        <View>
          <Image
            style={{ width: 150, height: 150, borderRadius: 75 }}
            source={{ uri: ImageSrc }}
          />
        </View>
        <View>
          <Text style={{ fontSize: 25, color: '#fff' }}>Hello {UserName} !</Text>
        </View>
        <Text style={{ fontSize: 50, fontWeight: 'bold', color: '#fff' }}>
          Home
        </Text>
        <TouchableOpacity
          onPress={() => {
            this.setState({ displayButtons: this.state.displayButtons ? false : true })
          }

          }
          style={{ width: '100%', alignItems: 'center' }}>
          <Animatable.View
            duration={2000}
            animation="slideInUp"
            style={{
              width: '100%',
              height: 60,
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: 15,
            }}>
            <LinearGradient
              style={{
                width: '80%',
                height: 60,
                alignItems: 'center',
                justifyContent: 'space-around',
                flexDirection: "row",
                borderRadius: 20,
              }}
              colors={['#0052d4', '#4364f7', '#6fb1fc']}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}>
              <Text style={{ fontSize: 30, color: '#fff', fontWeight: 'bold' }}>Select quiz</Text>
              {
                this.state.displayButtons ? (
                  <Icon name='angle-down' color='#fff' size={30} />

                ) : (

                    <Icon name='angle-right' color='#fff' size={30} />
                  )
              }
            </LinearGradient>
          </Animatable.View>
        </TouchableOpacity>

      </Animatable.View>


    );
  }

  render() {
    return (
      <LinearGradient
        colors={['#e55d87', '#5fc3e4']}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={{ flex: 1, alignItems: 'center', justifyContent: 'space-evenly' }}>



        {this._renderName()}




        {
          this.state.displayButtons &&
          this._renderButtons()


        }
      </LinearGradient>
    );
  }
}
