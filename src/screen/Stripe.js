import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
  I18nManager,
} from 'react-native';
import React, {
  useEffect,
  useRef,
  useState,
  useContext,
  useCallback,
} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from '../constant/Colors';
import {useForm} from 'react-hook-form';
import Input from '../components/inputs/Inputs';
import CustomButton from '../components/buttons/CustomButton';
import SquareIconButton from '../components/buttons/SquareIconButton';
import FullScreenLogin from '../components/Loader/FullScreenLoader';
import {base_Url, token} from '../constant/BaseUrl';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

// create a component
const CURRENCY = 'USD';
var CARD_TOKEN = null;
// const STRIPE_PUBLISHABLE_KEY =
//   'pk_test_51KsK97HmIepslB4LEJkmrrFr3zQw4CbcrKSxYQuktQVJlgfDyoaBsHok4tuHShl1EHEKc5nsoopEJ56b6iSRgMuD00PdiTFJJ6';
// const Secret_key =
//   'sk_test_51KsK97HmIepslB4LHRIVngVUWNgBgpLIYGdwTKf5B6ILmoxWjKELhEoQ7n758DAMHXQRgz1FnZrQ8iGXKjUYqSJd005yXMlK04';

const STRIPE_PUBLISHABLE_KEY =
  'pk_test_51KsK97HmIepslB4LEJkmrrFr3zQw4CbcrKSxYQuktQVJlgfDyoaBsHok4tuHShl1EHEKc5nsoopEJ56b6iSRgMuD00PdiTFJJ6';
const Secret_key =
  'sk_test_51KsK97HmIepslB4LHRIVngVUWNgBgpLIYGdwTKf5B6ILmoxWjKELhEoQ7n758DAMHXQRgz1FnZrQ8iGXKjUYqSJd005yXMlK04';

function getCreditCardToken(creditCardData) {
  // console.log('creditCardData ', creditCardData);
  // alert()
  const card = {
    'card[number]': creditCardData.values.number.replace(/ /g, ''),
    'card[exp_month]': creditCardData.values.expiry.split('/')[0],
    'card[exp_year]': creditCardData.values.expiry.split('/')[1],
    'card[cvc]': creditCardData.values.cvc,
  };
  return fetch('https://api.stripe.com/v1/tokens', {
    headers: {
      // Use the correct MIME type for your server
      Accept: 'application/json',
      // Use the correct Content Type to send data to Stripe
      'Content-Type': 'application/x-www-form-urlencoded',
      // Use the Stripe publishable key as Bearer
      Authorization: `Bearer ${STRIPE_PUBLISHABLE_KEY}`,
    },
    // Use a proper HTTP method
    method: 'post',
    // Format the credit card data to a string of key-value pairs
    // divided by &
    body: Object.keys(card)
      .map(key => key + '=' + card[key])
      .join('&'),
  })
    .then(response => response.json())
    .catch(error => console.log(error));
}
/**
 * The method imitates a request to our server.
 *
 * @param creditCardToken
 * @return {Promise<Response>}
 */
function subscribeUser(creditCardToken) {
  return new Promise(resolve => {
    CARD_TOKEN = creditCardToken.id;
    setTimeout(() => {
      resolve({status: true});
    }, 1000);
  });
}

// ! Add transaction API call
const addTransaction = async (user_id, amount) => {
  console.log('AMOUNTTT', amount);
  console.log('user_id', user_id);

  try {
    let base_url = `${base_Url}/add_transaction.php`;
    let formData = new FormData();
    formData.append('token', token);
    formData.append('user_id', user_id);
    formData.append('amount', amount);
    formData.append('type', 'credit');
    const response = await fetch(base_url, {
      method: 'post',
      body: formData,
    });
    const responseData = await response.json();
    if (responseData.status == true) {
      console.log('Add TRANSACTION RESPONSEEE', responseData);
    }
  } catch (error) {
    console.log('eeeeeERRRE', error);
  }
};

