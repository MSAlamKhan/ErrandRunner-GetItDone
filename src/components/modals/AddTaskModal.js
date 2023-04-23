import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {Colors} from '../../constant/Colors';
import Lottie from 'lottie-react-native';
import {Font} from '../../constant/Font';
const AddTaskModal = props => {
  return (
    <Modal style={styles.modalContainer} visible={props.visible}>
      <View style={styles.taskCardContainer}>
        <Text style={styles.text}>{props.message}</Text>
        <Lottie
          style={{width: 70, height: 70}}
          source={require('../../assets/lootieFile/tick.json')}
          autoPlay
          loop
          speed={0.8}
        />
      </View>
    </Modal>
  );
};

export default AddTaskModal;

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
    fontFamily: Font.Poppins600,
    color: Colors.themeRed,
    fontSize: 20,
    width: '65%',
  },
});
