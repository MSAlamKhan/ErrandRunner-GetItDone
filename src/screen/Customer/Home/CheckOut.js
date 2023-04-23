import {StyleSheet, Text, View, FlatList} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../../constant/Colors';
import CheckoutProductCard from '../../../components/cards/CheckoutProductCard';
import DropOffLocationCard from '../../../components/cards/DropOffLocationCard';
import {Font} from '../../../constant/Font';
import CustomButton from '../../../components/buttons/CustomButton';
import AddTaskModal from '../../../components/modals/AddTaskModal';
import Modal from 'react-native-modal';
import {useDispatch, useSelector} from 'react-redux';
import {proceed_Order} from '../../../redux/actions/CustomerAction';
import {token, base_Url} from '../../../constant/BaseUrl';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useCallback} from 'react';
import {
  IS_CUSTOMER_LOADING,
  MODAL_STATUS,
} from '../../../redux/reducers/CustomerReducer';
import ResponseModal from '../../../components/modals/ResponseModal';

const CheckOut = ({navigation, route}) => {
  const [bal, setBal] = useState(0);

  const loading = useSelector(state => state.customer.is_loading);
  const user_id = useSelector(state => state.auth.user_details.user_id);
  const modal_status = useSelector(state => state.customer.modal_status);
  const [modalVisible, setVisible] = useState(false);
  const dispatch = useDispatch();
  console.log('zzzzzzzzzzzzzzzzzzzzzzz', modal_status);
  const {inputs, dropOffLoc, deliveryCharges, dropCordinates} = route.params;

  console.log('Agyaaa dataaaaaaaa', inputs);
  console.log('USER IDD', user_id);

  const mergePrice = inputs.map(item => parseFloat(item.estimated_cost));

  const sumWithInitial = mergePrice.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    0,
  );

  // console.log('sumWithInitial', sumWithInitial);

  const fetchWalletData = async (user_id, setVisible) => {
    try {
      let base_url = `${base_Url}/checkWalletBalance.php`;
      let formData = new FormData();
      formData.append('token', token);
      formData.append('user_id', user_id);
      const response = await fetch(base_url, {
        method: 'post',
        body: formData,
      });
      const responseData = await response.json();
      if (responseData.status == true) {
        console.log('RESPONSE DATa', responseData);
        setBal(Number(responseData.current_balance));
      }
    } catch (error) {
      console.log('eeeeeERRRE', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchWalletData(user_id, setVisible);
    }, []),
  );

  console.log('BALENCDAFDSF', bal);
  console.log('sumWithInitial in fetch', sumWithInitial);
  // console.log('sumWithInitial in fetch', sumWithInitial);

  const showmodal = () => {
    if (bal >= sumWithInitial) {
      dispatch(
        proceed_Order(
          inputs,
          user_id,
          dropOffLoc,
          dropCordinates,
          setVisible,
          navigation,
        ),
      );
    } else {
      dispatch({
        type: MODAL_STATUS,
        payload: {status: false, message: 'Please Add more amount'},
      });
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
        navigation.navigate('wallet');
      }, 1500);
    }
  };

  return (
    <View style={styles.container}>
      <AddTaskModal message={modal_status.message} visible={modalVisible} />

      <Text style={styles.orderDetailsText}>Detail Order</Text>
      <View style={styles.flatListContainer}>
        <FlatList
          style={{flexGrow: 0}}
          data={inputs}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <CheckoutProductCard
                title={item.title}
                name={item.name}
                description={item.description}
                estimated_cost={item.estimated_cost}
                EstAmmount={item.estimated_cost}
              />
            );
          }}
        />
      </View>
      <Text style={styles.orderDetailsText}>Drop Off Location</Text>
      <DropOffLocationCard data={dropOffLoc} />

      <View style={styles.subtotalContainer}>
        <Text style={styles.subTotalText}>Subtotal</Text>
        <Text style={styles.subTotalText}>${sumWithInitial}</Text>
      </View>
      <View style={styles.subtotalContainer}>
        <Text style={styles.subTotalText}>Fee & Delivery</Text>
        <Text style={styles.subTotalText}>${deliveryCharges}</Text>
      </View>
      <View style={styles.line}></View>
      <View style={styles.totalContainer}>
        <Text style={styles.TotalText}>Total</Text>
        <Text style={styles.TotalText}>
          ${parseFloat(sumWithInitial) + parseFloat(deliveryCharges)}
        </Text>
      </View>

      <CustomButton
        loading={loading}
        onPress={showmodal}
        style={styles.button}
        title="Add"
      />
    </View>
  );
};

export default CheckOut;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.themeWhite,
  },
  orderDetailsText: {
    fontFamily: 'Poppins-SemiBold',
    color: Colors.darkfont,
    paddingLeft: 13,
    marginTop: 20,
    fontSize: 16,
  },
  flatListContainer: {
    height: 230,
  },
  subtotalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  line: {
    height: 2,
    backgroundColor: '#C4C4C4',
    marginHorizontal: 20,
    marginBottom: 3,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  subTotalText: {
    fontFamily: Font.Poppins400,
    color: Colors.lightfont,
    fontSize: 16,
  },
  TotalText: {
    fontFamily: Font.Poppins700,
    color: Colors.darkfont,
    fontSize: 18,
  },
  button: {
    marginTop: 25,
  },
});
