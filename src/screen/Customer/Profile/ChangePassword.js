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
import Input from '../../../components/inputs/Inputs';
import NotificationModal from '../../../components/modals/NotificationModal';
import CustomButton from '../../../components/buttons/CustomButton';
import {Colors} from '../../../constant/Colors';
import StatusModal from '../../../components/modals/AddTaskModal';
import {useSelector, useDispatch} from 'react-redux';
import {changePassowrd} from '../../../redux/actions/AuthActions';
import {base_Url, token} from '../../../constant/BaseUrl';
import {useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {useCallback} from 'react';

const ChangePassword = ({navigation}) => {
  const [index, setIndex] = useState(99);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentPassword, setCurrentPassword] = useState();
  const userDetails = useSelector(state => state.auth.user_details);

  let email = userDetails.email;
  const dispatch = useDispatch();

  const getCurrentPassword = async () => {
    try {
      let base_url = `${base_Url}/get_password.php`;
      let formData = new FormData();
      formData.append('token', token);
      formData.append('user_id', userDetails.user_id);
      const response = await fetch(base_url, {
        method: 'post',
        body: formData,
      });
      const responseData = await response.json();
      if (responseData.status == true) {
        console.log('====================================');
        console.log('password data', responseData);
        console.log('====================================');
        setCurrentPassword(responseData.data.password);
      } else {
        console.log('====================================');
        console.log('FALSE STATUS');
        console.log('password data', responseData);
        console.log('====================================');
      }
    } catch (error) {
      console.log('====================================');
      console.log('PASSWORD ERROr : ', error);
      console.log('====================================');
    }
  };

  useFocusEffect(
    useCallback(() => {
      getCurrentPassword();
    }, []),
  );

  const {
    control,
    handleSubmit,
    watch,
    formState: {errors, isValid},
  } = useForm({mode: 'all'});

  const onSubmit = data => {
    console.log('====================================');
    console.log('DATA IN SUBMIT', data);
    console.log('====================================');
    dispatch(
      changePassowrd(
        email,
        data.newpassword,
        data.currentPassword,
        setModalVisible,
        navigation,
      ),
    );
    // modalVisible(true);
    // setTimeout(() => {
    //   setModalVisible(false);
    // }, 2000);
  };

  const confirmPasswordRef = useRef();

  return (
    <SafeAreaView style={styles.screenContainer}>
      <ScrollView>
        <View>
          <StatusModal
            message="Password Changed Successfull"
            visible={modalVisible}
          />
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
            Enter your new password. current password
          </Text>

          <ScrollView>
            <View style={{paddingTop: 20}}>
              <Input
                onFocus={() => {
                  setIndex(0);
                }}
                style={[
                  styles.containerStyle,
                  {
                    borderWidth: index === 0 ? 1 : 1,
                    borderColor:
                      index === 0 ? Colors.themeRed : Colors.greyfont,
                  },
                ]}
                control={control}
                name="currentPassword"
                rules={{
                  required: '*Current Password is required',
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
                      value !== currentPassword
                        ? 'The passwords do not match'
                        : null,
                    // console.log('====> ', value),
                  },
                }}
                onSubmitEditing={() => confirmPasswordRef.current.focus()}
                password={true}
                keyboardType="default"
                placeholder="Enter Current Password"
                maxLength={20}
                placeholderTextColor={'#32323266'}
                secureTextEntry={true}
              />
            </View>
            {errors.currentPassword && (
              <Text style={styles.error}>
                {errors.currentPassword.message}{' '}
              </Text>
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
                    borderColor:
                      index === 1 ? Colors.themeRed : Colors.greyfont,
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
                  setIndex(2);
                }}
                style={[
                  styles.containerStyle,
                  {
                    borderWidth: 1,
                    borderColor:
                      index === 2 ? Colors.themeRed : Colors.greyfont,
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
              <Text style={styles.error}>
                {errors.confirmpassword.message}{' '}
              </Text>
            )}
            <CustomButton
              onPress={handleSubmit(onSubmit)}
              containerStyle={styles.containerStyle}
              title="Reset"
              style={styles.enabledButton}
              textStyle={styles.enabledButtonText}
            />
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChangePassword;

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
