import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useCallback, useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {base_Url, token} from '../../../constant/BaseUrl';
import {Colors} from '../../../constant/Colors';
import {Font} from '../../../constant/Font';
import CustomButton from '../../../components/buttons/CustomButton';
import Input from '../../../components/inputs/Inputs';
import {useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import {addBankDetails} from '../../../redux/actions/ProviderAction';
import ResponseModal from '../../../components/modals/ResponseModal';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BANK_DETAILS} from '../../../redux/reducers/ProviderReducer';
const BankDetails = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const user_id = useSelector(state => state.auth.user_details.user_id);
  const _bankData = useSelector(state => state.provider.bank_details);
  const response_status = useSelector(state => state.auth.response_status);

  // const fetchBankDetails = async user_id => {
  //   try {
  //     let base_url = `${base_Url}/get_bank_details.php`;
  //     let formData = new FormData();
  //     formData.append('token', token);
  //     formData.append('user_id', user_id);
  //     const response = await fetch(base_url, {
  //       method: 'post',
  //       body: formData,
  //     });
  //     const responseData = await response.json();
  //     if (responseData.status == true) {
  //       console.log('RESPONSE DATa', responseData.data);
  //       setBankData(responseData.data);
  //     }
  //   } catch (error) {
  //     console.log('eeeeeERRRE', error);
  //   }
  // };

  // useFocusEffect(
  //   useCallback(() => {
  //     fetchBankDetails(user_id);
  //   }, []),
  // );

  // const getBankDetails = async () => {
  //   const bank = await AsyncStorage.getItem('bankDetails');
  //   if (bank) {
  //     const parsedBank = JSON.parse(bank);
  //     dispatch({type: BANK_DETAILS, payload: parsedBank});
  //   } else {
  //     console.log('noData');
  //   }
  // };

  // useEffect(() => {
  //   getBankDetails();
  // }, []);

  console.log('BANKKK use Selector', _bankData);

  const dispatch = useDispatch();
  console.log('USER ID in bank', user_id);
  const {
    control,
    handleSubmit,
    watch,
    formState: {errors, isValid},
  } = useForm({mode: 'all'});

  const onSubmit = data => {
    console.log('Bank Data', data);
    dispatch(addBankDetails(data, user_id, setModalVisible, navigation));
  };
  return (
    <View style={styles.container}>
      <ResponseModal
        title={response_status.message}
        visible={modalVisible}
        onBackButtonPress={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}
        state={response_status.status}
      />
      <Text style={styles.titleText}>Add Bank Details</Text>
      <Input
        control={control}
        style={styles.inputContainer}
        textStyle={styles.inputTextColor}
        name="bankname"
        defaultValue={_bankData ? _bankData.bank_name : ''}
        rules={{
          required: '*Bank Name is required',
        }}
        //   onSubmitEditing={handleSubmit(onSubmit)}

        placeholder="Bank Name"
        placeholderTextColor={'#32323266'}
      />

      {errors.bankname && (
        <Text style={styles.error}>{errors.bankname.message} </Text>
      )}
      <Input
        control={control}
        style={styles.inputContainer}
        textStyle={styles.inputTextColor}
        defaultValue={_bankData ? _bankData.iban_number : ''}
        name="iban"
        rules={{
          required: '* Iban Number is required',
        }}
        //   onSubmitEditing={handleSubmit(onSubmit)}

        placeholder="Iban Number"
        placeholderTextColor={'#32323266'}
      />

      {errors.iban && <Text style={styles.error}>{errors.iban.message} </Text>}
      <Input
        control={control}
        style={styles.inputContainer}
        textStyle={styles.inputTextColor}
        name="accountName"
        defaultValue={_bankData ? _bankData.account_holder_name : ''}
        rules={{
          required: '* Account Holder Name is required',
        }}
        //   onSubmitEditing={handleSubmit(onSubmit)}

        placeholder="Account holder name"
        placeholderTextColor={'#32323266'}
      />

      {errors.acount && (
        <Text style={styles.error}>{errors.acount.message} </Text>
      )}
      <CustomButton title="Save" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

export default BankDetails;

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
  inputTextColor: {
    color: Colors.inputText,
  },
  inputContainer: {
    backgroundColor: Colors.textInputBackground,
    paddingLeft: 10,
    width: '95%',
    borderRadius: 10,
    marginBottom: 10,
  },
  error: {
    color: 'red',
    fontSize: 12,
    alignSelf: 'flex-start',
    marginLeft: 25,
    marginTop: 5,
    fontFamily: 'Poppins-SemiBold',
  },
});
