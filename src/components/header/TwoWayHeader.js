import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Colors} from '../../constant/Colors';

const Signup = props => {
  return (
    <View style={[styles.headerContainer, props.style]}>
      <Text
        onPress={props.onPressLeft}
        style={
          props.first ? styles.selectedHeaderText : styles.unSelectedHeaderText
        }>
        {props.leftTitle}
      </Text>
      <Image
        style={styles.logo}
        source={require('../../assets/images/redhand.png')}
      />
      <Text
        onPress={props.onPressRight}
        style={
          props.first ? styles.unSelectedHeaderText : styles.selectedHeaderText
        }>
        {props.rightTitle}
      </Text>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: '12%',

    flexDirection: 'row',
    alignSelf: 'center',

    alignItems: 'center',
  },
  logo: {
    marginHorizontal: 20,
  },
  selectedHeaderText: {
    color: Colors.themeRed,
    fontSize: 20,
    borderBottomWidth: 1,
    fontFamily: 'Poppins-Bold',
    borderBottomColor: Colors.themeRed,
  },
  unSelectedHeaderText: {
    color: Colors.unselectedText,
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
  },
});
