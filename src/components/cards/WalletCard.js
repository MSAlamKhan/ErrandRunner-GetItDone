import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../constant/Colors';

import SquareIconButton from '../buttons/SquareIconButton';
import {Font} from '../../constant/Font';
import CustomButton from '../buttons/CustomButton';
import {base_Url, token} from '../../constant/BaseUrl';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {useCallback} from 'react';

const WalletCard = props => {
  const user_id = useSelector(state => state.auth.user_details.user_id);
  const [modalVisible, setVisible] = useState(false);

  // useFocusEffect(
  //   useCallback(() => {
  //     fetchWalletData(user_id, setVisible);
  //   }, []),
  // );

  return (
    <View style={styles.cardContainer}>
      <Text style={styles.myWalletText}>My Wallet</Text>
      <View style={styles.totalBalanceContainer}>
        <SquareIconButton style={styles.iconContainer} wallet={true} />
        <View style={styles.priceContainer}>
          <Text style={styles.balanceText}>Total Balance</Text>
          <Text style={styles.balanceText}>${props.balance}</Text>
        </View>
      </View>

      <CustomButton
        onPress={props.addOnPress}
        style={[
          styles.buttonContainer,
          {
            backgroundColor: props.provides
              ? Colors.buttonPurpleBackground
              : Colors.buttonGreenBackground,
          },
        ]}
        title={props.provides ? 'Add Bank' : 'Add Money'}
      />
      {props.provides && (
        <CustomButton
          onPress={props.withdrawOnPress}
          style={[
            styles.buttonContainer,
            {marginTop: 10, backgroundColor: Colors.buttonSeaGreenBackground},
          ]}
          title="Withdraw"
        />
      )}
    </View>
  );
};

export default WalletCard;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: Colors.themeWhite,
    // backgroundColor: 'grey',
    marginHorizontal: 20,
    marginTop: '-40%',

    paddingHorizontal: 15,
    paddingVertical: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
  myWalletText: {
    color: Colors.darkfont,
    fontFamily: Font.Poppins500,
    fontSize: 18,
  },
  totalBalanceContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  iconContainer: {
    backgroundColor: Colors.themeRedLight,
    borderRadius: 100,
    // padding: 3,
    height: 50,
    aspectRatio: 1 / 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  priceContainer: {
    paddingLeft: 10,
  },
  balanceText: {
    color: Colors.themeRed,
    fontFamily: Font.Poppins600,
    fontSize: 22,
    lineHeight: 25,
  },
  buttonContainer: {
    borderRadius: 30,
  },
});
