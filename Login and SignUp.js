import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
  BackHandler,
  TouchableWithoutFeedback,

} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';

export default class Login_and_SignUp extends Component {
  constructor() {
    super();
    this.state = {
      membersData: [

      ],
      bs: React.createRef(),
      fall: new Animated.Value(1),
      bottomSheetOpacity: 0,
      userName_input: '',
      passWord_input: '',
      email: '',
      newPassWord: '',
      newPassWordAgain: '',
      newUserName: '',
      newImg: '',
      signUpShow: false,
      userNameBorder: 0,
      passWordBorder: 0,
      showIconPasswordSignUp: true,
      showIconPasswordLogin: true,
      emailMsg: '',
      userNameMsg: '',
      passwordMsg: '',
      emailBorder: 0,
      emailBorderColor: '',
      passwordSignUpColor: '',
      passwordAgainSignUpColor: '',
      passworAgaindMsg: '',
      usernameBorderColor: '',
      disabledInput: 'flex',
    };
  }

  async setMembersData() {
    await AsyncStorage.setItem(
      'membersData',
      JSON.stringify(this.state.membersData),
    );
  }

  async getMembersData() {
    let dataMembers = await AsyncStorage.getItem('membersData');

    dataMembers = dataMembers ?? []

    dataMembers = JSON.stringify(dataMembers) != '[]' ? JSON.parse(dataMembers) : [];

    this.setState({
      membersData: dataMembers,
    });
  }

