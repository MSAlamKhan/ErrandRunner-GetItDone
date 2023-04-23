import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Button,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Dimensions,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {Colors} from '../constant/Colors';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {Font} from '../constant/Font';
import SquareIconButton from './buttons/SquareIconButton';
import GooglePlacesInput from './GooglePlaces';
import CustomButton from './buttons/CustomButton';
import {useForm} from 'react-hook-form';
// import {dropLoc} from '../redux/actions/CustomerAction';
import {useDispatch} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

import RNLocation from 'react-native-location';

const DropOffMap = ({route, navigation}) => {
  const dispatch = useDispatch();
  const {setDropOffLoc, setDropCordinates} = route.params;
  console.log('setDropOffLoc', setDropOffLoc);
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    // latitudeDelta: 0.015,
    // longitudeDelta: 0.0121,
  });
  const [marker, setMarker] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    // latitudeDelta: 0.015,
    // longitudeDelta: 0.0121,
  });
  // https://us1.locationiq.com/v1/reverse?key=pk.bd733b0aaf436f3ad0ef530a41ab5ee3&lat=%2724.904996%27&lon=%2767.0784493%27&format=json
  const [currentLongitude, setCurrentLongitude] = useState('...');

  const [currentLatitude, setCurrentLatitude] = useState('...');

  const [search, setSearch] = useState(null);

  //   let onRegionChange = region => {
  //     setRegion({
  //       region,
  //     });
  //   };

  // let onRegionChange = region => {
  //   setRegion(region);
  // };

  const onPress = (data, details) => {
    console.log('Map details ===<>', details.geometry.location);
    console.log('Map details ===<>', details);
    console.log('data Detailsss ===<>', data.structured_formatting.main_text);
    console.log(
      'data Detailsss ===<>',
      data.structured_formatting.secondary_text,
    );

    setSearch(
      data.structured_formatting.main_text +
        ' ' +
        (data.structured_formatting.secondary_text
          ? data.structured_formatting.secondary_text
          : ''),
    );

    console.log('search', search);

    setRegion({
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
    });
    setMarker({
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
    });
  };

  console.log('search', search);

  const permission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('permission given');
        GetLocationNew();
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const GetLocationNew = () => {
    RNLocation.getLatestLocation().then(latestLocation => {
      console.log('ZZZAAAASSSHHAAA : ' + latestLocation);

      setCurrentLongitude(latestLocation.longitude);
      setCurrentLatitude(latestLocation.latitude);

      // alert(latestLocation.longitude + ',' + latestLocation.latitude);
      setRegion({
        latitude: latestLocation.latitude,
        longitude: latestLocation.longitude,
        // latitudeDelta: 0.015,
        // longitudeDelta: 0.0121,
      });
      setMarker({
        latitude: latestLocation.latitude,
        longitude: latestLocation.longitude,
        // latitudeDelta: 0.015,
        // longitudeDelta: 0.0121,
      });
      // setTimeout(() => {
      //     console.log("test", userDetails)
      //     Active()
      // }, 10000);
    });
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
  };

  useEffect(() => {
    permission();
  }, []);

  return (
    <View
      style={{
        flex: 1,
      }}>
      <View style={{padding: 10}}>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" color={Colors.themeRed} size={30} />
        </TouchableOpacity>
        <GooglePlacesInput
          placeholder="Search here..."
          style={styles.textInput}
          textInputProps={styles.InputTextStyle}
          GooglePlacesDetailsQuery={{fields: 'geometry'}}
          onPress={onPress}
          onChangeText={text => setSearch({term: text})}
          // textInputProps={{
          //   value: search,
          //   placeholderTextColor: 'grey',
          //   onChangeText: text => setSearch(text),
          //   fontFamily: Font.Lato400,
          //   paddingHorizontal: 10,
          // }}
          // control={control}
        />
      </View>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={{
          latitude: region.latitude,
          longitude: region.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        // onRegionChangeComplete={onRegionChange}
      >
        <Marker
          coordinate={{latitude: marker.latitude, longitude: marker.longitude}}
        />
      </MapView>
      {/* <Button
      title="OPEN BOTTOM SHEET"
      onPress={() => refRBSheet.current.open()}
    /> */}
      <SafeAreaView style={styles.footer}>
        <CustomButton
          title="Continue"
          // loading="true"
          style={{
            width: '70%',
          }}
          onPress={() => {
            // dispatch(dropLoc(search));
            setDropOffLoc(search);
            setDropCordinates(marker);
            navigation.goBack();
          }}
        />
      </SafeAreaView>
    </View>
  );
};

export default DropOffMap;

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: Colors.themeWhite,
    position: 'absolute',
    elevation: 1,
    zIndex: 1,
    padding: 5,
    top: 10,
    left: 10,
  },

  map: {
    flex: 1,
  },
  driverNearByStyle: {
    color: Colors.themeRed,
    fontSize: 15,
    fontFamily: Font.Poppins400,
    paddingLeft: 20,
  },
  footer: {
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',

    bottom: 30,
    position: 'absolute',
    width: '100%',
  },
  textInput: {
    width: '63%',
    marginLeft: 70,
    color: Colors.greyfont,
  },
  InputTextStyle: {
    fontFamily: Font.Poppins300,
    maxWidth: '80%',
    color: Colors.greyfont,
  },
});
