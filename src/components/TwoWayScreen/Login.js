import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {Colors} from '../../constant/Colors';

import {useForm} from 'react-hook-form';
import Input from '../inputs/Inputs';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckBox from '@react-native-community/checkbox';
import Fontisto from 'react-native-vector-icons/Fontisto';
import CustomButton from '../buttons/CustomButton';
import SocialButton from '../buttons/SocialButton';
import {useNavigation} from '@react-navigation/native';
import {Context} from '../../context/ContextFile';
import ResponseModal from '../modals/ResponseModal';
import {
  FacebookSignin,
  googleSignin,
  loginApi,
  verifyEmail,
} from '../../redux/actions/AuthActions';
import {useDispatch, useSelector} from 'react-redux';

const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const response_status = useSelector(state => state.auth.response_status);
  console.log(response_status);
  const loading = useSelector(state => state.auth.is_loading);
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;
  const {
    control,
    register,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({mode: 'all'});
  const onSubmit = data => {
    // console.log('HAmza k bare bare', data);
    dispatch(loginApi(data, setModalVisible));
  };
  return (
    <ScrollView>
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={keyboardVerticalOffset}
        style={styles.container}>
        <View style={styles.loginContainer}>
          <ResponseModal
            title={response_status?.message}
            visible={modalVisible}
            onBackButtonPress={() => setModalVisible(false)}
            onBackdropPress={() => setModalVisible(false)}
            state={response_status?.status}
          />
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitleText}>Email address</Text>
            <View style={styles.inputFieldContainer}>
              <MaterialCommunityIcons
                style={styles.inputIcon}
                name="email"
                color={Colors.themeRed}
                size={20}
              />
              <Input
                name="email"
                control={control}
                keyboardType={'email-address'}
                placeholderTextColor={Colors.placeholderText}
                style={styles.inputField}
                textStyle={[styles.inputTextStyle]}
                rules={{
                  required: 'email is required',
                  value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                  message: 'Enter a valid email',
                }}
                placeholder="Enter your email address"
              />
            </View>
            {errors.email && (
              <Text style={styles.error}>{errors.email.message} </Text>
            )}
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitleText}>Password</Text>
            <View style={styles.inputFieldContainer}>
              <Fontisto
                style={styles.inputIcon}
                name="locked"
                color={Colors.themeRed}
                size={20}
              />
              <Input
                name="password"
                control={control}
                placeholderTextColor={Colors.placeholderText}
                style={styles.inputField}
                textStyle={[styles.inputTextStyle, {marginTop: 7}]}
                rules={{
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: '*Password too short (minimum length is 8)',
                  },
                  maxLength: {
                    value: 16,
                    message: '*Password too long (maximum length is 16)',
                  },
                }}
                placeholder="Enter password"
                secureTextEntry={true}
              />
            </View>
            {errors.password && (
              <Text style={styles.error}>{errors.password.message} </Text>
            )}
          </View>
        </View>
        <View style={styles.forgotPasswordContainer}>
          <View style={styles.remembermeContainer}>
            <CheckBox
              tintColors={{true: Colors.themeRed, false: Colors.themeRed}}
              disabled={false}
              value={toggleCheckBox}
              onValueChange={newValue => setToggleCheckBox(newValue)}
            />
            <Text style={styles.rememberMeText}>Remember me</Text>
          </View>
          <Text
            onPress={() => navigation.navigate('forgotPassword')}
            style={styles.forgotPasswordText}>
            Forgot Password?
          </Text>
        </View>
        <CustomButton
          loading={loading}
          onPress={handleSubmit(onSubmit)}
          style={styles.enableButton}
          title="LOGIN"
        />
        <Text style={styles.signInText}>Or SignIn with</Text>
        <SocialButton
          onPress={() => {
            //  alert('Your Facebook developer account is under review!');
            dispatch(FacebookSignin(setModalVisible, navigation));
          }}
          facebook={true}
          styles={styles.facebookButton}
          title="Login with facebook"
        />
        <SocialButton
          onPress={() => {
            // alert(
            //   'Google account for authentication is under review. It will be live soon.',
            // );

            dispatch(googleSignin(setModalVisible, navigation));
          }}
          textStyle={{color: 'black'}}
          styles={styles.googleButton}
          title="Login with Google"
        />
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.themeWhite,
  },
  loginContainer: {
    marginTop: 30,
  },
  inputContainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
  },
  inputTitleText: {
    color: Colors.inputText,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
  inputFieldContainer: {
    justifyContent: 'center',
    borderBottomColor: Colors.inputUnderline,
    borderBottomWidth: 1,
  },

  inputIcon: {
    position: 'absolute',
  },
  inputField: {
    paddingLeft: 30,
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
  forgotPasswordContainer: {
    marginVertical: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  remembermeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberMeText: {
    color: 'black',
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
  },
  forgotPasswordText: {
    color: Colors.themeRed,
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
  },
  signInText: {
    marginVertical: 15,
    alignSelf: 'center',
    color: Colors.inputText,
    fontFamily: 'Poppins-Regular',
  },
  enableButton: {
    backgroundColor: Colors.themeRed,
  },

  facebookButton: {
    backgroundColor: Colors.facebookButton,
    marginBottom: 10,
  },
  googleButton: {
    backgroundColor: Colors.themeWhite,
  },
});
