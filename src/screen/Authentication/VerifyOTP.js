import React, {useState, useEffect, useContext} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {useDispatch, useSelector} from 'react-redux';
import CustomButton from '../../components/buttons/CustomButton';
import GetItDoneImage from '../../components/GetItDoneImage';
import ResponseModal from '../../components/modals/ResponseModal';
import {Colors} from '../../constant/Colors';
import {resentOTP} from '../../redux/actions/AuthActions';
import {Response_Status} from '../../redux/reducers/AuthReducer';

const VerifyOTP = ({navigation, route}) => {
  const [value, setValue] = useState('');
  const {data, type} = route.params;
  const [counter, setCounter] = useState(5);
  const dispatch = useDispatch();
  const otp = useSelector(state => state.auth.otp);
  const loading = useSelector(state => state.auth.is_loading);
  const [modalVisible, setModalVisible] = useState(false);
  const response_status = useSelector(state => state.auth.response_status);
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  // const {error,setError}=useState({state:"",message:""})
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const onClickNext = () => {
    if (value.length == 4) {
      if (value == otp) {
        type === 'registration'
          ? navigation.navigate('accountType', {data})
          : navigation.navigate('changePassowrd', {email: data.email});
      } else {
        dispatch({
          type: Response_Status,
          payload: {status: false, message: 'my message'},
        });
        setModalVisible(true);
        console.log('abau disptach'),
          setTimeout(() => {
            setModalVisible(false);
          }, 1500);
      }
    } else {
      dispatch({
        type: Response_Status,
        payload: {status: false, message: 'OTP Length must be 4 digits'},
      });
    }
  };
  console.log('typeee', type);

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  const CELL_COUNT = 4;
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.screenContainer}>
        <ResponseModal
          title={response_status.message}
          visible={modalVisible}
          onBackButtonPress={() => setModalVisible(false)}
          onBackdropPress={() => setModalVisible(false)}
          state={response_status.status}
        />
        <View>
          <Text style={styles.headerText}>Verify OTP</Text>
          <Text style={styles.subHeaderText}>
            Check your Mobile for OTP.{otp}
          </Text>

          <View style={styles.otpContainer}>
            <CodeField
              ref={ref}
              {...props}
              // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
              value={value}
              onChangeText={setValue}
              cellCount={CELL_COUNT}
              rootStyle
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={({index, symbol, isFocused}) => (
                <Text
                  key={index}
                  style={[styles.cell, isFocused && styles.focusCell]}
                  onLayout={getCellOnLayoutHandler(index)}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              )}
            />
          </View>
          <CustomButton
            onPress={() => {
              onClickNext();
            }}
            style={styles.buttonStyle}
            title="Next"
          />
        </View>
        <GetItDoneImage />
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
          }}>
          <Text
            style={{
              fontSize: 13,
              color: '#00000080',
              // marginBottom: 35,
              paddingTop: 10,
              fontFamily: 'ComicNeue-Medium',
            }}>
            You can resend the code in {counter}{' '}
            {counter <= 1 ? 'second' : 'seconds'}
          </Text>
          <TouchableOpacity
            onPress={() => {
              dispatch(resentOTP(data, setModalVisible));
              setCounter(60);
            }}
            disabled={counter == 0 ? false : true}>
            <Text
              style={[
                styles.clickHere,
                {color: counter == 0 ? Colors.themeRed : '#CCC'},
              ]}>
              Click Here
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default VerifyOTP;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.themeWhite,
    justifyContent: 'space-between',
  },
  cell: {
    width: 70,
    height: 70,

    textAlignVertical: 'center',
    fontSize: 24,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderRadius: 10,
    textAlign: 'center',
    color: Colors.themeRed,
    borderColor: Colors.themeRed,
    fontFamily: 'Poppins-Regular',
  },

  focusCell: {
    borderColor: '#b30505',
    height: 70,
  },

  headerText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 30,
    color: '#000000',
    alignSelf: 'flex-start',
    marginHorizontal: 25,
    paddingTop: 50,
  },
  subHeaderText: {
    color: '#000000B2',
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    alignSelf: 'flex-start',
    marginHorizontal: 25,
    paddingTop: 10,
  },

  clickHere: {
    fontSize: 13,

    marginBottom: 10,
    paddingTop: 10,
    paddingHorizontal: 5,
    fontFamily: 'Poppins-Bold',
  },

  otpContainer: {
    backgroundColor: '#FFFFFE',
    justifyContent: 'center',
    // paddingHorizontal: 15,
    borderRadius: 20,
    marginHorizontal: 30,
    marginVertical: 50,
  },
});
