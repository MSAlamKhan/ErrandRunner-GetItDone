import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
  AppState,
} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {Colors} from '../../constant/Colors';

import {Font} from '../../constant/Font';
import CustomButton from '../buttons/CustomButton';
import RequestTaskList from '../cards/RequestListCard';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useState} from 'react';
import {base_Url} from '../../constant/BaseUrl';
import {useFocusEffect} from '@react-navigation/native';
import {useCallback} from 'react';
import OneSignal from 'react-native-onesignal';
import {useRef} from 'react';
const MapModal = props => {
  const mapRef = React.createRef();
  const [locationState, setLocationState] = useState({});
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  const _handleAppStateChange = async nextAppState => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      console.log('====================================');
      console.log('Active');
      console.log('====================================');
      closeMap();

      // TODO SET USERS ONLINE STATUS TO TRUE
    } else {
      console.log('====================================');
      console.log('BackGround');
      console.log('====================================');
      closeMap();
    }

    appState.current = nextAppState;
    setAppStateVisible(appState.current);
    console.log('AppState', appState.current);
  };

  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, []);

  // in-app notification
  // var myHeaders = new Headers();
  // myHeaders.append('Accept', 'application/json');
  // myHeaders.append(
  //   'Authorization',
  //   'Basic MTg0OTVlYWYtYjY5Yi00YjY5LTliNGYtOTQxNTczOWIwMDJh',
  // );
  // myHeaders.append('content-type', 'application/json');

  // var raw = JSON.stringify({
  //   app_id: '115eddf7-e4bd-4ea9-b92c-177986f0f572',
  //   include_player_ids: ['efb9a3a5-47af-494f-a87b-246483fdc3cf'],
  //   data: {
  //     lat: '24.0137',
  //     lng: '67.16709',
  //   },
  //   contents: {
  //     en: 'User is tacking',
  //   },
  //   name: 'INTERNAL_CAMPAIGN_NAME',
  // });

  // var requestOptions = {
  //   method: 'POST',
  //   headers: myHeaders,
  //   body: raw,
  //   redirect: 'follow',
  // };

  // fetch('https://onesignal.com/api/v1/notifications', requestOptions)
  //   .then(response => response.text())
  //   .then(result => console.log(result))
  //   .catch(error => console.log('error', error));
  const closeMap = props.onClose;
  const userLoc = props.userLocation;
  OneSignal.setNotificationWillShowInForegroundHandler(
    notificationReceivedEvent => {
      let notification = notificationReceivedEvent.getNotification();
      OneSignal.add;
      const data = notification.additionalData;
      console.log(data);
      setLocationState(data);
      console.log('==========> rider Loactions', locationState);

      // notificationReceivedEvent.complete();
    },
  );

  const locateRider = () => {
    mapRef.current.animateToRegion(
      {
        latitude: locationState.lat,
        longitude: locationState.lng,
        latitudeDelta: 0.000122,
        longitudeDelta: 0.000121,
      },
      3000,
    );
  };

  return (
    <Modal style={styles.modalContainer} visible={props.visible}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: userLoc.latitude,
          longitude: userLoc.longitude,
          latitudeDelta: 0.000122,
          longitudeDelta: 0.000121,
        }}>
        <Marker
          style={{height: 10, width: 10}}
          pinColor={Colors.cardLightPink}
          icon={require('../../assets/images/rider.png')}
          coordinate={{
            latitude: locationState.lat
              ? locationState.lat
              : parseFloat(props.riderLocation.lat),
            longitude: locationState.lng
              ? locationState.lng
              : parseFloat(props.riderLocation.long),
          }}
          title={props.riderName}
          description={'Completing Tasks'}
        />
        <Marker
          style={{height: 10, width: 10}}
          pinColor={Colors.cardLightPink}
          // icon={require('../../assets/images/rider.png')}
          coordinate={{
            latitude: userLoc.latitude,
            longitude: userLoc.longitude,
          }}
          title={'Drop off'}
          description={'your location'}
        />
      </MapView>
      <View style={{marginTop: 10}}>
        <CustomButton title={'Locate Rider'} onPress={locateRider} />
      </View>
      <View style={{marginTop: 10}}>
        <CustomButton
          title={'Close Map'}
          onPress={() => {
            closeMap();
          }}
        />
      </View>
    </Modal>
  );
};

export default MapModal;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'rgba(0,0,0,0.80)',
    flex: 1,
    marginHorizontal: 0,
    borderWidth: 0,
    justifyContent: 'flex-start',
    margin: 0,
  },
  map: {
    flex: 0.98,
  },
  taskCardContainer: {
    marginTop: 40,
    backgroundColor: Colors.themeWhite,
    padding: 25,
    marginHorizontal: 30,
    // paddingVertical: 20,

    borderRadius: 20,
  },
  taskContainer: {
    // flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleText: {
    fontFamily: Font.Poppins600,
    color: Colors.themeRed,
    fontSize: 20,
  },
  categoryText: {
    fontFamily: Font.Poppins500,
    color: Colors.lightfont,
    fontSize: 16,
  },
  detailText: {
    fontFamily: Font.Poppins500,
    color: Colors.lightfont,
    fontSize: 17,
    lineHeight: 24,
  },
  locationText: {
    fontFamily: Font.Poppins500,
    color: Colors.lightfont,
    fontSize: 14,
    lineHeight: 18,
  },
  acceptButton: {
    backgroundColor: Colors.buttonGreenBackground,
    marginTop: 10,
    width: '100%',
  },
  rejectButton: {
    backgroundColor: Colors.themeRed,
    marginTop: 10,
    width: '100%',
  },
});
