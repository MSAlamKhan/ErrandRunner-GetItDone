import {useFocusEffect} from '@react-navigation/native';
import React from 'react';
import {useCallback} from 'react';
import {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import SquareIconButton from '../../../components/buttons/SquareIconButton';
import TransactionCard from '../../../components/cards/TransactionCard';
import WalletCard from '../../../components/cards/WalletCard';

import WithdrawModal from '../../../components/modals/WithdrawModal';
import {base_Url, token} from '../../../constant/BaseUrl';
import {Colors} from '../../../constant/Colors';
import {Font} from '../../../constant/Font';
import {
  getbanks,
  getTransectionLog,
} from '../../../redux/actions/ProviderAction';
import {scale} from 'react-native-size-matters-ch';
const ProvidesWallet = ({navigation}) => {
  const userId = useSelector(state => state.auth.user_details.user_id);
  const bank = useSelector(state => state.provider.add_bank_details);

  const transactionData = useSelector(state => state.provider.transactions_Log);

  const dispatch = useDispatch();
  const [walletModal, setWalletModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bal, setBal] = useState();

  const fetchWalletData = async user_id => {
    try {
      let base_url = `${base_Url}/checkWalletBalance.php`;
      let formData = new FormData();
      formData.append('token', token);
      formData.append('user_id', user_id);
      const response = await fetch(base_url, {
        method: 'post',
        body: formData,
      });
      const responseData = await response.json();
      if (responseData.status == true) {
        console.log('RESPONSE DATA', responseData);
        setBal(Number(responseData.current_balance));
      }
    } catch (error) {
      console.log('eeeeeERRRE', error);
    }
  };

  setTimeout(() => {
    setLoading(true);
  }, 1000);
  const withDrawModal = () => {
    setWalletModal(!walletModal);
    dispatch(getbanks(userId));
  };
  useFocusEffect(
    useCallback(() => {
      dispatch(getTransectionLog(userId));
      fetchWalletData(userId);
    }, [userId]),
  );
  return (
    <View style={styles.container}>
      <WithdrawModal
        visible={walletModal}
        onCancel={setWalletModal}
        totalBalance={bal}
      />
      <View style={styles.upperContainer}>
        <SquareIconButton
          back={true}
          style={styles.iconButton}
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={styles.lowerContainer}>
        <WalletCard
          provides={true}
          addOnPress={() => navigation.navigate('bankDetails')}
          withdrawOnPress={() => withDrawModal()}
          balance={bal}
        />
        <Text style={styles.tranctionText}>Transactions History</Text>
        {!loading ? (
          <View
            style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
            <ActivityIndicator size={'large'} color={Colors.themeRed} />
          </View>
        ) : (
          <FlatList
            data={transactionData}
            ListEmptyComponent={() => (
              <View
                style={{
                  height: scale(300),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{fontFamily: Font.Poppins300, color: Colors.themeRed}}>
                  No Transactions to Show
                </Text>
              </View>
            )}
            keyExtractor={item => item.id}
            renderItem={({item}) => {
              return <TransactionCard item={item} />;
            }}
          />
        )}
      </View>
    </View>
  );
};

export default ProvidesWallet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.themeWhite,
  },
  upperContainer: {
    backgroundColor: Colors.themeRed,
    flex: 1,
  },
  iconButton: {
    alignSelf: 'flex-start',
    marginTop: 20,
    marginLeft: 10,
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  lowerContainer: {
    flex: 2,
    marginBottom: 10,
  },
  tranctionText: {
    fontFamily: Font.Poppins500,
    color: Colors.lightfont,
    fontSize: 18,
    marginTop: 20,
    paddingLeft: 20,
  },
});
