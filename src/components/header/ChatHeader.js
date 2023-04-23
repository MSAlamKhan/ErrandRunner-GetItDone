import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import SquareIconButton from '../buttons/SquareIconButton';
import {Font} from '../../constant/Font';
import {Colors} from '../../constant/Colors';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
const ChatHeader = props => {
  const navigation = useNavigation();
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButtonContainer}>
        <Ionicons name="arrow-back" color={Colors.themeRed} size={30} />
      </TouchableOpacity>
      <View style={styles.midContainer}>
        <Text style={styles.title}>{props.name}</Text>
      </View>
    </View>
  );
};

export default ChatHeader;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginVertical: 20,
  },
  midContainer: {
    paddingVertical: 5,

    width: '100%',
    alignItems: 'center',
  },
  backButtonContainer: {
    position: 'absolute',
    left: 20,
  },
  title: {
    fontFamily: Font.Poppins500,
    color: Colors.darkfont,
    lineHeight: 18,
  },
  subTitle: {
    fontFamily: Font.Poppins500,
    color: Colors.lightfont,
    lineHeight: 18,
  },
});
