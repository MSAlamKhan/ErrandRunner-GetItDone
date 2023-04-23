import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';

import Lottie from 'lottie-react-native';


import { Font } from '../../constant/Font';
import { Colors } from '../../constant/Colors';

const ResponseModal = ({
  visible,
  onBackButtonPress,
  onBackdropPress,
  title,
  state
}) => {
  return (
    <Modal
      style={styles.modalContainer}
      visible={visible}
      onBackButtonPress={onBackButtonPress}
      onBackdropPress={onBackdropPress}>
      <View style={styles.taskCardContainer}>
        <Text style={styles.text}>{title}</Text>
        {state ? <Lottie
          style={{ width: 70, height: 70 }}
          source={require('../../assets/lootieFile/tick.json')}
          autoPlay
          loop
          speed={0.8}
        /> : <Lottie
          style={{ width: 70, height: 70 }}
          source={require('../../assets/lootieFile/Close.json')}
          autoPlay
          loop
          speed={0.8}
        />}

      </View>
    </Modal>
  );
};

export default ResponseModal;

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
    marginTop: 30,
    backgroundColor: Colors.themeWhite,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingVertical: 20,
    justifyContent: 'center',
    borderRadius: 20,
  },
  text: {
    // color: Colors.black,
    fontSize: 20,
    width: '65%',
    color:Colors.darkfont,
    fontFamily: Font.Poppins500,
  },
});
