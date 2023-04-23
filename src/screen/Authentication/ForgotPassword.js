import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ImageBackground,
  Image,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useRef, useContext} from 'react';

import {useForm} from 'react-hook-form';
import CustomButton from '../../components/buttons/CustomButton';
import {Colors} from '../../constant/Colors';
import Input from '../../components/inputs/Inputs';
import GetItDoneImage from '../../components/GetItDoneImage';
import {useDispatch, useSelector} from 'react-redux';
import {resetPassword} from '../../redux/actions/AuthActions';
import ResponseModal from '../../components/modals/ResponseModal';
import {useNavigation} from '@react-navigation/native';

const ForgotPassword = () => {
  const [index, setIndex] = useState(99);
  const [modalVisible, setModalVisible] = useState(false);
  const response_status = useSelector(state => state.auth.response_status);
  const loading = useSelector(state => state.auth.is_loading);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    watch,
    formState: {errors, isValid},
  } = useForm({mode: 'all'});

  const onSubmit = data => {
    dispatch(resetPassword(data, setModalVisible, navigation));
    // navigation.navigate('otp', {type: 'forgot'});
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.screenContainer}>
        <ResponseModal
          title={response_status?.message}
          visible={modalVisible}
          onBackButtonPress={() => setModalVisible(false)}
          onBackdropPress={() => setModalVisible(false)}
          state={response_status?.status}
        />
        <View>
          <Text style={styles.headerText}>Forgot Password</Text>
          <Text
            style={{
              color: '#000000B2',
              fontFamily: 'Poppins-Regular',
              fontSize: 16,
              alignSelf: 'flex-start',
              marginHorizontal: 25,
              paddingVertical: 10,
            }}>
            Enter your registered email to confirm the account and get the OTP.
          </Text>

          <View style={{paddingTop: 15}}>
            <Input
              onFocus={() => {
                setIndex(0);
              }}
              style={[
                styles.containerStyle,
                {
                  borderWidth: index === 0 ? 1 : 0.5,
                  borderColor: index === 0 ? Colors.themeRed : Colors.lightfont,
                },
              ]}
              control={control}
              name="email"
              rules={{
                required: '*Email is required',
                pattern: {
                  value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                  message: '*Enter a valid Email',
                },
              }}
              //   onSubmitEditing={handleSubmit(onSubmit)}
              keyboardType="email-address"
              placeholder="Email Address"
              placeholderTextColor={'#32323266'}
            />
          </View>
          {errors.email && (
            <Text style={styles.error}>{errors.email.message} </Text>
          )}
          <CustomButton
            onPress={handleSubmit(onSubmit)}
            loading={loading}
            // style={styles.containerStyle}
            title="Next"
            style={styles.enabledButton}
            textStyle={styles.enabledButtonText}
          />
          <GetItDoneImage style={{height: '60%'}} />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.themeWhite,
    justifyContent: 'space-between',
  },
  headerText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 30,
    color: '#000000',
    alignSelf: 'flex-start',
    marginHorizontal: 25,
    paddingTop: 50,
  },
  containerStyle: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: Colors.textInputBackground,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  error: {
    color: 'red',
    fontSize: 12,
    alignSelf: 'flex-start',
    marginLeft: 25,
    marginTop: 5,
    fontFamily: 'Poppins-SemiBold',
  },

  disabledButtonText: {
    color: 'white',
  },
  enabledButton: {
    // alignSelf: 'center',
    marginTop: 30,
  },
  enabledButtonText: {
    // color: 'white',
  },
});
