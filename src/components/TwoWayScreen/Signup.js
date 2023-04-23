import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import Input from '../inputs/Inputs';

import CustomButton from '../buttons/CustomButton';
import {Colors} from '../../constant/Colors';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {verifyEmail} from '../../redux/actions/AuthActions';

import ResponseModal from '../modals/ResponseModal';
import {clockRunning} from 'react-native-reanimated';

const Registeration = ({route}) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const response_status = useSelector(state => state.auth.response_status);
  const loading = useSelector(state => state.auth.is_loading);
  const SocialDetails = useSelector(state => state.auth.socialLoginDetail);

  const dispatch = useDispatch();
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: {errors, isValid},
  } = useForm({
    mode: 'all',
    defaultValues: {
      firstName: SocialDetails == null ? '' : SocialDetails.firstName,
      lastName: SocialDetails == null ? '' : SocialDetails.lastName,
      email: SocialDetails == null ? '' : SocialDetails.email,
    },
  });
  const onSubmit = data => {
    console.log(data);
    if (SocialDetails != null) {
      navigation.navigate('accountType', {data});
    } else {
      dispatch(verifyEmail(data, navigation, setModalVisible));
    }
  };
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;

  return (
    <View style={{flex: 1}}>
      <ScrollView>
        {/* <KeyboardAvoidingView
          behavior="position"
          keyboardVerticalOffset={keyboardVerticalOffset}
          style={styles.container}> */}
        <ResponseModal
          title={response_status?.message}
          visible={modalVisible}
          onBackButtonPress={() => setModalVisible(false)}
          onBackdropPress={() => setModalVisible(false)}
          state={response_status?.status}
        />

        <View style={styles.inputContainer}>
          <Text style={styles.inputTitleText}>First Name</Text>
          <View style={styles.inputFieldContainer}>
            <Input
              name="firstName"
              placeholderTextColor={Colors.placeholderText}
              control={control}
              style={styles.inputField}
              textStyle={[styles.inputTextStyle, {marginTop: 5}]}
              rules={{
                required: 'First Name is required',
              }}
              placeholder="Enter your First Name"
            />
          </View>
          {errors.firstName && (
            <Text style={styles.error}>{errors.firstName.message} </Text>
          )}
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitleText}>Last Name</Text>
          <View style={styles.inputFieldContainer}>
            <Input
              name="lastName"
              control={control}
              placeholderTextColor={Colors.placeholderText}
              style={styles.inputField}
              textStyle={[styles.inputTextStyle, {marginTop: 5}]}
              rules={{
                required: 'Last Name is required',
              }}
              placeholder="Enter Your Last Name"
            />
          </View>
          {errors.lastName && (
            <Text style={styles.error}>{errors.lastName.message} </Text>
          )}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputTitleText}>Email</Text>
          <View style={styles.inputFieldContainer}>
            <Input
              name="email"
              control={control}
              keyboardType={'email-address'}
              placeholderTextColor={Colors.placeholderText}
              style={styles.inputField}
              textStyle={[styles.inputTextStyle, {marginTop: 5}]}
              rules={{
                required: 'email is required',
                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                message: 'Enter a valid email',
              }}
              placeholder="Enter Your Email Address"
            />
          </View>
          {errors.email && (
            <Text style={styles.error}>{errors.email.message} </Text>
          )}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputTitleText}>Phone Number</Text>
          <View style={styles.inputFieldContainer}>
            <Input
              name="phoneNumber"
              control={control}
              keyboardType={'number-pad'}
              maxLength={10}
              placeholderTextColor={Colors.placeholderText}
              style={styles.inputField}
              textStyle={[styles.inputTextStyle, {marginTop: 5}]}
              rules={{
                required: 'Phone Number is required',
              }}
              placeholder="Enter Your Phone Number"
            />
          </View>
          {errors.phoneNumber && (
            <Text style={styles.error}>{errors.phoneNumber.message} </Text>
          )}
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitleText}>Address</Text>
          <View style={styles.inputFieldContainer}>
            <Input
              name="address"
              control={control}
              placeholderTextColor={Colors.placeholderText}
              style={styles.inputField}
              textStyle={[styles.inputTextStyle, {marginTop: 5}]}
              rules={{
                required: 'Address is required',
              }}
              placeholder="Enter Your Address"
            />
          </View>
          {errors.address && (
            <Text style={styles.error}>{errors.address.message} </Text>
          )}
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitleText}>City</Text>
          <View style={styles.inputFieldContainer}>
            <Input
              name="city"
              control={control}
              placeholderTextColor={Colors.placeholderText}
              style={styles.inputField}
              textStyle={[styles.inputTextStyle, {marginTop: 5}]}
              rules={{
                required: 'City is required',
              }}
              placeholder="Enter Your City "
            />
          </View>
          {errors.city && (
            <Text style={styles.error}>{errors.city.message} </Text>
          )}
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitleText}>State</Text>
          <View style={styles.inputFieldContainer}>
            <Input
              name="state"
              control={control}
              placeholderTextColor={Colors.placeholderText}
              style={styles.inputField}
              textStyle={[styles.inputTextStyle, {marginTop: 5}]}
              rules={{
                required: 'State is required',
              }}
              placeholder="Enter your State"
            />
          </View>
          {errors.state && (
            <Text style={styles.error}>{errors.state.message} </Text>
          )}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputTitleText}>Zip code</Text>
          <View style={styles.inputFieldContainer}>
            <Input
              name="zipCode"
              keyboardType={'number-pad'}
              control={control}
              maxLength={5}
              placeholderTextColor={Colors.placeholderText}
              style={styles.inputField}
              textStyle={[styles.inputTextStyle, {marginTop: 5}]}
              rules={{
                required: 'Zipcode is required',
                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                message: 'Enter a valid email',
              }}
              placeholder="Enter Your Zip Code"
            />
          </View>
          {errors.zipCode && (
            <Text style={styles.error}>{errors.zipCode.message} </Text>
          )}
        </View>

        {SocialDetails ? null : (
          <>
            <View style={styles.inputContainer}>
              <Text style={styles.inputTitleText}>Password</Text>
              <View style={styles.inputFieldContainer}>
                <Input
                  name="password"
                  control={control}
                  secureTextEntry={true}
                  placeholderTextColor={Colors.placeholderText}
                  style={styles.inputField}
                  textStyle={[styles.inputTextStyle, {marginTop: 5}]}
                  rules={{
                    required: 'Password is required',
                  }}
                  placeholder="Enter your Password"
                />
              </View>
              {errors.password && (
                <Text style={styles.error}>{errors.password.message} </Text>
              )}
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputTitleText}>Confirm Password</Text>
              <View style={styles.inputFieldContainer}>
                <Input
                  name="confirmPassword"
                  control={control}
                  secureTextEntry={true}
                  placeholderTextColor={Colors.placeholderText}
                  style={styles.inputField}
                  textStyle={[styles.inputTextStyle, {marginTop: 5}]}
                  rules={{
                    required: 'Confrim Password is required',
                    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                    message: 'Enter a valid email',
                    validate: {
                      positive: value =>
                        value === watch('password') ||
                        'The passwords do not match',
                    },
                  }}
                  placeholder="Enter Your Confirm Password"
                />
              </View>
              {errors.confirmPassword && (
                <Text style={styles.error}>
                  {errors.confirmPassword.message}{' '}
                </Text>
              )}
            </View>
          </>
        )}
        {/* </KeyboardAvoidingView> */}
      </ScrollView>

      <CustomButton
        loading={loading}
        onPress={handleSubmit(onSubmit)}
        title={'Next'}
        style={{marginVertical: 20}}
      />
    </View>
  );
};

export default Registeration;

const styles = StyleSheet.create({
  inputContainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
  },
  inputTitleText: {
    color: Colors.inputText,
    marginBottom: -15,
    fontFamily: 'Poppins-SemiBold',
  },
  inputFieldContainer: {
    justifyContent: 'center',
    borderBottomWidth: 1,
  },

  inputTextStyle: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    marginBottom: -7,
    color: Colors.inputText,
  },
  error: {
    color: 'red',
    fontSize: 12,
    alignSelf: 'flex-start',
    // marginLeft: 25,
    marginTop: 5,
    fontFamily: 'Poppins-SemiBold',
  },
});
