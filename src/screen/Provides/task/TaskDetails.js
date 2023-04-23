import React from 'react';
import {useState} from 'react';
import {Button, ScrollView, StyleSheet, Text, View} from 'react-native';
import CustomButton from '../../../components/buttons/CustomButton';
import HeaderWithMidTitle from '../../../components/header/HeaderWithMidTitle';
import Input from '../../../components/inputs/Inputs';
import InputWithoutUseForm from '../../../components/inputs/InputWithoutUseForm';
import {Colors} from '../../../constant/Colors';
import {Font} from '../../../constant/Font';
import {scale} from 'react-native-size-matters-ch';
import {useDispatch, useSelector} from 'react-redux';
import {base_Url, token} from '../../../constant/BaseUrl';
import {
  MODAL_STATUS,
  SET_ADDITIONAL_COST,
} from '../../../redux/reducers/ProviderReducer';
import AddTaskModal from '../../../components/modals/AddTaskModal';
import {add, clockRunning} from 'react-native-reanimated';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import RNLocation from 'react-native-location';
import {useCallback} from 'react';
const TaskDetailsScreen = ({route}) => {
  const dispatch = useDispatch();

  const [modalVisible, setVisible] = useState(false);
  const modal_status = useSelector(state => state.provider.modal_status);
  const taskId = useSelector(state => state.provider.taskId);
  const riderId = useSelector(state => state.auth.user_details.user_id);
  const addCost = useSelector(state => state.provider.addCost);
  console.log('====================================');
  console.log('Additional COST  ==>', addCost);
  console.log('====================================');
  console.log('====================================');
  console.log('task details', route.params.details);
  console.log('====================================');
  console.log('====================================');
  console.log(`Request ID : ${taskId} , rider ID : ${riderId}`);
  console.log('====================================');
  const navigation = useNavigation();
  const {details, index, location} = route.params;
  console.log('====================================');
  console.log('Index =>>', details);
  console.log('====================================');
  const [additionalCost, setAdditionalCost] = useState('');
  const [showAddCost, setShowAddCost] = useState(false);
  // const [location, setLocation] = useState();

  // const getCurrentLocation = async () => {
  //   RNLocation.configure({
  //     distanceFilter: 100, // Meters
  //     desiredAccuracy: {
  //       ios: 'best',
  //       android: 'balancedPowerAccuracy',
  //     },
  //     // Android only
  //     androidProvider: 'auto',
  //     interval: 5000, // Milliseconds
  //     fastestInterval: 10000, // Milliseconds
  //     maxWaitTime: 5000, // Milliseconds
  //   });
  //   await RNLocation.getLatestLocation().then(latestLocation => {
  //     setLocation({
  //       lat: latestLocation.latitude,
  //       long: latestLocation.longitude,
  //     });
  //   });
  // };

  const requestAdditinalCost = async () => {
    try {
      let base_url = `${base_Url}/rider/request_additional_cost.php`;
      let formData = new FormData();
      formData.append('token', token);
      formData.append('item_id', details.task_details_id);
      formData.append('additional_cost', additionalCost);
      formData.append('rider_id', riderId);
      formData.append('task_id', taskId);
      const response = await fetch(base_url, {
        method: 'post',
        body: formData,
      });
      const responseData = await response.json();
      console.log('====================================');
      console.log('Response of additional cost : ', responseData);
      console.log('====================================');
      if (responseData.status == true) {
        setShowAddCost(true);
        setVisible(true);
        dispatch({
          type: MODAL_STATUS,
          payload: {
            status: responseData.status,
            message: responseData.message,
          },
        });
        setTimeout(() => {
          setVisible(false);
        }, 1000);
      } else {
        setVisible(true);
        dispatch({
          type: MODAL_STATUS,
          payload: {status: false, message: responseData.message},
        });
        setTimeout(() => {
          setVisible(false);
        }, 1000);
      }
    } catch (error) {
      console.log('====================================');
      console.log(`ERROR ${error}`);
      console.log('====================================');
    }
  };

  const completeTask = async () => {
    try {
      let base_url = `${base_Url}/rider/complete_task.php`;
      let formData = new FormData();
      formData.append('token', token);
      formData.append('item_id', details.task_details_id);
      formData.append('task_id', taskId);
      const response = await fetch(base_url, {
        method: 'post',
        body: formData,
      });
      const responseData = await response.json();
      console.log('====================================');
      console.log('Response of Complete Task : ', responseData);
      console.log('====================================');
      if (responseData.status == true) {
        setVisible(true);
        dispatch({
          type: MODAL_STATUS,
          payload: {
            status: responseData.status,
            message: responseData.message,
          },
        });
        setTimeout(() => {
          setVisible(false);
          navigation.goBack();
        }, 1000);
      } else {
        console.log('====================================');
        console.log('Task Incomplete!!');
        console.log('====================================');
      }
    } catch (error) {
      console.log('====================================');
      console.log(` ERROR in complete task ${error}`);
      console.log('====================================');
    }
  };

  // useFocusEffect(
  //   useCallback(() => {
  //     getCurrentLocation();
  //   }, []),
  // );
  return (
    <View style={styles.center}>
      <Text style={styles.headingText}> ITEM</Text>
      <Text style={styles.text}>{details.name}</Text>
      <Text style={styles.headingText}> Description</Text>
      <Text style={styles.text}>{details.description}</Text>
      <Text style={styles.headingText}> Estimated Cost</Text>
      <Text style={styles.text}>{`$ ${details.estimated_cost}`}</Text>
      <View
        style={{
          paddingTop: scale(20),
          borderBottomColor: 'black',
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
      />
      <View
        style={{
          padding: 10,
          justifyContent: 'space-evenly',
        }}>
        <Text style={styles.headingText}>Additional Charges</Text>
        {addCost[index] > 0 ? (
          <Text style={{fontFamily: Font.Poppins500, color: Colors.greyfont}}>
            ${addCost[index]}
          </Text>
        ) : (
          <InputWithoutUseForm
            placeholder={'$0.00'}
            placeholderTextColor={Colors.lightfont}
            keyboardType={'decimal-pad'}
            style={{
              backgroundColor: Colors.textInputBackground,
              borderRadius: 10,
              paddingLeft: 5,
            }}
            onChangeText={setAdditionalCost}
          />
        )}

        {additionalCost.length > 0 && !showAddCost ? (
          <View style={{marginTop: 15}}>
            <CustomButton
              title={'Request Additional Charges'}
              onPress={() => {
                requestAdditinalCost();
                dispatch({
                  type: SET_ADDITIONAL_COST,
                  payload: {additionalCost: additionalCost, index: index},
                });
              }}
            />
          </View>
        ) : null}
      </View>
      <View
        style={{
          paddingTop: scale(20),
          borderBottomColor: 'black',
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
      />
      <View style={{marginTop: 15}}>
        <CustomButton
          title={'Task Completed'}
          style={{backgroundColor: Colors.cardGreen}}
          onPress={() => completeTask()}
        />
      </View>
      <AddTaskModal message={modal_status.message} visible={modalVisible} />
      <View style={{flex: 1, marginTop: scale(5)}}>
        <Text style={styles.headingText}>Loaction</Text>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: parseFloat(details.pickup_latitude),
            longitude: parseFloat(details.pickup_longitude),
            latitudeDelta: 0.1122,
            longitudeDelta: 0.1122,
          }}>
          {/* Pick Up Location */}
          <Marker
            style={{height: 10, width: 10}}
            pinColor={Colors.cardLightPink}
            coordinate={{
              latitude: parseFloat(details.pickup_latitude),
              longitude: parseFloat(details.pickup_longitude),
            }}
            title={details.name}
            description={details.description}
          />
          {/* Rider Location*/}
          <Marker
            style={{height: 10, width: 10}}
            pinColor={Colors.cardLightPink}
            icon={require('../../../assets/images/rider.png')}
            coordinate={{
              latitude: location.lat,
              longitude: location.long,
            }}
            title={'Your Location'}
          />
        </MapView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    backgroundColor: Colors.themeWhite,
    flex: 1,
    paddingHorizontal: 20,
  },
  headingText: {
    fontFamily: Font.Poppins600,
    color: Colors.themeRed,
    fontSize: 20,
    marginTop: 20,
    paddingLeft: 10,
  },
  text: {
    color: Colors.lightfont,
    fontFamily: Font.Poppins400,
    lineHeight: 18,
    fontSize: 15,
    paddingLeft: 20,
  },
  map: {
    flex: 0.8,
  },
});
export default TaskDetailsScreen;
