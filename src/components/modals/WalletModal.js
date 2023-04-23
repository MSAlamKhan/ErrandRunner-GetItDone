import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {Colors} from '../../constant/Colors';
import {Font} from '../../constant/Font';
import SearchInput from '../inputs/SearchInput';
import Input from '../inputs/Inputs';
import {useForm} from 'react-hook-form';
import CustomButton from '../buttons/CustomButton';
import SquareIconButton from '../buttons/SquareIconButton';

const WalletModal = props => {
  const {navigation} = props;
  //   console.log('Navigation', props);
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: {errors, isValid},
  } = useForm({
    mode: 'all',
    defaultValues: {
      // firstName:SocialDetails.firstName,
      // lastName:SocialDetails.lastName,
      // email:SocialDetails.email
    },
  });

  const onSubmit = data => {
    console.log('Amount DAta', data.depositAmount);

    console.log('Amount DAta', parseFloat(data.depositAmount));
    let depositAmount = parseFloat(data.depositAmount);
    console.log('hahahahaha', typeof depositAmount);
    navigation.navigate('stripe', {depositAmount});
  };

  return (
    <Modal style={styles.modalContainer} visible={props.visible}>
      <View style={styles.taskCardContainer}>
        {/* <Text style={styles.text}>{props.message}</Text> */}
        <SquareIconButton
          back={true}
          style={styles.iconButton}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.text}>Enter the amount to deposit</Text>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              position: 'absolute',
              marginTop: 15,
              marginLeft: 8,
              fontSize: 18,
              fontFamily: Font.Poppins300,
            }}>
            $
          </Text>
          <Input
            name="depositAmount"
            keyboardType="numeric"
            placeholderTextColor={Colors.placeholderText}
            control={control}
            style={styles.inputField}
            textStyle={[styles.inputTextStyle, {marginTop: 5}]}
            rules={{
              required: 'Enter the amount',
            }}
            placeholder="Enter the amount"
          />
        </View>
        <CustomButton
          title="Add amount"
          onPress={handleSubmit(onSubmit)}
          // onPress={() => navigation.navigate('stripe')}
        />
      </View>
    </Modal>
  );
};

export default WalletModal;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'rgba(0,0,0,0.80)',
    flex: 1,
    marginHorizontal: 0,
    borderWidth: 0,
    justifyContent: 'flex-start',
    margin: 0,
  },
  taskCardContainer: {
    marginTop: 50,
    backgroundColor: Colors.themeWhite,
    // flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingVertical: 20,
    justifyContent: 'center',
    borderRadius: 20,
  },
  iconButton: {
    alignSelf: 'flex-start',
    marginTop: 20,
    marginLeft: 10,
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  text: {
    alignItems: 'center',
    fontFamily: Font.Poppins600,
    color: Colors.themeRed,
    fontSize: 20,
  },
  inputTextStyle: {
    paddingHorizontal: 20,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    marginBottom: -7,
    color: Colors.inputText,
  },
});
