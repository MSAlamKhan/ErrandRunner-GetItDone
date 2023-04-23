import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';

import {Colors} from '../../constant/Colors';
import {Font} from '../../constant/Font';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import RNIMigration from 'react-native-vector-icons/RNIMigration';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Zocial from 'react-native-vector-icons/Zocial';

const TaskContainer = props => {
  // const data = props.data;

  const iconConverter = () => {
    switch (props.icon_type) {
      case 'Entypo':
        return Entypo;
      case 'AntDesign':
        return AntDesign;
      case 'EvilIcons':
        return EvilIcons;
      case 'Feather':
        return Feather;
      case 'Zocial':
        return Zocial;
      case 'SimpleLineIcons':
        return SimpleLineIcons;
      case 'Octicons':
        return Octicons;
      case 'RNIMigration':
        return RNIMigration;
      case 'MaterialIcons':
        return MaterialIcons;
      case 'MaterialCommunityIcons':
        return MaterialCommunityIcons;
      case 'Ionicons':
        return Ionicons;
      case 'Foundation':
        return Foundation;
      case 'Fontisto':
        return Fontisto;
      case 'FontAwesome5Pro':
        return FontAwesome5Pro;
      case 'FontAwesome5':
        return FontAwesome5;
      case 'FontAwesome':
        return FontAwesome;
    }
  };

  const Icon = iconConverter();

  return (
    <TouchableOpacity onPress={props.onPress} style={styles.taskcontainer}>
      <View style={[styles.taskSquareContainer, props.containerStyle]}>
        <Icon name={props.icon_name} size={60} color={props.iconColor} />
      </View>
      <Text style={styles.nameText}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default TaskContainer;

const styles = StyleSheet.create({
  taskcontainer: {
    width: '50%',
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskSquareContainer: {
    borderRadius: 20,
    width: '60%',
    //   height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 1 / 1,
  },
  medicineContainer: {
    padding: 30,
  },
  triangleIcon: {
    position: 'absolute',
    width: 30,
    height: 30,
    left: 0,
  },
  minusIcon: {
    position: 'absolute',
    width: 30,
    height: 30,
    right: 0,
  },
  capsuleIcon: {
    position: 'absolute',
    width: 30,
    height: 30,
    alignSelf: 'center',
    bottom: 0,
  },
  nameText: {
    color: Colors.themeRed,
    fontFamily: Font.Poppins600,
    fontSize: 16,
  },
});
