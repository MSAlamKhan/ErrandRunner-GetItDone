import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import SquareIconButton from '../buttons/SquareIconButton';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../constant/Colors';

const HeaderWithMidIcon = props => {
  // console.log('1312', props);
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      <SquareIconButton
        back={true}
        style={{ borderRadius: 5, borderWidth: 1, borderColor: Colors.lightfont }}
        onPress={() => navigation.goBack()}
      />
      <Image source={require('../../assets/images/redhand.png')} />
      <SquareIconButton
        style={styles.notification}
        notification={true}
        onPress={() => navigation.navigate('noti')}
      // onPress={() => alert('lorem')}
      />
    </View>
  );
};

export default HeaderWithMidIcon;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    paddingVertical: 20,
    // backgroundColor: 'red',
    width: '95%',
  },
  notification: {
    borderWidth: 0,
  },
});