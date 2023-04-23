import {StyleSheet, Text, View, FlatList, LogBox} from 'react-native';
import React, {useState, useCallback} from 'react';
import {Colors} from '../../../constant/Colors';
import {Font} from '../../../constant/Font';
import PersonCard from '../../../components/cards/PersonCard';

import AsignTaskContainer from '../../../components/Task/AsignTaskContainer';

import CustomButton from '../../../components/buttons/CustomButton';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {scale} from 'react-native-size-matters-ch';
import {useDispatch, useSelector} from 'react-redux';
import {base_Url, token} from '../../../constant/BaseUrl';
import RNLocation from 'react-native-location';
import {CompleteTask} from '../../../redux/actions/ProviderAction';
import AddTaskModal from '../../../components/modals/AddTaskModal';
import OneSignal from 'react-native-onesignal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  MY_INTERVAL,
  CUSTOMER_DETAILS,
} from '../../../redux/reducers/ProviderReducer';
import {useEffect} from 'react';

const CurrentTask = () => {
  const [status, setStatus] = useState([]);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const modal_status = useSelector(state => state.provider.modal_status);
  const riderId = useSelector(state => state.auth.user_details.user_id);
  const currentTask = useSelector(state => state.provider.taskDetails);
  const taskId = useSelector(state => state.provider.taskId);

  const currentCustomer = useSelector(state => state.provider.customerName);
  const customerId = useSelector(state => state.provider.customerID);

  const getSubTaskStatus = async () => {
    try {
      let base_url = `${base_Url}/rider/get_task_stats.php`;
      let formData = new FormData();
      formData.append('token', token);
      formData.append('task_id', taskId);
      const response = await fetch(base_url, {
        method: 'post',
        body: formData,
      });
      const responseData = await response.json();
      if (responseData.status == true) {
        console.log('====================================');
        console.log('Response in Get Status', responseData.data);
        console.log('====================================');
        setStatus(responseData.data);
        console.log('====================================');
        console.log('STATUS => ', status);
        console.log('====================================');
      }
    } catch (error) {
      console.log('====================================');
      console.log(`ERROR in get sub Task : ${error}`);
      console.log('====================================');
    }
  };
  const [location, setLocation] = useState();

  const getCurrentLocation = () => {
    RNLocation.configure({
      distanceFilter: 100, // Meters
      desiredAccuracy: {
        ios: 'best',
        android: 'balancedPowerAccuracy',
      },
      // Android only
      androidProvider: 'auto',
      interval: 5000, // Milliseconds
      fastestInterval: 10000, // Milliseconds
      maxWaitTime: 5000, // Milliseconds
    });
    RNLocation.getLatestLocation().then(latestLocation => {
      setLocation({
        lat: latestLocation.latitude,
        long: latestLocation.longitude,
      });
    });
    console.log('====================================');
    console.log('location in Current task ==>', location);
    console.log('====================================');
  };
  // const interval = useSelector(state => state.provider.my_interval);

  // let xIntervalId;

  // OneSignal.setNotificationWillShowInForegroundHandler(
  //   notificationReceivedEvent => {
  //     let notification = notificationReceivedEvent.getNotification();
  //     OneSignal.add;
  //     const data = notification.additionalData;
  //     let notification_user = data;
  //     AsyncStorage.setItem('customer_token', notification_user.user_noti);
  //     console.log('start', notification_user.user_noti);
  //     isTracking();
  //     notificationReceivedEvent.complete(notification);
  //   },
  // );

  // const isTracking = async () => {
  //   try {
  //     let base_url = `${base_Url}/rider/check_tracking_status.php`;
  //     let formData = new FormData();
  //     formData.append('token', token);
  //     formData.append('rider_id', riderId);

  //     const response = await fetch(base_url, {
  //       method: 'post',
  //       body: formData,
  //     });
  //     const responseData = await response.json();

  //     if (responseData.status == true) {
  //       if (responseData.tracking_status == 'yes') {
  //         xIntervalId = createInterval();
  //         dispatch({ type: MY_INTERVAL, payload: xIntervalId });
  //         console.log('====================================');
  //         console.log('interval Number');
  //         console.log('====================================');
  //       } else {
  //         console.log('====================================');
  //         console.log(false);
  //         console.log('====================================');
  //         stopCounter(interval);
  //       }
  //     } else {
  //       console.log('statue not true');
  //     }
  //   } catch (error) {
  //     console.log('====================================');
  //     console.log('ERROR IN IS TACKING :', error);
  //     console.log('====================================');
  //   }
  // };
  // function createInterval() {
  //   return setInterval(function () {
  //     RNLocation.getLatestLocation().then(latestLocation => {
  //       sendLatLng(latestLocation.latitude, latestLocation.longitude);
  //     });
  //   }, 1500);
  // }
  // async function sendLatLng(latitude, longitude) {
  //   const customer_token = await AsyncStorage.getItem('customer_token');

  //   var myHeaders = new Headers();
  //   myHeaders.append('Accept', 'application/json');
  //   myHeaders.append(
  //     'Authorization',
  //     'Basic MTg0OTVlYWYtYjY5Yi00YjY5LTliNGYtOTQxNTczOWIwMDJh',
  //   );
  //   myHeaders.append('content-type', 'application/json');
  //   var raw = JSON.stringify({
  //     app_id: '115eddf7-e4bd-4ea9-b92c-177986f0f572',
  //     include_player_ids: [customer_token],
  //     android_sound: 'nil',
  //     ios_sound: 'nil',
  //     android_channel_id: '88e0b376-0f64-48b0-ba99-85a3f766eaf5',
  //     data: {
  //       lat: latitude,
  //       lng: longitude,
  //     },
  //     contents: {
  //       en: 'User is tacking',
  //     },
  //     name: 'INTERNAL_CAMPAIGN_NAME',
  //   });
  //   var requestOptions = {
  //     method: 'POST',
  //     headers: myHeaders,
  //     body: raw,
  //     redirect: 'follow',
  //   };
  //   fetch('https://onesignal.com/api/v1/notifications', requestOptions)
  //     .then(response => response.text())
  //     .then(result => console.log(result))
  //     .catch(error => console.log('error', error));
  // }

  // function stopCounter(id) {
  //   clearInterval(id);
  //   dispatch({ type: MY_INTERVAL, payload: null });
  // }
  const getCurrentTaskDetails = async () => {
    dispatch({
      type: CUSTOMER_DETAILS,
      payload: {
        taskId: await AsyncStorage.getItem('taskId'),
        customerId: await AsyncStorage.getItem('customerId'),
        tasks: JSON.parse(await AsyncStorage.getItem('tasks')),
        customerName: await AsyncStorage.getItem('customerName'),
      },
    });
  };
  useFocusEffect(
    useCallback(() => {
      getSubTaskStatus();
      getCurrentTaskDetails();
      getCurrentLocation();
    }, [navigation, status]),
  );

  return currentTask && currentTask.length > 0 ? (
    <View style={styles.container}>
      <AddTaskModal message={modal_status.message} visible={visible} />
      <Text style={styles.titleText}>Details</Text>
      <PersonCard
        name={currentCustomer}
        onPress={() => navigation.navigate('chat', {id: customerId})}
      />
      <View style={{height: scale(400)}}>
        <FlatList
          data={currentTask}
          style={{height: 90}}
          // keyExtractor={item => item.serial_number}
          renderItem={({item, index}) => {
            return (
              <AsignTaskContainer
                data={item}
                index={index}
                location={location}
              />
            );
          }}
        />
      </View>
      {status.every(item => item.status == 'completed') ? (
        <CustomButton
          title={'Complete'}
          style={{backgroundColor: Colors.buttonGreenBackground}}
          onPress={() =>
            dispatch(CompleteTask(navigation, riderId, taskId, setVisible))
          }
        />
      ) : null}
    </View>
  ) : (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.themeWhite,
      }}>
      <Text style={styles.titleText}>No Task</Text>
    </View>
  );
};

export default CurrentTask;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.themeWhite},
  titleText: {
    fontFamily: Font.Poppins600,
    color: Colors.themeRed,
    fontSize: 20,
    marginTop: 20,
    paddingLeft: 20,
  },
  inputField: {
    backgroundColor: Colors.textInputBackground,
    marginTop: 30,
    width: '90%',
    paddingLeft: 10,
  },
  button: {
    marginTop: 50,
  },
});
