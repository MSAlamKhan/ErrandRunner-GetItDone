import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Font} from '../../constant/Font';
import {Colors} from '../../constant/Colors';

const DropOffLocationCard = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.data}</Text>
    </View>
  );
};

export default DropOffLocationCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.ContainerBg,
    paddingHorizontal: 30,
    marginBottom: 20,
    marginHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 20,
  },
  text: {
    fontFamily: Font.Poppins400,
    color: Colors.lightfont,
    width: '70%',
    fontSize: 15,
  },
});
