import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../../../constant/Colors';
import ScreenHeader from '../../../components/header/ScreenHeader';

const DashboardTask = () => {
  return (
    <View style={styles.container}>
      <ScreenHeader />
      <Text style={styles.dashBoardText}>Your Dashboard</Text>
    </View>
  );
};

export default DashboardTask;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.themeWhite,
    flex: 1,
  },
  dashBoardText: {
    color: Colors.themeRed,
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    paddingLeft: 20,
  },
});
