import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';

import {Provider as StoreProvider, useDispatch} from 'react-redux';
import AppNavigationContainer from './src/navigator/NavigatorContainer';
import store from './src/redux/Store';
import OneSignal from 'react-native-onesignal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AccountType from './src/screen/Authentication/AccountType';
import {USER_DETAILS} from './src/redux/reducers/AuthReducer';
const App = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 3500);
  }, []);

  useEffect(() => {
    OneSignal.setLogLevel(6, 0);
    OneSignal.setAppId('115eddf7-e4bd-4ea9-b92c-177986f0f572');
    OneSignal.promptForPushNotificationsWithUserResponse(response => {
      console.log('Prompt response:', response);
    });
    OneSignal.setNotificationWillShowInForegroundHandler(
      notificationReceivedEvent => {
        let notification = notificationReceivedEvent.getNotification();
        console.log('notification: ', notification);
        OneSignal.add;
        const data = notification.additionalData;
        console.log('additionalData: ', data);
        notificationReceivedEvent.complete(notification);
      },
    );
    OneSignal.setNotificationOpenedHandler(notification => {});
    OneSignal.addSubscriptionObserver(async event => {
      if (event.to.isSubscribed) {
        const state = await OneSignal.getDeviceState();
        console.log('state.userId=======>', state.userId);
        await AsyncStorage.setItem('onesignaltoken', state.userId);
        // dispatch({ type: NOTIFICATION_TOKEN, payload: state.userId });
      }
    });
  }, []);

  const dispatch = useDispatch();
  const getUser = async () => {
    const user = await AsyncStorage.getItem('userDetails');
    if (user) {
      const parsedUser = JSON.parse(user);
      dispatch({type: USER_DETAILS, payload: parsedUser});
    } else {
      console.log('noData');
    }
  };
  useEffect(() => {
    getUser();
    // AsyncStorage.clear();
  }, []);

  return <AppNavigationContainer />;
};

export default App;
