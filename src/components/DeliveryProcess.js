import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SquareIconButton from './buttons/SquareIconButton';
import {Colors} from '../constant/Colors';
import {Font} from '../constant/Font';

const DeliveryProcess = props => {
  const data = props.data;
  return (
    <View style={styles.deliverycontainer}>
      <SquareIconButton
        style={[
          styles.iconContainer,
          {
            backgroundColor: data.status
              ? Colors.themeRedLightest
              : Colors.textInputBackground,
          },
        ]}
        icon={data.icon}
      />
      <Text
        style={[
          styles.name,
          {color: data.status ? Colors.themeRed : Colors.themeRedLight},
        ]}>
        {data.name}
      </Text>
    </View>
  );
};

export default DeliveryProcess;

const styles = StyleSheet.create({
  deliverycontainer: {
    flexDirection: 'row',
    paddingLeft: 20,
    alignItems: 'center',
    marginVertical: 10,
  },
  iconContainer: {
    padding: 10,
  },
  name: {
    paddingLeft: 20,
    fontFamily: Font.Poppins700,
  },
});
