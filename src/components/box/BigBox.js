import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../../constant/Colors';

const BigCard = props => {
  const data = props.data;

  return (
    <View style={[styles.cardContainer, {backgroundColor: data.color}]}>
      <Text style={styles.nameText}>{data.name}</Text>
      <Text style={styles.numberText}>{data.number}</Text>
    </View>
  );
};

export default BigCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: '90%',
    alignSelf: 'center',
    aspectRatio: 2.6 / 1,
    marginBottom: 20,
    borderRadius: 20,
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  nameText: {
    fontFamily: 'Poppins-SemiBold',
    color: Colors.themeWhite,
    paddingLeft: 20,
    fontSize: 21,
  },
  numberText: {
    fontFamily: 'Poppins-SemiBold',
    color: Colors.themeWhite,
    paddingLeft: 20,
    textAlign: 'right',
    paddingRight: 25,
    fontSize: 25,
  },
});
