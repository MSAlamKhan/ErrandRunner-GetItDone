import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../constant/Colors';
import SquareIconButton from '../buttons/SquareIconButton';
const ScreenHeader = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.welcomeText}>Welcome,</Text>

      <SquareIconButton
        notification={true}
        onPress={() => navigation.navigate('noti')}
      />

    </View>
  );
};

export default ScreenHeader;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    marginTop: 30,
    alignItems: 'center',
  },
  welcomeText: {
    color: Colors.themeRed,
    fontFamily: 'Poppins-Regular',
    fontSize: 20,
  },
});