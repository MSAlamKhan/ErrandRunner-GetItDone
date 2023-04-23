import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../../constant/Colors';
import {Font} from '../../constant/Font';

const NotificationCard = ({item}) => {
  console.log('NotiCard', item);

  return (
    <View style={styles.cardContainer}>
      <Text style={styles.title}>{item.item.title}</Text>
      <Text style={styles.subTitle}>{item.item.description} 1</Text>
      <Text style={styles.subTitle}>{item.item.created_at}</Text>
      {/* <Text style={styles.subTitle}>Time</Text> */}
    </View>
  );
};

export default NotificationCard;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: Colors.ContainerBg,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 10,
    borderRadius: 10,
  },
  title: {
    color: Colors.darkfont,
    fontFamily: Font.Poppins500,
    lineHeight: 21,
  },
  subTitle: {
    color: Colors.lightfont,
    fontFamily: Font.Poppins400,
    lineHeight: 14,
    fontSize: 12,
  },
});