const Stripe = ({route}) => {
  const navigation = useNavigation();
  // console.log('NAVIGATIONSSS', navigation);
  const user_id = useSelector(state => state.auth.user_details.user_id);
  const {depositAmount} = route.params;
  console.log('depositAmountfloat', depositAmount);
  //   const flatlistRef = useRef();
  //   const {userDetails} = useContext(AuthContext);
  const [index, setIndex] = useState(9999);
  const [CardInput, setCardInput] = useState({});
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: {errors},
    reset,
  } = useForm({mode: 'all'});

  const onSubmit = async data => {
    setLoading(true);

    let creditCardToken;
    try {
      // Create a credit card token
      creditCardToken = await getCreditCardToken(data);
      // console.log("creditCardToken", creditCardToken)
      if (creditCardToken.error) {
        alert('creditCardToken error');

        return;
      }
    } catch (e) {
      console.log('errrorrr', e);
      return;
    }
    console.log('creditCardToken', creditCardToken);
    // Send a request to your server with the received credit card token
    const {error} = await subscribeUser(creditCardToken);
    // Handle any errors from your server
    if (error) {
      alert(error);
    } else {
      let pament_data = await charges();
      console.log('payment ', pament_data);
      if (pament_data.status == 'succeeded') {
        addTransaction(user_id, depositAmount);
        setLoading(false);
        navigation.navigate('wallet');
        // payment();
        // setCardInput({});
      } else {
        // setLoading(false);
        alert('Payment failed');
        // navigaiton.goBack();
        navigation.navigate('wallet');
      }
    }
    setLoading(true);
  };
  const charges = async () => {
    const card = {
      amount: parseFloat(depositAmount) * 100,
      currency: CURRENCY,
      source: CARD_TOKEN,
      description: 'Developer Ayan subscription',
    };

    return fetch('https://api.stripe.com/v1/charges', {
      headers: {
        // Use the correct MIME type for your server
        Accept: 'application/json',
        // Use the correct Content Type to send data to Stripe
        'Content-Type': 'application/x-www-form-urlencoded',
        // Use the Stripe publishable key as Bearer
        Authorization: `Bearer ${Secret_key}`,
      },
      // Use a proper HTTP method
      method: 'post',
      // Format the credit card data to a string of key-value pairs
      // divided by &
      body: Object.keys(card)
        .map(key => key + '=' + card[key])
        .join('&'),
    }).then(response => response.json());
  };

  const _onChange = async data => {
    console.log('DATAAAAA', data);
    let expDate = data.month + '/' + data.year;
    console.log('eeeeexpDate', expDate);
    const values = {
      values: {
        cvc: data.cvc,
        expiry: expDate,
        name: data.Acount,
        // number: data.cardNumber
        number: '4242 4242 4242 4242',
      },
    };

    setCardInput(values);
    onSubmit(values);
  };

  return loading ? (
    <FullScreenLogin />
  ) : (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.background}}>
      {/* <BackHeader title={'Buy Subscription'} /> */}
      <SquareIconButton back={true} style={styles.iconButton} />
      <View style={styles.inputContainer}>
        {/* <Text style={styles.inputTitleText}>Card Number</Text> */}
        <Input
          onFocus={() => {
            setIndex(0);
          }}
          InputContainerStyle={
            index === 0
              ? {borderWidth: 1, borderColor: Colors.highlight}
              : {borderWidth: 0}
          }
          control={control}
          name="cardNumber"
          rules={{
            required: 'Card number is required',
            minLength: {
              value: 16,
              message: '*Please enter valid card number',
            },
          }}
          maxLength={16}
          placeholder="Card Number"
          keyboardType="number-pad"
          placeholderTextColor={'#32323266'}
        />
      </View>
      {/* {errors.cardNumber && <ValidationText text={errors.cardNumber.message} />} */}
      {errors.cardNumber && (
        <Text style={styles.error}>{errors.cardNumber.message} </Text>
      )}

      <View
        style={{
          width: '50%',
          marginTop: 10,
          flexDirection: 'row',
          paddingLeft: 20,
        }}>
        <Input
          onFocus={() => {
            setIndex(1);
          }}
          InputContainerStyle={
            index === 1
              ? {borderWidth: 1, borderColor: Colors.highlight}
              : {borderWidth: 0}
          }
          control={control}
          name="month"
          rules={{
            required: 'Month is required',
            maxLength: {
              value: 2,
              message: '*Please enter valid month',
            },
          }}
          placeholder="Month"
          keyboardType="number-pad"
          placeholderTextColor={'#32323266'}
        />

        <Input
          onFocus={() => {
            setIndex(1);
          }}
          InputContainerStyle={
            index === 1
              ? {borderWidth: 1, borderColor: Colors.highlight}
              : {borderWidth: 0}
          }
          control={control}
          name="year"
          rules={{
            required: 'year is required',
            maxLength: {
              value: 2,
              message: '*Please enter valid year',
            },
          }}
          placeholder="Year"
          keyboardType="number-pad"
          placeholderTextColor={'#32323266'}
        />
      </View>
      {/* {errors.expiry && <ValidationText text={errors.expiry.message} />} */}
      {(errors.year || errors.month) && (
        <Text style={styles.error}>Please enter valid date</Text>
      )}

      <View style={styles.inputContainer}>
        <Input
          onFocus={() => {
            setIndex(3);
          }}
          InputContainerStyle={
            index === 3
              ? {borderWidth: 1, borderColor: Colors.highlight}
              : {borderWidth: 0}
          }
          control={control}
          name="Acount"
          rules={{
            required: 'Account holder name is required',
          }}
          placeholder="Acount holder"
          placeholderTextColor={'#32323266'}
        />
      </View>
      {/* {errors.Acount && <ValidationText text={errors.Acount.message} />} */}
      {errors.Acount && (
        <Text style={styles.error}>{errors.Acount.message} </Text>
      )}

      <View style={styles.inputContainer}>
        <Input
          onFocus={() => {
            setIndex(4);
          }}
          InputContainerStyle={
            index === 4
              ? {borderWidth: 1, borderColor: Colors.highlight}
              : {borderWidth: 0}
          }
          control={control}
          name="cvc"
          rules={{
            required: 'CVC is required',
            maxLength: {
              value: 3,
              message: '*Please enter valid CVC number',
            },
          }}
          keyboardType="number-pad"
          placeholder="CVC"
          placeholderTextColor={'#32323266'}
        />
      </View>
      {/* {errors.cvc && <ValidationText text={errors.cvc.message} />} */}
      {errors.cvc && <Text style={styles.error}>{errors.cvc.message} </Text>}

      <CustomButton
        title={'Submit'}
        // onPress={() => setIsSignin(true)}
        onPress={handleSubmit(_onChange)}
        containerStyle={styles.containerStyle}
        style={styles.enabledButton}
        textStyle={styles.enabledButtonText}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerText: {
    color: '#000000',
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    fontSize: 24,
    textAlignVertical: 'center',
    alignSelf: 'flex-start',
    paddingLeft: 20,
  },
  // inputContainer: {
  //   width: '95%',
  //   height: 50,
  //   borderColor: Colors.highlight,
  //   borderWidth: 2,
  //   margin: 10,
  //   borderRadius: 10,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  // },
  inputContainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
  },
  iconButton: {
    alignSelf: 'flex-start',
    marginTop: 20,
    marginLeft: 10,
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  containerStyle: {
    width: '85%',
    alignSelf: 'center',
    marginTop: 18,
  },
  enabledButtonText: {
    color: 'white',
  },
  error: {
    color: 'red',
    fontSize: 12,
    alignSelf: 'flex-start',
    marginLeft: 25,
    marginTop: 5,
    fontFamily: 'Poppins-SemiBold',
  },

  inputTitleText: {
    color: Colors.inputText,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
});

export default Stripe;
