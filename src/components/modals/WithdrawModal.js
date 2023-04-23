import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {Colors} from '../../constant/Colors';

import {Font} from '../../constant/Font';
import CustomButton from '../buttons/CustomButton';
import RequestTaskList from '../cards/RequestListCard';
import {BankCard} from '../cards/BankCard';
import {useSelector} from 'react-redux';
import Input from '../inputs/Inputs';
import {useForm} from 'react-hook-form';
import {useState} from 'react';
const WithdrawModal = props => {
  const bankData = useSelector(state => state.provider.get_bank_details);
  console.log('====================================');
  console.log('Bank Details in WithDraw Modal :', bankData);
  console.log('====================================');

  return (
    <Modal style={styles.modalContainer} visible={props.visible}>
      <BankCard
        data={bankData}
        onPressHandler={props.onCancel}
        balance={props.totalBalance}
      />
    </Modal>
  );
};

export default WithdrawModal;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'rgba(0,0,0,0.80)',
    flex: 1,
    marginHorizontal: 0,
    borderWidth: 0,
    justifyContent: 'center',
    margin: 0,
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
