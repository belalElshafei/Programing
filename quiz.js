import * as React from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Animated,
  Modal,
  BackHandler,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'react-native-axios';
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-community/async-storage';
import Share from 'react-native-share';
import Files from './assets/filesBase64';
import * as Animatable from 'react-native-animatable';
import { js, cpp } from './quizQuestions';

export default class Quiz_start extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      randomData: [],
      smallArray: [],
      loader: true,
      indexOfQuestion: 0,
      correct_counter: 0,
      result: 0,
      quizChoosed: [],
      fadeAmin: new Animated.Value(0),
      nameofScore: '',
      colorofScore: '',
      timer: 0,
      time: '',
      timeContainer: [],
      ScoreStorgeArr: [],
      DurationArr: [],
      DateStorgeArr: [],
      TimeStorageArr: [],
      StorageData: [],
      StorageData2: [],
      backStoreColor: false,
      modalVisible: false,
      questions: [],
      choose: JSON.stringify(
        this.props.navigation.getParam('choose', 'NO-Choose'),
      ),
      test: 0,
      saveBtnShow: true
    };
  }

  async setItimes() {
    await AsyncStorage.setItem(
      'storage',
      JSON.stringify(this.state.StorageData),
    );
    await AsyncStorage.setItem(
      'storage2',
      JSON.stringify(this.state.StorageData2),
    );
  }

  async getItims() {
    let storageData = await AsyncStorage.getItem('storage');

    storageData = storageData ?? []

    storageData = JSON.stringify(storageData) != '[]' ? JSON.parse(storageData) : [];


    let storageData2 = await AsyncStorage.getItem('storage2');


    storageData2 = storageData2 ?? []

    storageData2 = JSON.stringify(storageData2) != '[]' ? JSON.parse(storageData2) : [];


    setTimeout(() => {
      this.setState({
        StorageData: storageData,
        StorageData2: storageData2,
      });
    }, 1000);
  }



  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backPressed);
  }

  backPressed = () => {
    if (this.props.navigation.isFocused()) {
      this.setState({
        saveBtnShow: true
      })
    }
  };

  loadingData() {

    if (this.state.choose == '"js"') {

      for (let i of js) {

        for (let x of i) {

          x.hasOwnProperty('isCheck') ? x.isCheck = false : null;
        }
      }
      this.setState({
        questions: js
      })
      // console.log('js');
    } else {
      for (let i of cpp) {

        for (let x of i) {

          x.hasOwnProperty('isCheck') ? x.isCheck = false : null;
        }
      }
      this.setState({
        questions: cpp
      })
    }
  }

  componentDidMount() {

    BackHandler.addEventListener('hardwareBackPress', this.backPressed);

    this.loadingData();

    setTimeout(() => {
      let data = this.state.questions,
        indexOfQuestion = this.state.indexOfQuestion,
        randomData = [],
        randomArray = [];

      for (let i = 0; i < data.length; i++) {
        randomArray = data[Math.floor(Math.random() * data.length)];
        if (randomData.includes(randomArray) == false) {
          randomData.push(randomArray);
        } else {
          i--;
        }
      }

      data = randomData;
      this.setState({
        questions: data,
      });

      this.randomAnswersInQuestion(data, indexOfQuestion);

      this.getItims();

    }, 500);
  }

  randomAnswersInQuestion(data, index) {
    // #####################################################################3
    let smallArray = data[index],
      smallrandomArray = [];

    smallrandomArray[0] = smallArray[0];
    smallrandomArray[smallArray.length - 1] = smallArray[smallArray.length - 1];
    let randomObj;
    for (let i = 1; i < smallArray.length - 1; i++) {
      randomObj = smallArray[Math.ceil(Math.random() * 4)];

      if (smallrandomArray.includes(randomObj) == false) {
        smallrandomArray[i] = randomObj;
      } else {
        i--;
      }
    }

    if (smallrandomArray.length == 6) {
      this.setState({
        smallArray: smallrandomArray,
      });

      setTimeout(() => {
        this.setState({
          loader: false,
        });
      }, 500);

      this.state.time = setInterval(() => {
        let timer = this.state.timer + 1;

        this.setState({
          timer: timer,
        });
      }, 1000);
    }

    // #############################################################
  }

  changeQuestion() {
    let questions = this.state.questions;
    let smallArray = this.state.smallArray;
    let correct_counter = this.state.correct_counter;
    let indexOfQuestion = this.state.indexOfQuestion + 1;
    let theTrue = 0;

    for (let i = 1; i < smallArray.length - 1; i++) {
      if (smallArray[i].isCheck == true) {
        theTrue++;
      }
    }

    for (let i = 1; i < smallArray.length - 1; i++) {
      if (theTrue == 1) {
        if (smallArray[i].isCheck == true) {
          if (
            smallArray[i].answer ==
            smallArray[smallArray.length - 1].right_answer
          ) {
            correct_counter++;
          }
        }
      } else {
        break;
      }
    }
    this.setState({
      correct_counter: correct_counter,
    });

    if (theTrue > 1 || theTrue == 0) {
      alert('You Should Select One Answer');
    } else if (theTrue == 1) {
      if (indexOfQuestion < questions.length) {
        clearInterval(this.state.time);

        this.setState({
          timeContainer: [...this.state.timeContainer, this.state.timer],
          timer: 0,
        });

        this.setState({ indexOfQuestion: indexOfQuestion, loader: true });

        this.randomAnswersInQuestion(questions, indexOfQuestion);
      } else {
        clearInterval(this.state.time);

        this.setState({
          timeContainer: [...this.state.timeContainer, this.state.timer],
        });

        setTimeout(() => {
          let reducer = (accValue, currValue) => accValue + currValue;
          let totalOfTime = this.state.timeContainer.reduce(reducer);

          this.setState({
            timeContainer: totalOfTime,
          });
        }, 1000);

        correct_counter == questions.length
          ? this.setState({
            nameofScore: 'Perfect',
            colorofScore: '#00f',
          })
          : correct_counter >= (3 / 4) * questions.length
            ? this.setState({
              nameofScore: 'Very Good',
              colorofScore: 'green',
            })
            : correct_counter >= questions.length / 2
              ? this.setState({
                nameofScore: 'Good',
                colorofScore: 'green',
              })
              : this.setState({
                nameofScore: 'Not Good',
                colorofScore: '#f00',
              });

        this.setState({ loader: true });
        setTimeout(() => {
          this.setState({ loader: false, result: 1 });
        }, 1000);

        Animated.spring(this.state.fadeAmin, {
          toValue: 1,
          stiffness: 7, // the higher value, the faster the animation
          damping: 0.000001, // never stop wiggle wiggle wiggle,
          useNativeDriver: true,
        }).start();
      }
    }
  }

  checkBox(value, index) {
    let smallArray = this.state.smallArray;
    smallArray[index].isCheck = value;
    this.setState({ smallArray: smallArray });
  }

  handelSubmitSave() {
    let time = `${this.state.timeContainer} second`;

    let score = `${this.state.correct_counter}/${this.state.questions.length}`;

    let date = new Date(),
      day = date.getDate(),
      month = date.getMonth() + 1,
      year = date.getFullYear(),
      hours = date.getHours(),
      minutes = date.getMinutes(),
      seconds = date.getSeconds();

    let dataContainer = `${day}/${month}/${year}`,
      timeContainer = `${hours}:${minutes}:${seconds > 9 ? seconds : '0' + seconds
        }`;

    this.setState({
      StorageData:
        this.state.choose == '"js"'
          ? [
            ...this.state.StorageData,
            [score, time, timeContainer, dataContainer],
          ]
          : this.state.StorageData,
      StorageData2:
        this.state.choose == '"cpp"'
          ? [
            ...this.state.StorageData2,
            [score, time, timeContainer, dataContainer],
          ]
          : this.state.StorageData2,
      backStoreColor: true,
      modalVisible: true,
      saveBtnShow: false
    });

    setTimeout(() => {
      this.setItimes();
    }, 1000);
  }

  customShare = async () => {
    const shareOptions = {
      message: `My Score In ${this.state.choose} quiz is ${this.state.correct_counter
        } Correct From ${this.state.questions.length}`,
      url: Files.Image1,
    };
    try {
      const ShareResponse = await Share.open(shareOptions);
      // console.log(JSON.stringify(shareOptions));
    } catch (error) {
      console.log('Error', error);
    }
  };

  _renderResult() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View>
          <Text style={{ fontSize: 40, fontWeight: 'bold', marginVertical: 30, color: '#fff' }}>
            Quiz ended
          </Text>
        </View>

        <View>
          <Text style={{ fontSize: 27, color: '#fff' }}>
            {' '}
            Total Time: {this.state.timeContainer} second
          </Text>
        </View>

        <View>
          <Text style={{ fontSize: 30, color: '#fff' }}>
            {this.state.correct_counter} Correct From{' '}
            {this.state.questions.length}
          </Text>
        </View>

        <Animated.View
          style={{
            backgroundColor: this.state.colorofScore,
            padding: 10,
            marginVertical: 10,
            opacity: this.state.fadeAmin,
            borderRadius: 20,
          }}>
          <Text style={{ fontSize: 24, color: '#fff' }}>
            {this.state.nameofScore}
          </Text>
        </Animated.View>

        {
          this.state.saveBtnShow ? (

            <TouchableOpacity
              onPress={() => {
                this.handelSubmitSave()
              }

              }
              style={{ width: '100%', alignItems: 'center' }}>
              <View

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
                  <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#fff' }}>Save Score</Text>
                </LinearGradient>
              </View>
            </TouchableOpacity>
          ) : (null)
        }


        <TouchableOpacity
          onPress={() => {
            this.customShare()
          }

          }
          style={{ width: '100%', alignItems: 'center' }}>
          <View

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
              <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#fff' }}>Share Score</Text>
            </LinearGradient>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  _renderScoresStorage() {
    return (
      <Modal
        visible={this.state.modalVisible}
        onRequestClose={() =>
          this.setState({
            backStoreColor: false,
            modalVisible: false,
          })
        }>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Animatable.Text
            animation="shake"
            iterationCount={'infinite'}
            duration={3500}
            style={{ fontSize: 30, fontWeight: 'bold' }}>
            {this.state.choose == '"js"' ? 'Js Quiz' : 'Cpp Quiz'}
          </Animatable.Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            borderWidth: 2,
            borderColor: '#333',
          }}>
          <View style={{ flex: 1 }}>
            <Text
              style={{ fontSize: 19, fontWeight: 'bold', textAlign: 'center' }}>
              Score
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{ fontSize: 19, fontWeight: 'bold', textAlign: 'center' }}>
              Duration
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{ fontSize: 19, fontWeight: 'bold', textAlign: 'center' }}>
              Time
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{ fontSize: 19, fontWeight: 'bold', textAlign: 'center' }}>
              Date
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', flex: 1 }}>
          <View style={{ flex: 1 }}>
            <FlatList
              data={
                this.state.choose == '"js"'
                  ? this.state.StorageData
                  : this.state.StorageData2
              }
              renderItem={({ item, index }) => (
                <View style={{ flexDirection: 'row' }}>
                  {item.map((child, indx) => (
                    <View
                      key={indx}
                      style={{
                        borderWidth: 1,
                        borderColor: '#333',
                        width: '25%',
                        backgroundColor:
                          index ==
                            (this.state.choose == '"js"'
                              ? this.state.StorageData.length - 1
                              : this.state.StorageData2.length - 1)
                            ? 'pink'
                            : '#fff',
                      }}>
                      <Text style={{ textAlign: 'center' }}>{child}</Text>
                    </View>
                  ))}
                </View>
              )}
              keyExtractor={item => '' + Math.random()}
            />
          </View>
        </View>
      </Modal>
    );
  }

  _renderQuizContent() {
    return (
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <Text style={{ fontSize: 17 }}>
            {' '}
            Score:{this.state.correct_counter}/{this.state.questions.length}
          </Text>
          <Text style={{ fontSize: 17 }}>
            {' '}
            Question number:{this.state.indexOfQuestion + 1}/
            {this.state.questions.length}
          </Text>
          <Text style={{ fontSize: 17 }}>
            {' '}
            Timer:
            <Text style={{ color: '#f00' }}>
              {this.state.timer.toString().length == 1
                ? `0${this.state.timer}`
                : this.state.timer}
            </Text>
          </Text>
        </View>

        <View style={{ flex: 2, margin: 10 }}>
          <Text
            style={{
              alignSelf: 'center',
              fontSize: 25,
              fontFamily: 'Sriracha-Regular',
              color: '#fff',
            }}>
            {this.state.smallArray[0].title}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            flex: 1,
          }}>
          <Text style={{ fontSize: 17, width: '75%' }}>
            {this.state.smallArray[1].answer}
          </Text>
          <CheckBox
            c
            style={{ width: '15%' }}
            value={this.state.smallArray[1].isCheck}
            onValueChange={value => this.checkBox(value, 1)}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            flex: 1,
          }}>
          <Text style={{ fontSize: 17, width: '75%' }}>
            {this.state.smallArray[2].answer}
          </Text>
          <CheckBox
            style={{ width: '15%' }}
            value={this.state.smallArray[2].isCheck}
            onValueChange={value => this.checkBox(value, 2)}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            flex: 1,
          }}>
          <Text style={{ fontSize: 17, width: '75%' }}>
            {this.state.smallArray[3].answer}
          </Text>
          <CheckBox
            style={{ width: '15%' }}
            value={this.state.smallArray[3].isCheck}
            onValueChange={value => this.checkBox(value, 3)}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            flex: 1,
          }}>
          <Text style={{ fontSize: 17, width: '75%' }}>
            {this.state.smallArray[4].answer}
          </Text>
          <CheckBox
            style={{ width: '15%' }}
            value={this.state.smallArray[4].isCheck}
            onValueChange={value => this.checkBox(value, 4)}
          />
        </View>


        <TouchableOpacity
          onPress={() => {
            this.changeQuestion()
          }

          }
          style={{ width: '100%', alignItems: 'center' }}>
          <View

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
              <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#fff' }}>Submit</Text>
            </LinearGradient>
          </View>
        </TouchableOpacity>



      </View>
    );
  }

  render() {
    return (
      <LinearGradient colors={['#5fc3e4', '#e55d87']} style={{ flex: 1 }}>
        {this.state.loader ? (
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <ActivityIndicator color="#00f" size={100} />
          </View>
        ) : this.state.result == 1 ? (
          <View style={{ flex: 1 }}>
            {this._renderResult()}

            {this._renderScoresStorage()}
          </View>
        ) : (
              <View style={{ flex: 1 }}>{this._renderQuizContent()}</View>
            )}
      </LinearGradient>
    );
  }
}
