import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../constant/Colors';

const EmptyScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.themeWhite,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text style={{fontSize: 20, color: 'black'}}>EmptyScreen</Text>
    </View>
  );
};

export default EmptyScreen;

const styles = StyleSheet.create({});
