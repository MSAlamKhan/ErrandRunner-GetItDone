import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {Colors} from '../../constant/Colors';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const SmallBoxWithIcon = props => {
  return (
    <View style={[styles.cardContainer]}>
      {props.icon == 'Pick Medicine' ? (
        // <View style={styles.medicineContainer}>
        //   <Image
        //     style={styles.triangleIcon}
        //     source={require('../../assets/images/triangle.png')}
        //   />
        //   <Image
        //     style={styles.minusIcon}
        //     source={require('../../assets/images/minus.png')}
        //   />
        //   <Image
        //     style={styles.capsuleIcon}
        //     source={require('../../assets/images/capsule.png')}
        //   />
        // </View>
        <FontAwesome5 name="capsules" size={30} color={Colors.themeRed} />
      ) : null}
      {props.icon == 'Pick Food' ? (
        <Ionicons name="fast-food" size={30} color={Colors.themeRed} />
      ) : null}
      {props.icon == 'Pick Grocery' ? (
        <MaterialIcons
          name="local-grocery-store"
          color={Colors.themeRed}
          size={30}
        />
      ) : null}
      {props.icon == 'Pick Coffee' ? (
        <Feather name="coffee" size={30} color={Colors.themeRed} />
      ) : null}
      {props.icon == 'Pick Cocktail' ? (
        <FontAwesome5 name="cocktail" size={30} color={Colors.themeRed} />
      ) : null}
      {props.icon == 'Pick Mobile' ? (
        <FontAwesome5 name="mobile" size={30} color={Colors.themeRed} />
      ) : null}
    </View>
  );
};

export default SmallBoxWithIcon;

const styles = StyleSheet.create({
  cardContainer: {
    justifyContent: 'space-between',
    paddingVertical: 10,
    // backgroundColor: 'yellow',
    backgroundColor: Colors.cardLightPink,
    padding: 10,
    borderRadius: 10,
  },
  medicineContainer: {
    padding: 15,
  },
  triangleIcon: {
    position: 'absolute',
    width: 15,
    height: 15,
    left: 0,
  },
  minusIcon: {
    position: 'absolute',
    width: 16,
    height: 16,
    right: 0,
  },
  capsuleIcon: {
    position: 'absolute',
    width: 15,
    height: 15,
    left: 9,
    top: 15,
  },
});
