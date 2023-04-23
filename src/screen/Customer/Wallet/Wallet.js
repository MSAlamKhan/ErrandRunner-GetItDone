import React, {useState, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import SquareIconButton from '../../../components/buttons/SquareIconButton';
import TransactionCard from '../../../components/cards/TransactionCard';
import WalletCard from '../../../components/cards/WalletCard';
import {Colors} from '../../../constant/Colors';
import {Font} from '../../../constant/Font';
import WalletModal from '../../../components/modals/WalletModal';
import {useDispatch, useSelector} from 'react-redux';
import {
  getWalletData,
  get_Transactions,
} from '../../../redux/actions/CustomerAction';
import {scale} from 'react-native-size-matters-ch';
const Wallet = ({navigation}) => {
  const dispatch = useDispatch();
  const user_id = useSelector(state => state.auth.user_details.user_id);
  const balance = useSelector(state => state.customer.balance);
  const _getTransactions = useSelector(
    state => state.customer.transactions_Log,
  );
  const [loading, setLoading] = useState(false);
  console.log('_getTransactions', _getTransactions);
  const [modalVisible, setModalVisible] = useState(false);
  // const data = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}];
  console.log('MODAL STATUS', modalVisible);

  console.log('data ', _getTransactions);

  const transaction_details = () => {
    // console.log('userId', user_id);
    dispatch(get_Transactions(user_id));
    dispatch(getWalletData(user_id));
  };

  useFocusEffect(
    useCallback(() => {
      setModalVisible(false);
      transaction_details();
    }, [balance]),
  );

  setTimeout(() => {
    setLoading(true);
  }, 1000);
  return (
    <View style={styles.container}>
      <View style={styles.upperContainer}>
        <SquareIconButton
          back={true}
          style={styles.iconButton}
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={styles.lowerContainer}>
        <WalletModal visible={modalVisible} navigation={navigation} />
        <WalletCard
          addOnPress={() => setModalVisible(modalVisible => !modalVisible)}
          balance={balance}
        />
        {/* <WalletCard addOnPress={() => navigation.navigate('walletModal')} /> */}

        <Text style={styles.tranctionText}>Transactions History</Text>
        {!loading ? (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator size={'large'} color={Colors.themeRed} />
          </View>
        ) : (
          <FlatList
            data={_getTransactions}
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

export default Wallet;

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
