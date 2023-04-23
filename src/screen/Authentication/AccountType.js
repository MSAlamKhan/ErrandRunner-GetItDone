import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {Font} from '../../constant/Font';
import {Colors} from '../../constant/Colors';
import AccountSelectionCard from '../../components/cards/AccountSelectionCard';
import CustomButton from '../../components/buttons/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import {register} from '../../redux/actions/AuthActions';
import ResponseModal from '../../components/modals/ResponseModal';

const AccountType = ({route, navigation}) => {
  const [itemsValue, setItemsValue] = useState('');
  const {data} = route.params;

  console.log('data====>', data);

  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const response_status = useSelector(state => state.auth.response_status);
  const SocialDetails = useSelector(state => state.auth.socialLoginDetail);
  console.log('SOCIAL DETAILSSS', SocialDetails);
  const dispatch = useDispatch();
  const SelectItemsHandler = id => {
    if (itemsValue == id) {
      setItemsValue(id);
    } else {
      setItemsValue(id);
    }
  };
  // const {data} = route.params;
  // console.log(data);
  const SelectionType = [
    {
      id: 2,
      title: 'Provider',
      description: 'Complete Provider Descirpton',
      image: require('../../assets/images/job.png'),
      selected: true,
    },
    {
      id: 1,
      title: 'Customer',
      description: 'Complete Customer Description',
      image: require('../../assets/images/company.png'),
      selected: false,
    },
  ];
  return (
    <SafeAreaView style={styles.screenContainer}>
      <ResponseModal
        title={response_status?.message}
        visible={modalVisible}
        onBackButtonPress={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}
        state={response_status?.status}
      />
      <Image
        style={styles.image}
        source={require('../../assets/images/getitdone.png')}
      />
      <Text style={styles.headerText}>Who are you?</Text>
      <Text style={styles.subtext}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor
      </Text>

      <View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={SelectionType}
          keyExtractor={items => items.id}
          renderItem={({item, ind}) => {
            return (
              <AccountSelectionCard
                onPress={() => SelectItemsHandler(item.id)}
                selectedItem={itemsValue}
                id={item.id}
                image={item.image}
                title={item.title}
                description={item.description}
              />
            );
          }}
        />
      </View>
      <CustomButton
        onPress={() => {
          if (itemsValue === '') {
            alert('please select one of the role.');
          } else {
            console.log('checckk', itemsValue);
            console.log('ZZSZZZZ : ', data);
            dispatch(
              register(data, itemsValue, setModalVisible, SocialDetails),
            );
          }
        }}
        containerStyle={styles.containerStyle}
        title="NEXT"
      />
    </SafeAreaView>
  );
};

export default AccountType;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.themeWhite,
  },
  image: {
    alignSelf: 'center',
    height: '30%',
    aspectRatio: 1 / 1,
  },
  headerText: {
    color: '#000000',
    fontFamily: Font.Poppins600,
    width: '85%',
    alignSelf: 'center',
    fontSize: 22,
    paddingVertical: 10,
  },
  subtext: {
    color: '#000000B2',
    fontFamily: Font.Poppins400,
    width: '85%',
    alignSelf: 'center',
    fontSize: 14,
  },

  containerStyle: {
    width: '80%',
    alignSelf: 'center',
    marginTop: '10%',
  },
});
