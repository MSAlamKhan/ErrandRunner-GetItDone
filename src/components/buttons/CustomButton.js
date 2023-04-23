import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Lottie from 'lottie-react-native';
import {Colors} from '../../constant/Colors';

const CustomButton = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      disabled={props.loading}
      style={[styles.buttonContainer, props.style,{opacity:props.loading?0.5:1}]}>
        {props.loading?<Lottie
          style={{width: 25, height: 25}}
          source={require('../../assets/lootieFile/buttonLoader.json')}
          autoPlay
          loop
          speed={1.5}
        />: <Text style={[styles.buttonText, props.textStyle]}>{props.title}</Text>}
     
      
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  buttonContainer: {
    width: '90%',
    backgroundColor: Colors.themeRed,
    alignItems: 'center',
    alignSelf: 'center',
    paddingVertical: 15,
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 14,
    color: Colors.themeWhite,
    fontFamily: 'Poppins-Medium',
    lineHeight: 22,
  },
});