  backPressed = () => {
    if (this.props.navigation.isFocused()) {

      BackHandler.exitApp();
    }

  };

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backPressed);
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backPressed);

    this.getMembersData();
  }

  loginFunc() {
    let membersData = this.state.membersData,
      userName = this.state.userName_input,
      passWord = this.state.passWord_input,
      userNameCheck = 1,
      passWordCheck = 1,
      checkEmpty = 1,
      checkSuccess = false;

    for (let i of membersData) {
      if (userName == i.userName && passWord == i.passWord) {
        checkSuccess = true;
        this.props.navigation.navigate('Home', {
          userName: userName,
          imgSrc: i.imgSrc,
        });

        this.setState({
          showIconPasswordLogin: true
        })
      }

      userName == '' || passWord == '' ? (checkEmpty = 0) : null;

      if (userName == i.userName) {
        userNameCheck = 0
        if (passWord == i.passWord) {

          passWordCheck = 0
        } else {
          null;
        }
      } else {
        null;

      }


    }

    checkEmpty == 1 ? null : alert('Inputs Should Not Be Empty');

    userNameCheck == 1
      ? this.setState({
        usernameBorderColor: '#f00',
        userNameMsg: 'Wrong User Name',
      })
      : this.setState({ usernameBorderColor: '', userNameMsg: '' });

    passWordCheck == 1
      ? this.setState({
        passwordSignUpColor: '#f00',
        passwordMsg: 'Wrong Password',
      })
      : this.setState({ passwordSignUpColor: '', passwordMsg: '' });

    this.setState({
      userName_input: checkSuccess == true ? '' : this.state.userName_input,
      passWord_input: checkSuccess == true ? '' : this.state.passWord_input,
    });
  }

  openSingUpPage() {
    this.setState({
      email: '',
      UserName: '',
      newPassWord: '',
      newPassWordAgain: '',
      newImg: '',
      signUpShow: true,
      emailMsg: '',
      userNameMsg: '',
      passwordMsg: '',
      userNameBorder: 0,
      passWordBorder: 0,
      userName_input: '',
      passWord_input: '',
      emailBorderColor: '',
      passwordSignUpColor: '',
      passwordAgainSignUpColor: '',
      passworAgaindMsg: '',
      usernameBorderColor: '',
      showIconPasswordSignUp: true,
    });
  }

  openLoginPage() {
    this.setState({
      signUpShow: false,
      passwordMsg: '',
      userNameMsg: '',
      bottomSheetOpacity: 1,
      userNameMsg: '',
      passwordMsg: '',
      usernameBorderColor: '',
      passwordSignUpColor: '',
      disabledInput: 'flex',
      showIconPasswordLogin: true,
    });
  }

  validateEmail = email => {
    let reg = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
    if (reg.test(email) === false) {
      return false;
    } else {
      return true;
    }
  };

  cancelBottomSheet() {
    this.setState({
      disabledInput: 'flex',
    });
    this.state.bs.current.snapTo(1);
  }


  signUpFunc() {
    let membersData = this.state.membersData,
      email = this.state.email,
      userName = this.state.newUserName,
      passWord = this.state.newPassWord,
      passWordAgain = this.state.newPassWordAgain,
      newImg = this.state.newImg,
      emailCheck = 0,
      userNameCheck = 0,
      passwordCheck = 0,
      errors = 0;

    if (
      email != '' &&
      userName != '' &&
      passWord != '' &&
      passWordAgain != ''
    ) {
      // console.log('ok');
    } else {
      alert('Inputs Should Not Be Empty');
      this.setState({
        emailBorderColor: '#f00',
        passwordSignUpColor: '#f00',
        passwordAgainSignUpColor: '#f00',
        usernameBorderColor: '#f00',
      });
      errors++;
    }

    // ####################Email#########################

    if (email.length != 0 && this.state.emailBorderColor == '#0f0') {
      for (let i of membersData) {
        email == i.email ? (emailCheck = 1) : null;
      }

      if (emailCheck == 0) {
        this.setState({
          emailMsg: '',
          emailBorderColor: '#0f0',
        });
        // console.log('ok');
      } else {
        this.setState({
          emailMsg: 'This Email Is Existed .Input Another Email',
          emailBorderColor: '#f00',
        });
        errors++;
      }
    } else {
      errors++;
    }

    // ###########################################################

    // #################Password#####################################
    if (
      passWord.length != 0 &&
      passWordAgain.length != 0 &&
      this.state.passwordSignUpColor == '#0f0' &&
      this.state.passwordAgainSignUpColor == '#0f0'
    ) {
      if (passWord.length > 8) {
        // console.log('ok');
      } else {
        errors++;
      }

      if (passWord == passWordAgain) {
        for (let i of membersData) {
          passWord == i.passWord ? (passwordCheck = 1) : null;
        }

        if (passwordCheck == 0) {
          this.setState({
            passwordMsg: '',
            passwordSignUpColor: '#0f0',
            passwordAgainSignUpColor: '#0f0',
          });
          // console.log('ok');
        } else {
          this.setState({
            passwordMsg: 'This Password Is Existed .Input Another Password',
            passwordSignUpColor: '#f00',
            passwordAgainSignUpColor: '#f00',
          });
          errors++;
        }
      }
    } else {
      errors++;
    }

    // ##################################################################3

    // #############################UserName##################################
    if (userName.length != 0 && this.state.usernameBorderColor == '#0f0') {
      for (let i of membersData) {
        userName == i.userName ? (userNameCheck = 1) : null;
      }

      if (userNameCheck == 0) {
        this.setState({
          userNameMsg: '',
          usernameBorderColor: '#0f0',
        });
      } else {
        this.setState({
          userNameMsg: 'This Username Is Existed .Input Another Username',
          usernameBorderColor: '#f00',
        });
        errors++;
      }
    }
    // ###############################################################

    if (errors == 0) {
      let newAccount = {
        email: email,
        userName: userName,
        passWord: passWord,
        imgSrc: newImg,
      };

      membersData.push(newAccount);

      this.setState({
        membersData: membersData,
        signUpShow: false,
        bottomSheetOpacity: 1,
        userNameMsg: '',
        passwordMsg: '',
        usernameBorderColor: '',
        passwordSignUpColor: '',
        disabledInput: 'flex',
        showIconPasswordSignUp: true,
        showIconPasswordLogin: true,
      });

      setTimeout(() => {
        this.setMembersData();
      }, 500);

      this.props.navigation.navigate('Home', {
        userName: userName,
        imgSrc: newImg,
      });
    }
  }

  personImgFromLibrary() {
    ImagePicker.openPicker({
      compressImageMaxWidth: 400,
      compressImageMaxHeight: 400,
      cropping: true,

      compressImageQuality: 0.7,
    })
      .then(image => {
        // console.log(image);
        this.setState({
          newImg: image.path,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  personImgFromCamera() {
    ImagePicker.openCamera({
      compressImageMaxWidth: 400,
      compressImageMaxHeight: 400,
      cropping: true,

      compressImageQuality: 0.7,
    })
      .then(image => {
        // console.log(image);
        this.setState({
          newImg: image.path,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  renderInner = () => (
    <View
      style={{
        height: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#DAECEC',
      }}>
      <View>
        <Text style={{ color: '#4B6FF7', fontSize: 25, fontWeight: 'bold' }}>
          Upload Personal Photo
        </Text>
      </View>


      <TouchableOpacity
        onPress={() => {
          this.personImgFromLibrary()
        }

        }
        style={{ width: '100%', alignItems: 'center' }}>
        <View
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
            <Text style={{ fontSize: 20, color: '#fff', fontWeight: 'bold' }}>Selelct From Library</Text>
          </LinearGradient>
        </View>
      </TouchableOpacity>


      <TouchableOpacity
        onPress={() => {
          this.personImgFromCamera()
        }

        }
        style={{ width: '100%', alignItems: 'center' }}>
        <View
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
            <Text style={{ fontSize: 20, color: '#fff', fontWeight: 'bold' }}>Open Camera</Text>
          </LinearGradient>
        </View>
      </TouchableOpacity>




      <TouchableOpacity
        onPress={() => {
          this.cancelBottomSheet()
        }

        }
        style={{ width: '100%', alignItems: 'center' }}>
        <View
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
            <Text style={{ fontSize: 20, color: '#fff', fontWeight: 'bold' }}>Cancel</Text>
          </LinearGradient>
        </View>
      </TouchableOpacity>
    </View>
  );

  _renderLogin() {
    return (
      <>
        <Image
          style={{ width: 150, height: 150, borderRadius: 75 }}
          source={{
            uri:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTt0yboM1y3PKIke01cHJpc0V7j-LAmoZ4PkQ&usqp=CAU',
          }}
        />

        <TextInput
          style={{
            width: '80%',
            height: 60,
            backgroundColor: '#fff',
            marginVertical: 15,
            padding: 10,
            borderRadius: 10,
            borderBottomLeftRadius:
              this.state.usernameBorderColor == '' ? 10 : 0,
            borderBottomRightRadius:
              this.state.usernameBorderColor == '' ? 10 : 0,
            borderBottomWidth: 5,
            borderColor:
              this.state.usernameBorderColor != ''
                ? this.state.usernameBorderColor
                : 'transparent',
            fontSize: 17,
            color: '#000',
          }}
          defaultValue={this.state.userName_input}
          onChangeText={username => {
            this.setState({
              userName_input: username.trim(),
            });
          }}
          placeholder="User Name"
          placeholderTextColor="#000"
          selectionColor="#fff"
        />
        {this.state.userNameMsg != '' ? (
          <Text
            style={{
              color: '#ffcccb',
              fontSize: 17,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            {this.state.userNameMsg}
          </Text>
        ) : null}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#fff',
            width: '80%',
            height: 60,
            marginVertical: 15,
            paddingLeft: 10,
            paddingRight: 10,
            borderRadius: 10,
            borderBottomLeftRadius:
              this.state.passwordSignUpColor == '' ? 10 : 0,
            borderBottomRightRadius:
              this.state.passwordSignUpColor == '' ? 10 : 0,
            borderBottomWidth: 5,
            borderColor:
              this.state.passwordSignUpColor != ''
                ? this.state.passwordSignUpColor
                : 'transparent',
          }}>
          <TextInput
            style={{
              fontSize: 17,
              color: '#000',
              width: '88%',
              height: '100%',
            }}
            defaultValue={this.state.passWord_input}
            secureTextEntry={this.state.showIconPasswordLogin ? false : true}
            onChangeText={password => {
              this.setState({
                passWord_input: password.trim(),
              });
            }}
            placeholder="Password"
            placeholderTextColor="#000"
          />

          {this.state.showIconPasswordLogin == true ? (
            <TouchableOpacity
              onPress={() =>
                this.setState({
                  showIconPasswordLogin: false,
                })
              }>
              <Icon name="eye" size={30} />
            </TouchableOpacity>
          ) : (
              <TouchableOpacity
                onPress={() =>
                  this.setState({
                    showIconPasswordLogin: true,
                  })
                }>
                <Icon name="eye-slash" size={30} />
              </TouchableOpacity>
            )}
        </View>

        {this.state.passwordMsg != '' ? (
          <Text
            style={{
              color: '#ffcccb',
              fontSize: 17,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            {this.state.passwordMsg}
          </Text>
        ) : null}

        <TouchableOpacity
          onPress={() => {
            this.loginFunc()
          }

          }
          style={{ width: '100%', alignItems: 'center' }}>
          <View
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
              <Text style={{ fontSize: 30, color: '#fff' }}>Log In</Text>
            </LinearGradient>
          </View>
        </TouchableOpacity>




        <View style={{ flexDirection: 'row' }}>
          <View>
            <Text>Don't have an account?</Text>
          </View>
          <TouchableOpacity onPress={() => this.openSingUpPage()}>
            <Text style={{ color: '#fff' }}> Sign Up </Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }

  _renderSignUp() {
    return (
      <Modal
        animated="slide"
        visible={this.state.signUpShow}
        onRequestClose={() => {
          if (this.state.disabledInput == 'none') {

            this.state.bs.current.snapTo(1);
            this.setState({
              disabledInput: 'flex'
            })
          } else {

            this.openLoginPage();
          }
        }}>
        <LinearGradient
          colors={['#e55d87', '#5fc3e4']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={{ flex: 1 }}>
          <BottomSheet
            ref={this.state.bs}
            snapPoints={[330, 0]}
            initialSnap={1}
            callbackNode={this.state.fall}
            renderContent={this.renderInner}
            renderHeader={this.renderHeader}
            enabledGestureInteraction={true}
          />

          <TouchableWithoutFeedback onPress={() => this.cancelBottomSheet()}>
            <Animated.View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                opacity: Animated.add(
                  this.state.bottomSheetOpacity == 0 ? 0.1 : 1,
                  Animated.multiply(this.state.fall, 1.0),
                ),
              }}>
              <View style={{ marginVertical: 20 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff' }}>
                  Choose personal picture
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  this.state.bs.current.snapTo(0);
                  this.setState({
                    bottomSheetOpacity: 0,
                    disabledInput: 'none',
                  });
                }}>
                <Image
                  style={{ width: 150, height: 150, borderRadius: 75 }}
                  source={{
                    uri:
                      this.state.newImg != ''
                        ? this.state.newImg
                        : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTt0yboM1y3PKIke01cHJpc0V7j-LAmoZ4PkQ&usqp=CAU',
                  }}
                />
              </TouchableOpacity>

              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  marginVertical: 15,
                }}>
                <TextInput
                  style={{
                    width: '80%',
                    display: this.state.disabledInput,
                    height: 60,
                    backgroundColor: '#fff',
                    padding: 10,
                    borderRadius: 10,
                    fontSize: 17,
                    borderBottomLeftRadius:
                      this.state.emailBorderColor == '' ? 10 : 0,
                    borderBottomRightRadius:
                      this.state.emailBorderColor == '' ? 10 : 0,
                    borderBottomWidth: 5,
                    borderColor:
                      this.state.emailBorderColor != ''
                        ? this.state.emailBorderColor
                        : 'transparent',
                    color: '#000',
                  }}
                  onChangeText={email => {
                    if (
                      this.validateEmail(email.trim()) &&
                      (email.trim().endsWith('@gmail.com') ||
                        email.trim().endsWith('@yahoo.com') ||
                        email.trim().endsWith('@hotmail.com') ||
                        email.trim().endsWith('@msn.com') ||
                        email.trim().endsWith('@outlook.com'))
                    ) {
                      this.setState({
                        emailBorderColor: '#0f0',
                        emailMsg: '',
                      });
                    } else {
                      this.setState({
                        emailBorderColor: '#f00',
                        emailMsg: 'Email Should Be Valid',
                      });
                    }
                    this.setState({
                      email: email.trim(),
                    });
                  }}
                  placeholder="Email"
                  placeholderTextColor="#000"
                  selectionColor="#fff"
                />
              </View>
              {this.state.emailMsg != '' ? (
                <Text
                  style={{
                    color: '#ffcccb',
                    fontSize: 17,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  {this.state.emailMsg}
                </Text>
              ) : null}

              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  marginVertical: 15,
                }}>
                <TextInput
                  style={{
                    width: '80%',
                    display: this.state.disabledInput,
                    height: 60,
                    backgroundColor: '#fff',
                    padding: 10,
                    borderRadius: 10,
                    fontSize: 17,
                    borderBottomLeftRadius:
                      this.state.usernameBorderColor == '' ? 10 : 0,
                    borderBottomRightRadius:
                      this.state.usernameBorderColor == '' ? 10 : 0,
                    borderBottomWidth: 5,
                    borderColor:
                      this.state.usernameBorderColor != ''
                        ? this.state.usernameBorderColor
                        : 'transparent',
                    color: '#000',
                  }}
                  onChangeText={username => {
                    if (username.length > 10) {
                      this.setState({
                        usernameBorderColor: '#0f0',
                        userNameMsg: '',
                      });
                    } else {
                      this.setState({
                        usernameBorderColor: '#f00',
                        userNameMsg: 'User Name Should Be More Than 10',
                      });
                    }

                    this.setState({
                      newUserName: username.trim(),
                    });
                  }}
                  placeholder="New User Name"
                  placeholderTextColor="#000"
                  selectionColor="#fff"
                />
              </View>

              {this.state.userNameMsg != '' ? (
                <Text
                  style={{
                    color: '#ffcccb',
                    fontSize: 17,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  {this.state.userNameMsg}
                </Text>
              ) : null}

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: '#fff',
                  width: '80%',
                  display: this.state.disabledInput,
                  height: 60,
                  marginVertical: 15,
                  paddingLeft: 10,
                  paddingRight: 10,
                  borderRadius: 10,
                  borderBottomLeftRadius:
                    this.state.passwordSignUpColor == '' ? 10 : 0,
                  borderBottomRightRadius:
                    this.state.passwordSignUpColor == '' ? 10 : 0,
                  borderBottomWidth: 5,
                  borderColor:
                    this.state.passwordSignUpColor != ''
                      ? this.state.passwordSignUpColor
                      : 'transparent',
                }}>
                <TextInput
                  style={{
                    fontSize: 17,
                    color: '#000',
                    width: '88%',
                    height: '100%',
                  }}
                  secureTextEntry={
                    this.state.showIconPasswordSignUp ? false : true
                  }
                  onChangeText={password => {
                    if (password.trim().length > 8) {
                      this.setState({
                        passwordSignUpColor: '#0f0',
                        passwordMsg: '',
                      });

                      let testContainer = [];

                      for (let i of password.trim()) {
                        if (i * 0 == 0) {
                          testContainer.push('number');
                        }
                      }

                      if (password.trim() * 0 != 0) {
                        this.setState({
                          passwordSignUpColor: '#0f0',
                          passwordMsg: '',
                        });

                        if (testContainer.length >= 3) {
                          this.setState({
                            passwordSignUpColor: '#0f0',
                            passwordMsg: '',
                          });
                        } else {
                          this.setState({
                            passwordSignUpColor: '#f00',
                            passwordMsg:
                              'Password Should Contains At Least 3 Numbers ',
                          });
                        }
                      } else {
                        this.setState({
                          passwordSignUpColor: '#f00',
                          passwordMsg: 'Password Should Contains Characters ',
                        });
                      }
                    } else {
                      this.setState({
                        passwordSignUpColor: '#f00',
                        passwordMsg: 'Password Should Be More Than 8 ',
                      });
                    }
                    if (this.state.newPassWordAgain.trim().length != 0) {
                      if (
                        password.trim() == this.state.newPassWordAgain.trim()
                      ) {
                        this.setState({
                          passwordAgainSignUpColor: '#0f0',
                          passworAgaindMsg: '',
                        });
                      } else {
                        this.setState({
                          passwordAgainSignUpColor: '#f00',
                          passworAgaindMsg: "confirm password doesn't match",
                        });
                      }
                    }
                    this.setState({
                      newPassWord: password.trim(),
                    });
                  }}
                  placeholder="New Password"
                  placeholderTextColor="#000"
                />

                {this.state.showIconPasswordSignUp == true ? (
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({
                        showIconPasswordSignUp: false,
                      })
                    }>
                    <Icon name="eye" size={30} />
                  </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                      onPress={() =>
                        this.setState({
                          showIconPasswordSignUp: true,
                        })
                      }>
                      <Icon name="eye-slash" size={30} />
                    </TouchableOpacity>
                  )}
              </View>

              {this.state.passwordMsg != '' ? (
                <Text
                  style={{
                    color: '#ffcccb',
                    fontSize: 17,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  {this.state.passwordMsg}
                </Text>
              ) : null}

              <View
                style={{
                  alignItems: 'center',
                  backgroundColor: '#fff',
                  width: '80%',
                  display: this.state.disabledInput,
                  height: 60,
                  marginVertical: 15,
                  paddingLeft: 10,
                  borderRadius: 10,
                  borderBottomLeftRadius:
                    this.state.passwordAgainSignUpColor == '' ? 10 : 0,
                  borderBottomRightRadius:
                    this.state.passwordAgainSignUpColor == '' ? 10 : 0,
                  borderBottomWidth: 5,
                  borderColor:
                    this.state.passwordAgainSignUpColor != ''
                      ? this.state.passwordAgainSignUpColor
                      : 'transparent',
                }}>
                <TextInput
                  style={{
                    fontSize: 17,
                    color: '#000',
                    width: '100%',
                    height: '100%',
                  }}
                  secureTextEntry={
                    this.state.showIconPasswordSignUp ? false : true
                  }
                  onChangeText={password => {
                    if (password.trim() == this.state.newPassWord.trim()) {
                      this.setState({
                        passwordAgainSignUpColor: '#0f0',
                        passworAgaindMsg: '',
                      });
                    } else {
                      this.setState({
                        passwordAgainSignUpColor: '#f00',
                        passworAgaindMsg: "confirm password doesn't match",
                      });
                    }
                    this.setState({
                      newPassWordAgain: password,
                    });
                  }}
                  placeholder="Confirm Password"
                  placeholderTextColor="#000"
                />
              </View>

              {this.state.passworAgaindMsg != '' ? (
                <Text
                  style={{
                    color: '#ffcccb',
                    fontSize: 17,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  {this.state.passworAgaindMsg}
                </Text>
              ) : null}

              <TouchableOpacity
                onPress={() => {
                  this.signUpFunc()
                }

                }
                style={{ width: '100%', alignItems: 'center' }}>
                <View
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
                    <Text style={{ fontSize: 30, color: '#fff' }}>Sign Up</Text>
                  </LinearGradient>
                </View>
              </TouchableOpacity>



              <View style={{ flexDirection: 'row' }}>
                <View>
                  <Text>Have an account?</Text>
                </View>
                <TouchableOpacity onPress={() => this.openLoginPage()}>
                  <Text style={{ color: '#fff' }}> Log In</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </TouchableWithoutFeedback>
        </LinearGradient>
      </Modal>
    );
  }

  render() {
    return (
      <LinearGradient
        colors={['#e55d87', '#5fc3e4']}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {this._renderLogin()}

        {this._renderSignUp()}
      </LinearGradient>
    );
  }
}
