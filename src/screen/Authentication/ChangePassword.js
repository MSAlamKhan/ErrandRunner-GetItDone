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
  ScrollView,
} from 'react-native';
import React, {useState, useRef, useContext} from 'react';
import {useForm} from 'react-hook-form';

import Input from '../../components/inputs/Inputs';
import {Colors} from '../../constant/Colors';
import CustomButton from '../../components/buttons/CustomButton';
import GetItDoneImage from '../../components/GetItDoneImage';
import {useDispatch, useSelector} from 'react-redux';
import {resetPassword} from '../../redux/actions/AuthActions';
import {useNavigation} from '@react-navigation/native';
import ResponseModal from '../../components/modals/ResponseModal';

const ResetPassword = ({navigation, route}) => {
  const [index, setIndex] = useState(99);
  const [modalVisible, setModalVisible] = useState(false);
  const response_status = useSelector(state => state.auth.response_status);
  const loading = useSelector(state => state.auth.is_loading);
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    watch,
    formState: {errors, isValid},
  } = useForm({mode: 'all'});
  const {email} = route.params;
  const onSubmit = data => {
    // navigation.navigate('authentication');
    // console.log(data.newpassword)

    console.log('NEE----PASS', data);
    dispatch(
      resetPassword(email, data.newpassword, setModalVisible, navigation),
    );
    // ResetPasswordApi(data, email);
  };

  const confirmPasswordRef = useRef();

  return (
    // <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <SafeAreaView style={styles.screenContainer}>
      <ResponseModal
        title={response_status.message}
        visible={modalVisible}
        onBackButtonPress={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}
        state={response_status.status}
      />
      <ScrollView>
        <Text style={styles.headerText}>Reset Password</Text>
        <Text
          style={{
            color: '#000000B2',
            fontFamily: 'Poppins-Regular',
            fontSize: 18,
            alignSelf: 'flex-start',
            marginHorizontal: 25,
            paddingVertical: 10,
          }}>
          Enter your new password.
        </Text>
        <View style={{paddingTop: 20}}>
          <Input
            onFocus={() => {
              setIndex(0);
            }}
            style={[
              styles.containerStyle,
              {
                borderWidth: 1,
                borderColor: Colors.themeRed,
              },
            ]}
            control={control}
            name="newpassword"
            rules={{
              required: '*Password is required',
              minLength: {
                value: 8,
                message: '*Password too short (minimum length is 8)',
              },
              maxLength: {
                value: 16,
                message: '*Password too long (maximum length is 16)',
              },
            }}
            onSubmitEditing={() => confirmPasswordRef.current.focus()}
            password={true}
            keyboardType="default"
            placeholder="Enter New Password"
            maxLength={20}
            placeholderTextColor={'#32323266'}
            secureTextEntry={true}
          />
        </View>
        {errors.newpassword && (
          <Text style={styles.error}>{errors.newpassword.message} </Text>
        )}
        <View style={{paddingTop: 20}}>
          <Input
            onFocus={() => {
              setIndex(1);
            }}
            style={[
              styles.containerStyle,
              {
                borderWidth: 1,
                borderColor: Colors.themeRed,
              },
            ]}
            control={control}
            name="confirmpassword"
            rules={{
              required: '*Password is required',
              minLength: {
                value: 8,
                message: '*Password too short (minimum length is 8)',
              },
              maxLength: {
                value: 16,
                message: '*Password too long (maximum length is 16)',
              },
              validate: {
                positive: value =>
                  value === watch('newpassword') ||
                  'The passwords do not match',
              },
            }}
            ref={e => (confirmPasswordRef.current = e)}
            onSubmitEditing={handleSubmit(onSubmit)}
            password={true}
            keyboardType="default"
            placeholder="Confirm New Password"
            maxLength={20}
            placeholderTextColor={'#32323266'}
            secureTextEntry={true}
          />
        </View>
        {errors.confirmpassword && (
          <Text style={styles.error}>{errors.confirmpassword.message} </Text>
        )}
        <CustomButton
          onPress={handleSubmit(onSubmit)}
          loading={loading}
          containerStyle={styles.containerStyle}
          title="Reset"
          style={styles.enabledButton}
          textStyle={styles.enabledButtonText}
        />

        <GetItDoneImage style={{height: '50%'}} />
      </ScrollView>
    </SafeAreaView>
    // </TouchableWithoutFeedback>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.themeWhite,
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
    width: '85%',
    alignSelf: 'center',
    // marginTop: '10%',
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

  enabledButton: {
    // alignSelf: 'center',
    marginTop: 30,
  },
  enabledButtonText: {
    color: 'white',
  },
});
