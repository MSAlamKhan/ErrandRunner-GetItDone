import {base_Url, token} from '../../constant/BaseUrl';
import {
  IS_LOADING_AUTH,
  USER_DETAILS,
  USER_ID,
  OTP_SEND,
  Response_Status,
  LOGIN,
  SOCIAL_LOGIN_DETAILS,
  LOGOUT,
} from '../reducers/AuthReducer';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import {
  GraphRequest,
  AccessToken,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk-next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';
import {Alert} from 'react-native';
import {CLEAR_CUSTOMER_DATA} from '../reducers/CustomerReducer';
import {CLEAR_RIDER_DATA} from '../reducers/ProviderReducer';

export const verifyEmail = (data, navigation, setModalVisible) => {
  return async dispatch => {
    await dispatch({type: IS_LOADING_AUTH, payload: true});

    try {
      let base_url = `${base_Url}/verifyEmail.php`;
      let checkEmail = new FormData();
      checkEmail.append('email', data.email);
      checkEmail.append('token', token);
      const response = await fetch(base_url, {
        method: 'post',
        body: checkEmail,
      });
      const responseData = await response.json();
      console.log(responseData);
      if (responseData.status === true) {
        setModalVisible(true);
        await dispatch({type: Response_Status, payload: responseData});
        await dispatch({type: OTP_SEND, payload: responseData.data.OTP});
        setTimeout(() => {
          navigation.navigate('otp', {data, type: 'registration'});
          setModalVisible(false);
        }, 1500);
        await dispatch({type: IS_LOADING_AUTH, payload: false});

        //
      } else {
        await dispatch({type: Response_Status, payload: responseData});
        await dispatch({type: IS_LOADING_AUTH, payload: false});
        setModalVisible(true);
      }
    } catch (error) {
      console.log(error);
      // await dispatch({type: IS_LOADING, payload: false});
    }
  };
};

export const register = (data, accountType, setModalVisible, SocialDetails) => {
  return async dispatch => {
    await dispatch({type: IS_LOADING_AUTH, payload: true});
    const notificationToken = await AsyncStorage.getItem('onesignaltoken');

    console.log('ACC TYPE : ', SocialDetails);
    try {
      let base_urlz = `${base_Url}/register.php`;
      let checkEmail = new FormData();
      checkEmail.append('token', token);
      checkEmail.append('address', data.address);
      checkEmail.append('city', data.city);
      checkEmail.append('email', data.email);
      checkEmail.append('first_name', data.firstName);
      checkEmail.append('last_name', data.lastName);
      checkEmail.append(
        'password',
        SocialDetails != null ? 'demo1234' : data.password,
      );
      checkEmail.append('phone', data.phoneNumber);
      checkEmail.append('state', data.state);
      checkEmail.append('zipcode', data.zipCode);
      checkEmail.append('notification_token', notificationToken);
      checkEmail.append(
        'social_id',
        SocialDetails != null ? SocialDetails.uID : '',
      );
      checkEmail.append('role_id', accountType);

      const response = await fetch(base_urlz, {
        method: 'post',
        body: checkEmail,
      });

      const responseData = await response.json();
      // console.log('RESPONSEE DATAAA', responseData);
      if (responseData.status === true) {
        setModalVisible(true);
        await dispatch({type: Response_Status, payload: responseData});
        const loginToken = responseData.data.user_id;
        await dispatch({type: USER_DETAILS, payload: responseData.data});
        await dispatch({type: USER_ID, payload: loginToken});
        await dispatch({type: IS_LOADING_AUTH, payload: false});
        AsyncStorage.setItem('userDetails', JSON.stringify(responseData.data));
      } else {
        setModalVisible(true);
        console.log('ZZZCCC : ', responseData);
        await dispatch({type: Response_Status, payload: responseData});
        await dispatch({type: IS_LOADING_AUTH, payload: false});
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const loginApi = (data, setModalVisible) => {
  return async dispatch => {
    await dispatch({type: IS_LOADING_AUTH, payload: true});

    const notificationToken = await AsyncStorage.getItem('onesignaltoken');
    console.log('notification Token', notificationToken);
    try {
      let base_url = `${base_Url}/login.php`;
      let checkEmail = new FormData();

      checkEmail.append('email', data.email);
      checkEmail.append('password', data.password);
      checkEmail.append('token', token);
      checkEmail.append('notification_token', notificationToken);
      const response = await fetch(base_url, {
        method: 'post',
        body: checkEmail,
      });
      const responseData = await response.json();
      if (responseData.status === true) {
        console.log('LOGIN RESPONSE DATA : ', responseData);
        await dispatch({type: Response_Status, payload: responseData});
        setModalVisible(true);
        setTimeout(async () => {
          await dispatch({type: USER_DETAILS, payload: responseData.data});
          AsyncStorage.setItem(
            'userDetails',
            JSON.stringify(responseData.data),
          );
        }, 1500);

        await dispatch({type: IS_LOADING_AUTH, payload: false});
        //
      } else {
        await dispatch({type: IS_LOADING_AUTH, payload: false});
        await dispatch({type: Response_Status, payload: responseData});
        setModalVisible(true);
      }
    } catch (error) {
      console.log('error', error);
      await dispatch({type: IS_LOADING_AUTH, payload: false});
    }
  };
};
export const logout = (id, setModalVisible) => {
  return async dispatch => {
    let base_url = `${base_Url}/logout.php`;
    let formData = new FormData();
    formData.append('token', token);
    formData.append('user_id', id);
    const response = await fetch(base_url, {
      method: 'post',
      body: formData,
    });

    const responseData = await response.json();
    if (responseData.status == true) {
      await dispatch({type: USER_DETAILS, payload: null});
      // await AsyncStorage.removeItem('userDetails');
      await dispatch({type: LOGIN, payload: true});
      await dispatch({type: LOGOUT, payload: null});
      await dispatch({type: CLEAR_CUSTOMER_DATA, payload: null});
      await dispatch({type: CLEAR_RIDER_DATA, payload: null});
    } else {
      alert('Network Error');
    }

    // try {
    //   let base_url = `${base_Url}/logout.php`;
    //   let checkEmail = new FormData();
    //   checkEmail.append('token', token);
    //   checkEmail.append('id', id);
    //   const response = await fetch(base_url, {
    //     method: 'post',
    //     body: checkEmail,
    //   });
    //   const responseData = await response.json();
    //   console.log('resss===>', responseData);

    //   if (responseData.status === true) {
    //     setModalVisible(true);
    //     await dispatch({type: Response_Status, payload: responseData});
    //     await dispatch({type: IS_LOADING_AUTH, payload: false});
    //     setTimeout(async () => {
    //       await dispatch({type: USER_DETAILS, payload: null});
    //       await AsyncStorage.removeItem('userDetails');
    //       await dispatch({type: LOGIN, payload: true});
    //     }, 1500);

    //     //
    //   } else {
    //     await dispatch({type: IS_LOADING_AUTH, payload: false});
    //     await dispatch({type: Response_Status, payload: responseData});
    //     setModalVisible(true);
    //   }
    // } catch (error) {
    //   console.log('error', error);
    //   await dispatch({type: IS_LOADING_AUTH, payload: false});
    // }
  };
};

//Social Login
export const SocialLogin = (data, setModalVisible) => {
  console.log('data in social login', data);
  return async dispatch => {
    await dispatch({type: IS_LOADING_AUTH, payload: true});

    const notificationToken = await AsyncStorage.getItem('onesignaltoken');
    console.log('not', notificationToken);
    try {
      let base_url = `${base_Url}/login.php`;
      let checkEmail = new FormData();
      checkEmail.append('email', data.email);
      checkEmail.append('password', 'demo1234');
      checkEmail.append('token', token);
      checkEmail.append('notification_token', notificationToken);
      const response = await fetch(base_url, {
        method: 'post',
        body: checkEmail,
      });
      const responseData = await response.json();

      if (responseData.status === true) {
        setModalVisible(true);
        await dispatch({type: Response_Status, payload: responseData});
        await dispatch({type: IS_LOADING_AUTH, payload: false});
        setTimeout(async () => {
          await dispatch({type: USER_DETAILS, payload: responseData.data});
          AsyncStorage.setItem(
            'userDetails',
            JSON.stringify(responseData.data),
          );
        }, 1500);
      } else {
        setModalVisible(true);
        dispatch({type: IS_LOADING_AUTH, payload: false});
        dispatch({type: Response_Status, payload: responseData});
        dispatch({type: SOCIAL_LOGIN_DETAILS, payload: data});
        dispatch({type: LOGIN, payload: false});
      }
    } catch (error) {
      console.log('error', error);
      await dispatch({type: IS_LOADING_AUTH, payload: false});
    }
  };
};

export const FacebookSignin = setModalVisible => {
  return async dispatch => {
    LoginManager.logInWithPermissions([
      'public_profile',
      'email',
      'user_friends',
    ]).then(
      result => {
        console.log('====================================');
        console.log(`Login manager result ${result}`);
        console.log('====================================');
        if (result.isCancelled) {
          console.log('Login cancel from facebook');
        } else {
          console.log('fb login success');
        }

        AccessToken.getCurrentAccessToken().then(data => {
          console.log('====================================');
          console.log(`access token :  ${data}`);
          console.log('====================================');
          let accessToken = data.accessToken;
          // setToken(accessToken);

          const responseInfoCallback = (error, result) => {
            if (error) {
              console.log('Error fetching data: ' + error.toString());
            } else {
              const obj = {
                email: result.email ? result.email : '',
                firstName: result.first_name,
                lastName: result.last_name,
                picUrl: result.picture.data.url,
                uid: result.id,
              };
              dispatch(SocialLogin(obj, setModalVisible));
              console.log('ressss', result.id);
            }
          };
          const infoRequest = new GraphRequest(
            '/me',
            {
              accessToken: accessToken,
              parameters: {
                fields: {
                  string: 'email,name,first_name,middle_name,last_name,picture',
                },
              },
            },
            responseInfoCallback,
          );
          new GraphRequestManager().addRequest(infoRequest).start();
        });
      },
      function (error) {
        console.log('==> Facebook Login fail with error: ' + error);
      },
    );
  };
};

export const googleSignin = (setModalVisible, navigation) => {
  return async dispatch => {
    try {
      GoogleSignin.configure({
        offlineAccess: true,

        webClientId:
          '806885150352-97leth23d29avp4693tvsa0fjgf62grm.apps.googleusercontent.com',
        // iosClientId:
        //   '338956040538-ssvbdk7ns5nn52jpk4hqrcamet3fog8a.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('====================================');
      console.log('Google sigin  info : ', userInfo.user.email);
      console.log('====================================');
      const socialObj = {
        email: userInfo.user.email ? userInfo.user.email : '',
        firstName: userInfo.user.givenName,
        lastName: userInfo.user.familyName,
        picUrl: userInfo.user.photo,
        uID: userInfo.user.id,
      };
      dispatch({type: SOCIAL_LOGIN_DETAILS, payload: socialObj});
      console.log('google DATAA : ', {data: socialObj});
      dispatch(SocialLogin(socialObj, setModalVisible));
      // SocialLoginApi(userInfo.user);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('You cancelled the sign in.');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Google sign In operation is in process');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play Services not available');
      } else {
        console.log(
          'Something unknown went wrong with Google sign in. ' + error.message,
        );
      }
    }
  };
};

export const resetPassword = (data, setModalVisible, navigation) => {
  console.log('email', data);
  return async dispatch => {
    await dispatch({type: IS_LOADING_AUTH, payload: true});
    try {
      let base_url = `${base_Url}//reset_password.php`;
      let checkEmail = new FormData();
      checkEmail.append('email', data.email);
      checkEmail.append('token', token);
      const response = await fetch(base_url, {
        method: 'post',
        body: checkEmail,
      });
      const responseData = await response.json();
      console.log('resetPassword', responseData);
      if (responseData.status === true) {
        setModalVisible(true);
        await dispatch({type: Response_Status, payload: responseData});
        await dispatch({type: OTP_SEND, payload: responseData.data.OTP});
        setTimeout(() => {
          navigation.navigate('otp', {type: 'forgot', data: data});
          setModalVisible(false);
        }, 1500);
        await dispatch({type: IS_LOADING_AUTH, payload: false});

        //
      } else {
        await dispatch({type: Response_Status, payload: responseData});
        await dispatch({type: IS_LOADING_AUTH, payload: false});
        setModalVisible(true);
      }
    } catch (error) {
      console.log(error);
      await dispatch({type: IS_LOADING_AUTH, payload: false});
    }
  };
};
export const resentOTP = (data, setModalVisible) => {
  return async dispatch => {
    await dispatch({type: IS_LOADING_AUTH, payload: true});
    try {
      let base_url = `${base_Url}/resend_otp.php`;
      let checkEmail = new FormData();
      checkEmail.append('email', data.email);
      checkEmail.append('token', token);
      const response = await fetch(base_url, {
        method: 'post',
        body: checkEmail,
      });
      const responseData = await response.json();
      console.log('aaaa', responseData);
      if (responseData.status === true) {
        await dispatch({type: Response_Status, payload: responseData});
        await dispatch({type: OTP_SEND, payload: responseData.data.OTP});
        setModalVisible(true);
        setTimeout(() => {
          setModalVisible(false);
        }, 1500);
        await dispatch({type: IS_LOADING_AUTH, payload: false});

        //
      } else {
        await dispatch({type: Response_Status, payload: responseData});
        await dispatch({type: IS_LOADING_AUTH, payload: false});
        setModalVisible(true);
        setTimeout(() => {
          setModalVisible(false);
        }, 1500);
      }
    } catch (error) {
      console.log(error);
      await dispatch({type: IS_LOADING_AUTH, payload: false});
    }
  };
};
export const changePassowrd = (
  data,
  password,
  current,
  setModalVisible,
  navigation,
) => {
  // console.log('data and password', data, password);
  return async dispatch => {
    // await dispatch({type: IS_LOADING_AUTH, payload: true});
    try {
      let base_url = `${base_Url}/change_password.php`;
      let checkEmail = new FormData();
      checkEmail.append('email', data);
      checkEmail.append('password', password);
      checkEmail.append('current', current);
      checkEmail.append('token', token);
      const response = await fetch(base_url, {
        method: 'post',
        body: checkEmail,
      });
      const responseData = await response.json();
      console.log('responseData', responseData);
      if (responseData.status === true) {
        setModalVisible(true);
        // await dispatch({type: Response_Status, payload: responseData});

        setTimeout(() => {
          setModalVisible(false);
          navigation.goBack();
        }, 1500);
        // await dispatch({type: IS_LOADING_AUTH, payload: false});

        //
      } else {
        // await dispatch({type: Response_Status, payload: responseData});
        // await dispatch({type: IS_LOADING_AUTH, payload: false});
        setModalVisible(true);
      }
    } catch (error) {
      console.log(error);
      await dispatch({type: IS_LOADING_AUTH, payload: false});
      // await dispatch({type: IS_LOADING, payload: false});
    }
  };
};

// $user_id = $_POST['user_id'];
// $fname = $_POST['first_name'];
// $fname = $_POST['last_name'];
// $phone = $_POST['phone'];
// $address = $_POST['address'];
// $city = $_POST['city'];
// $state = $_POST['state'];
// $zipcode = $_POST['zipcode'];

export const editProfile = (
  data,
  user_id,
  fileName,
  uri,
  type,
  setModalVisible,
) => {
  console.log('VALEUEEe', uri);
  return async dispatch => {
    await dispatch({type: IS_LOADING_AUTH, payload: true});
    const notificationToken = await AsyncStorage.getItem('onesignaltoken');
    console.log('not', notificationToken);
    try {
      let base_url = `${base_Url}/update_profile.php`;
      let checkEmail = new FormData();
      checkEmail.append('token', token);
      checkEmail.append('user_id', user_id);
      checkEmail.append('first_name', data.firstName);
      checkEmail.append('last_name', data.lastName);
      checkEmail.append('phone', data.phoneNumber);
      checkEmail.append('address', data.address);
      checkEmail.append('city', data.city);
      checkEmail.append('state', data.state);
      checkEmail.append('zipcode', data.ZipCode);
      checkEmail.append('email', data.email);
      checkEmail.append('profilepic', {
        name: fileName,
        uri: uri,
        type: type,
      });
      const response = await fetch(base_url, {
        method: 'post',
        body: checkEmail,
      });
      const responseData = await response.json();
      console.log('resss of update ', responseData);
      if (responseData.status === true) {
        setModalVisible(true);
        await dispatch({type: Response_Status, payload: responseData});
        setTimeout(async () => {
          await dispatch({type: USER_DETAILS, payload: responseData.data});
          AsyncStorage.setItem(
            'userDetails',
            JSON.stringify(responseData.data),
          );
        }, 1500);

        await dispatch({type: IS_LOADING_AUTH, payload: false});
        //
      } else {
        await dispatch({type: IS_LOADING_AUTH, payload: false});
        await dispatch({type: Response_Status, payload: responseData});
        setModalVisible(true);
      }
    } catch (error) {
      console.log('error', error);
      await dispatch({type: IS_LOADING_AUTH, payload: false});
    }
  };
};
