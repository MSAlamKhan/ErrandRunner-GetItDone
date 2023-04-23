import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Alert,
  Button,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {Colors} from '../../../constant/Colors';
import {Font} from '../../../constant/Font';
import SmallBoxWithIcon from '../../../components/box/SmallBoxWithIcon';
import HeaderWithMidTitle from '../../../components/header/HeaderWithMidTitle';
import {scale, verticalScale} from 'react-native-size-matters';
import CustomButton from '../../../components/buttons/CustomButton';
import MapModal from '../../../components/modals/MapModal';
import {base_Url, token} from '../../../constant/BaseUrl';
import {useSelector} from 'react-redux';

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

export default function OrderTracking({route}) {
  const [modalView, setModalView] = useState(false);
  const [data, setData] = useState(route.params.data);
  const [isVisible, setIsVisible] = useState(false);
  const riderName = data[0].name;
  const user_id = useSelector(state => state.auth.user_details.user_id);
  const user_location = useSelector(state => state.customer.user_loc);
  console.log('====================================');
  console.log(user_location);
  console.log('Tracking Params : ', user_id);
  console.log('====================================');
  const riderLocation = route.params.riderLocation;
  const riderTracking = async status => {
    let base_url = `${base_Url}/track_rider.php`;
    let formData = new FormData();
    formData.append('token', token);
    formData.append('user_id', user_id);
    formData.append('rider_id', route.params.riderID);
    formData.append('status', status);
    const response = await fetch(base_url, {
      method: 'post',
      body: formData,
    });
    const responseData = await response.json();
    console.log('response data ', responseData);
    // alert(JSON.stringify(responseData));
    if (responseData.status == true) {
      console.log('Tracking started');
    } else {
      console.log('no tracking');
    }
  };

  return (
    <SafeAreaView style={styles.MainContainer}>
      <HeaderWithMidTitle>Order Track</HeaderWithMidTitle>
      <FlatList
        // style={{height: scale(50)}
        data={data}
        keyExtractor={item => item.id}
        renderItem={item => (
          <View style={styles.BtnContainer}>
            <SmallBoxWithIcon icon={item.item.title} />
            <View
              style={{
                flex: 2,
                paddingHorizontal: 10,
                justifyContent: 'space-between',
              }}>
              <Text style={styles.Text1}>{item.item.name}</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.Text2}>{item.item.task_detail_status}</Text>
            </View>
          </View>
        )}
      />
      <CustomButton
        title={'Show on map'}
        onPress={() => {
          riderTracking('yes');
          setModalView(true);
        }}
      />
      <MapModal
        visible={modalView}
        userLocation={user_location}
        riderLocation={riderLocation}
        onClose={() => {
          riderTracking('no');
          setModalView(false);
        }}
        riderName={route.params.riderName}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    paddingHorizontal: scale(20),
    backgroundColor: Colors.themeWhite,
    paddingBottom: scale(10),
  },

  BtnContainer: {
    height: verticalScale(70),
    backgroundColor: 'white',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(10),
    marginVertical: verticalScale(15),
  },
  Text1: {
    fontFamily: Font.Poppins600,
    color: Colors.themeRed,
    fontSize: scale(20),
    marginTop: 20,
    paddingLeft: 10,
  },
  Text2: {
    fontFamily: Font.Poppins400,
    color: '#000000',
    fontSize: scale(11),
    marginTop: 20,
    paddingLeft: 10,
  },
});
