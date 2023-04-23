import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../../constant/Colors';
import {Font} from '../../constant/Font';
import SquareIconButton from '../buttons/SquareIconButton';

const TransactionCard = ({item, showStatus}) => {
  console.log('SINGLE ITEM', item);
  return (
    <View style={styles.cardContainer}>
      <SquareIconButton style={styles.iconContainer} dollar={true} />
      <View style={styles.rightSideContainer}>
        <View>
          <Text style={styles.taskText}>{item?.type}</Text>
          <Text style={styles.dateText}>{item?.created.substring(0, 11)}</Text>
          {showStatus && (
            <Text style={styles.dateText}>Status : Requested</Text>
          )}
        </View>
        <Text style={styles.priceText}>
          {item?.type === 'credit' ? '+' : '-'}${item?.amount}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: Colors.cardLightPink,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    paddingVertical: 20,
    paddingRight: 30,
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 16,
  },

  iconContainer: {
    backgroundColor: Colors.lightblueiconBackground,
    borderRadius: 100,
    padding: 10,
    borderWidth: 0,
    aspectRatio: 1 / 1,
  },
  rightSideContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center',
    width: '80%',
  },
  taskText: {
    fontFamily: Font.Poppins600,
    color: Colors.greyfont,
    fontSize: 16,
    lineHeight: 17,
  },
  dateText: {
    fontFamily: Font.Poppins400,
    color: Colors.greyfont,
    fontSize: 14,
    lineHeight: 15,
  },
  priceText: {
    fontFamily: Font.Poppins600,
    color: Colors.greyfont,
    fontSize: 16,
    lineHeight: 22,
  },
});
export default TransactionCard;
