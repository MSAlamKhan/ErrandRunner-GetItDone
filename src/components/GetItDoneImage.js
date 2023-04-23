import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

const GetItDoneImage = props => {
  return (
    <Image
      style={[styles.image, props.style]}
      source={require('../assets/images/getitdone.png')}></Image>
  );
};

const styles = StyleSheet.create({
  image: {
    height: '30%',
    aspectRatio: 1 / 1,
    // backgroundColor: 20,
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
export default GetItDoneImage;
