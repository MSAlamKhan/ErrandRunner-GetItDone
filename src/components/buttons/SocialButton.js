import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';

import {Colors} from '../../constant/Colors';

const SocialButton = props => {
  return (
    <TouchableOpacity onPress={props.onPress} style={[styles.buttonContainer, props.styles]}>
      {props.facebook ? (
        <Entypo
          style={styles.logo}
          name="facebook"
          size={30}
          color={Colors.themeWhite}
        />
      ) : (
        <Image
          style={styles.logo}
          source={require('../../assets/images/google.png')}
        />
      )}

      <Text style={[styles.buttonText, props.textStyle]}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default SocialButton;

const styles = StyleSheet.create({
  buttonContainer: {
    width: '90%',
    backgroundColor: Colors.socialButtonBackground,

    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 20,
    alignSelf: 'center',
    paddingVertical: 13,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.inputUnderline,
    justifyContent: 'center',
  },
  buttonText: {
    paddingLeft: 10,
    fontSize: 14,
    color: Colors.themeWhite,
    marginTop: 5,
    fontFamily: 'Poppins-SemiBold',
  },
  logo: {
    width: 30,
    height: 30,
    position: 'absolute',
    left: 20,
  },
});
