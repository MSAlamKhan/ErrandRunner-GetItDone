import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../../constant/Colors';
import {token, base_Url} from '../../../constant/BaseUrl';

import ScreenHeader from '../../../components/header/ScreenHeader';
import BigCard from '../../../components/box/BigBox';
import NotificationModal from '../../../components/modals/NotificationModal';
import DataAnalyticsPicker from '../../../components/dropDown/DataAnalyticsPicker';
import OneSignal from 'react-native-onesignal';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import RNLocation from 'react-native-location';
import {
  MY_INTERVAL,
  SET_LOCATION,
} from '../../../redux/reducers/ProviderReducer';
import {useCallback} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Statistic = () => {
  const navigation = useNavigation();
  const [modalVisible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const [requestData, setRequestData] = useState([]);
  const riderId = useSelector(state => state.auth.user_details.user_id);
  const [data, setData] = useState([]);

  const [items, setItems] = useState([
    {label: 'All time', value: 'All time'},
    {label: 'Past 7 days', value: '7'},
    {label: 'Past 30 days', value: '30'},
  ]);
  const [value, setValue] = useState(null);
  //===============================================================================================================================
  const interval = useSelector(state => state.provider.my_interval);
  const [location, setLocation] = useState();

  const getCurrentLocation = async () => {
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
    RNLocation.getLatestLocation().then(async latestLocation => {
      await setLocation({
        lat: latestLocation.latitude,
        long: latestLocation.longitude,
      });
      console.log('====================================');
      console.log('location in Current task ==>', location);
      console.log('====================================');
    });
  };
  let xIntervalId;
  setTimeout(() => {
    console.log('====================================');
    console.log(location);
    console.log('====================================');
  }, 1000);

  const isTracking = async () => {
    try {
      let base_url = `${base_Url}/rider/check_tracking_status.php`;
      let formData = new FormData();
      formData.append('token', token);
      formData.append('rider_id', riderId);

      const response = await fetch(base_url, {
        method: 'post',
        body: formData,
      });
      const responseData = await response.json();

      if (responseData.status == true) {
        if (responseData.tracking_status == 'yes') {
          xIntervalId = createInterval();
          dispatch({type: MY_INTERVAL, payload: xIntervalId});
        } else {
          console.log('====================================');
          console.log(false);
          console.log('====================================');
          stopCounter(interval);
        }
      } else {
        console.log('statue not true');
      }
    } catch (error) {
      console.log('====================================');
      console.log('ERROR IN IS TACKING :', error);
      console.log('====================================');
    }
  };
  function createInterval() {
    return setInterval(function () {
      RNLocation.getLatestLocation().then(latestLocation => {
        sendLatLng(latestLocation.latitude, latestLocation.longitude);
      });
    }, 50005);
  }
  async function sendLatLng(latitude, longitude) {
    const customer_token = await AsyncStorage.getItem('customer_token');
    var myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    myHeaders.append(
      'Authorization',
      'Basic MTg0OTVlYWYtYjY5Yi00YjY5LTliNGYtOTQxNTczOWIwMDJh',
    );
    myHeaders.append('content-type', 'application/json');
    var raw = JSON.stringify({
      app_id: '115eddf7-e4bd-4ea9-b92c-177986f0f572',
      include_player_ids: [customer_token],
      android_sound: 'nil',
      ios_sound: 'nil',
      android_channel_id: '88e0b376-0f64-48b0-ba99-85a3f766eaf5',
      data: {
        lat: latitude,
        lng: longitude,
      },
      contents: {
        en: 'Getting riders location',
      },
      name: 'INTERNAL_CAMPAIGN_NAME',
    });
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    fetch('https://onesignal.com/api/v1/notifications', requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  function stopCounter(id) {
    clearInterval(id);
    dispatch({type: MY_INTERVAL, payload: null});
  }
  // //===============================================================================================================================
  const permission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('====================================');
        console.log('yes permission');
        console.log('====================================');
        // Active();
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const getTask = async () => {
    try {
      let base_url = `${base_Url}/rider/get_task.php`;
      let formData = new FormData();
      formData.append('token', token);
      formData.append('user_id', riderId);
      const response = await fetch(base_url, {
        method: 'post',
        body: formData,
      });
      const responseData = await response.json();
      console.log('====================================');
      console.log('resp Data :', responseData.data);
      console.log('====================================');
      if (responseData.status == true) {
        if (responseData.data.length > 0) {
          console.log('====================================');
          console.log(` response data of get task api :${responseData}`);
          console.log('====================================');
          setRequestData(responseData.data);
          setVisible(true);
        }
      } else {
        setRequestData([]);
        setVisible(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Job / Request notification Modal
  OneSignal.setNotificationWillShowInForegroundHandler(
    notificationReceivedEvent => {
      let notification = notificationReceivedEvent.getNotification();
      OneSignal.add;
      const data = notification.additionalData;
      console.log('data in notification', data);
      if (data.user_noti) {
        let notification_user = data;
        AsyncStorage.setItem('customer_token', notification_user.user_noti);
        isTracking();
        console.log('start', notification_user.user_noti);
      } else {
        getTask();
        console.log('====================================');
        console.log('TASK arrived');
        console.log('====================================');
      }
      notificationReceivedEvent.complete(notification);
    },
  );

  const get_analytics = async value => {
    console.log('VALUE ======> ', value);

    try {
      let base_url = `${base_Url}/rider/rider_analytics.php`;
      let formData = new FormData();
      formData.append('token', token);
      formData.append('rider_id', riderId);
      formData.append('mod_date', value != null ? value : 'All time');

      const response = await fetch(base_url, {
        method: 'post',
        body: formData,
      });
      const responseData = await response.json();
      //
      console.log('Laraib : ', responseData.data);
      setData([
        {
          id: 1,
          name: 'Total requests accepted',
          color: Colors.cardPink,
          number: responseData.data[0].total_requests,
        },
        {
          id: 2,
          name: 'Total Revenue generated',
          color: Colors.cardPurple,
          number: `$${responseData.data[0].total_revenue}`,
        },
        {
          id: 3,
          name: 'Total earned amount',
          color: Colors.cardGreen,
          number: `$${responseData.data[0].total_earned}`,
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getTask();
      permission();
      isTracking();
      get_analytics('All time');
      getCurrentLocation();
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
    }, []),
  );

  return (
    <View style={styles.container}>
      <ScreenHeader />
      <NotificationModal
        visible={modalVisible}
        data={requestData}
        visiblityHandler={setVisible}
        location={location}
        setData={setRequestData}
      />
      <View style={styles.youDashboardContainer}>
        <Text style={styles.dashBoardText}>Your Dashboard</Text>
        {/* <TouchableOpacity style={styles.dropDownButton}>
          <Text style={styles.dropDownButtonText}>All Data</Text>
          <Ionicons name="chevron-down" color={Colors.themeRed} size={25} />
        </TouchableOpacity> */}
        <DataAnalyticsPicker
          items={items}
          setItems={setItems}
          value={value}
          setValue={setValue}
          onChange={() => {
            get_analytics(value);
          }}
        />
      </View>

      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return <BigCard data={item} />;
        }}
      />
    </View>
  );
};

export default Statistic;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.themeWhite,
    flex: 1,
  },
  youDashboardContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  dashBoardText: {
    color: Colors.themeRed,
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
  },
  dropDownButton: {
    flex: 0.6,
    borderColor: '#D3D3D3',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropDownButtonText: {
    color: Colors.themeRed,
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
  },
});
