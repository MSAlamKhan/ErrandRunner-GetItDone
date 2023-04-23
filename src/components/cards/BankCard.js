import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {base_Url, token} from '../../constant/BaseUrl';
import {Colors} from '../../constant/Colors';
import {Font} from '../../constant/Font';
import {MODAL_STATUS} from '../../redux/reducers/ProviderReducer';
import CustomButton from '../buttons/CustomButton';
import Input from '../inputs/Inputs';
import InputWithoutUseForm from '../inputs/InputWithoutUseForm';
import AddTaskModal from '../modals/AddTaskModal';

export const BankCard = props => {
  console.log('====================================');
  console.log('Data in bank card Button : ', props.data);
  console.log('====================================');
  const userId = useSelector(state => state.auth.user_details.user_id);
  const modal_status = useSelector(state => state.provider.modal_status);
  console.log('====================================');
  console.log('modal Status', modal_status);
  console.log('====================================');
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const makeWithDrawRequest = async () => {
    try {
      let base_url = `${base_Url}/rider/withdraw_request.php`;
      let formData = new FormData();
      formData.append('token', token);
      formData.append('rider_id', userId);
      formData.append('amount', withdrawAmount);
      const response = await fetch(base_url, {
        method: 'post',
        body: formData,
      });
      const responseData = await response.json();
      if (responseData.status == true) {
        console.log('====================================');
        console.log('response in make request api : ', responseData);
        console.log('====================================');
        setVisible(true);
        await dispatch({
          type: MODAL_STATUS,
          payload: {
            status: responseData.status,
            message: responseData.Message,
          },
        });
        setTimeout(async () => {
          setVisible(false);
          props.onPressHandler(false);
        }, 1500);
        console.log('RESPONSE DATA of withdraw Request', responseData);
      }
    } catch (error) {
      console.log('eeeeeERRRE', error);
    }
  };

  return (
    <View style={styles.cardContainer}>
      <AddTaskModal message={modal_status.message} visible={visible} />
      {props.data.length > 0 ? (
        <View>
          <InputWithoutUseForm
            placeholder={'$0.00'}
            placeholderTextColor={Colors.lightfont}
            keyboardType={'decimal-pad'}
            style={{
              backgroundColor: Colors.cardLightPink,
              borderRadius: 10,
              paddingLeft: 5,
            }}
            onChangeText={setWithdrawAmount}
          />
          {withdrawAmount == 0 && props.balance > withdrawAmount ? (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                padding: 5,
              }}>
              <Text style={styles.warningText}>
                Please enter amount to withdraw
              </Text>
            </View>
          ) : null}
          {props.balance > withdrawAmount ? (
            <View>
              <Text style={styles.titleText}>WithDraw amount to</Text>
              <FlatList
                data={props.data}
                renderItem={item => {
                  return (
                    <View style={{margin: 10}}>
                      <CustomButton
                        title={item.item.bank_name}
                        style={{backgroundColor: Colors.buttonPurpleBackground}}
                        onPress={() => {
                          if (withdrawAmount > 0) {
                            makeWithDrawRequest();
                          } else {
                            alert('Please add sufficient amount to withdraw.');
                          }
                        }}
                      />
                    </View>
                  );
                }}
              />
            </View>
          ) : (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                padding: 5,
              }}>
              <Text style={styles.warningText}>
                you don't have enough balance
              </Text>
            </View>
          )}
          <CustomButton
            title={'Cancel'}
            onPress={() => props.onPressHandler(false)}
          />
        </View>
      ) : (
        <View style={styles.cardContainer}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 10,
            }}>
            <Text style={styles.warningText}> Please Add a bank first</Text>
            <CustomButton
              title={'Ok'}
              onPress={() => props.onPressHandler(false)}
            />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: Colors.ContainerBg,
    marginHorizontal: 20,
    marginVertical: 7,
    padding: 10,
    borderRadius: 20,
  },
  titleText: {
    fontFamily: Font.Poppins600,
    color: Colors.themeRed,
    fontSize: 20,
    textAlign: 'center',
    margin: 5,
  },
  warningText: {
    fontFamily: Font.Poppins400,
    color: Colors.themeRed,
    paddingBottom: 10,
  },
});
