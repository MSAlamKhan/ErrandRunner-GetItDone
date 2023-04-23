import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../constant/Colors';
import FontAwesome from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {useNavigation} from '@react-navigation/native';

const SquareIconButton = props => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={[styles.backButtonContainer, props.style]}>
        {props.question ? (
          <FontAwesome name="question" color={Colors.themeRed} size={30} />
        ) : null}
        {props.back ? (
          <Ionicons name="arrow-back" color={Colors.themeRed} size={30} />
        ) : null}
        {props.message ? (
          <MaterialIcons name="message" color={Colors.themeRed} size={25} />
        ) : null}
        {props.notification ? (
          <Ionicons name="notifications" color={Colors.themeRed} size={30} />
        ) : null}
        {props.track ? (
          <View style={styles.innerContainer}>
            <MaterialCommunityIcons
              name="go-kart-track"
              size={25}
              color={Colors.themeRed}
            />
          </View>
        ) : null}
        {props.wallet ? (
          <Ionicons name="wallet-outline" size={25} color={Colors.themeWhite} />
        ) : null}
        {props.dollar ? (
          <View style={styles.innerContainer}>
            <Fontisto
              name="dollar"
              size={15}
              color={Colors.lightblueiconBackground}
            />
          </View>
        ) : null}

        {props.icon == 'restaurant' ? (
          <MaterialCommunityIcons
            name="storefront"
            color={Colors.themeRed}
            size={25}
          />
        ) : null}
        {props.icon == 'bike' ? (
          <MaterialCommunityIcons
            name="motorbike"
            color={Colors.themeRed}
            size={25}
          />
        ) : null}
        {props.icon == 'food' ? (
          <Ionicons name="fast-food" color={Colors.themeRed} size={25} />
        ) : null}
        {props.icon == 'restaurant2' ? (
          <MaterialCommunityIcons
            name="store-check-outline"
            color={Colors.themeRed}
            size={25}
          />
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default SquareIconButton;

const styles = StyleSheet.create({
  backButtonContainer: {
    backgroundColor: Colors.themeWhite,
    padding: 2,
    alignSelf: 'center',
    alignItems: 'center',
  },
});
