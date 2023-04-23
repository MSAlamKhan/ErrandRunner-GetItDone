import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import React, { useRef, useState } from 'react';

import { useForm } from 'react-hook-form';

import { accessCamera, accessGallery } from '../../../utils/ImagePicker';

import { Colors } from '../../../constant/Colors';
import { ImageURL } from '../../../constant/BaseUrl';
import { ImagePickerModal } from '../../../components/modals/ImagePickerModal';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Input from '../../../components/inputs/Inputs';
import CustomButton from '../../../components/buttons/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../redux/actions/AuthActions';
import FullScreenLoader from '../../../components/Loader/FullScreenLoader';
import ResponseModal from '../../../components/modals/ResponseModal';
import { editProfile } from '../../../redux/actions/AuthActions';

const EditProfile = ({ navigation }) => {
  const photo = useRef();
  const dispatch = useDispatch();
  const user_id = useSelector(state => state.auth.user_details.user_id);
  const loading = useSelector(state => state.auth.is_loading);
  const userDetails = useSelector(state => state.auth.user_details);

  const [value, setValue] = useState();

  console.log('USER DETAILSS => ', userDetails);
  const [visible, setVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const {
    control,
    register,
    handleSubmit,
    // setValue,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: 'all',
  });

  console.log('========================>', userDetails);
  const response_status = useSelector(state => state.auth.response_status);
  //   const requestCameraPermission = async () => {
  //     try {
  //       const granted = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.CAMERA,
  //         {
  //           title: 'Mr Mart App Camera Permission',
  //           message:
  //             'Mr Mart needs access to your camera ' +
  //             'so you can take awesome pictures.',
  //           buttonNeutral: 'Ask Me Later',
  //           buttonNegative: 'Cancel',
  //           buttonPositive: 'OK',
  //         },
  //       );
  //       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //         console.log('You can use the camera');
  //       } else {
  //         Toast.show(
  //           'Camera Permission isnt Given go to setting to acccess camera permission',
  //           Toast.SHORT,
  //         );
  //         setTimeout(() => {
  //           //your code to be executed after 1 second
  //           Linking.openSettings();
  //         }, 1000);
  //       }
  //     } catch (err) {
  //       console.warn(err);
  //     }
  //   };
  const openCamera = async () => {
    // setVisible(true);
    // await requestCameraPermission();
    accessCamera().then(response => {
      photo.current = response.assets ? response.assets[0] : undefined;
      setValue(photo.current);
      setVisible(false);
    });
  };
  const openGallery = () => {
    // setVisible(true);
    accessGallery().then(response => {
      photo.current = response.assets ? response.assets[0] : undefined;
      setValue(photo.current);
      setVisible(false);
    });
  };

  //* ON SUBMIT FORMMM
  const onSubmit = data => {
    dispatch(
      editProfile(
        data,
        user_id,
        value.fileName,
        value.uri,
        value.type,
        setModalVisible,
      ),
    );
  };

  return loading ? (
    <FullScreenLoader />
  ) : (
    <View style={styles.container}>
      <ResponseModal
        title={response_status.message}
        visible={modalVisible}
        onBackButtonPress={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}
        state={response_status.status}
      />
      <ImagePickerModal
        isVisible={visible}
        onClose={() => setVisible(false)}
        onImageLibraryPress={openGallery}
        onCameraPress={openCamera}
      />
      <ScrollView>
        <TouchableOpacity
          onPress={() => setVisible(true)}
          style={styles.imageContainer}>
          {!photo.current ? (
            <>
              <Image
                style={styles.profilePicture}
                source={{ uri: `${ImageURL + userDetails.profile_pic}` }}
              />

              <View style={styles.iconsContainer}>
                <MaterialIcons
                  color={Colors.themeWhite}
                  name="edit"
                  size={25}
                  style={{ textAlign: 'center' }}
                />
              </View>
            </>
          ) : (
            <>
              <Image
                source={{ uri: photo.current.uri }}
                style={styles.profilePicture}
              />
              <View style={styles.iconsContainer}>
                <MaterialIcons
                  color={Colors.themeWhite}
                  name="edit"
                  size={25}
                  style={{ textAlign: 'center' }}
                />
              </View>
            </>
          )}
        </TouchableOpacity>

        <View style={styles.inputContainer}>
          <Text style={styles.inputTitleText}>First Name</Text>
          <View style={styles.inputFieldContainer}>
            <Input
              name="firstName"
              placeholderTextColor={Colors.placeholderText}
              defaultValue={userDetails.fname}
              control={control}
              style={styles.inputField}
              textStyle={[styles.inputTextStyle, { marginTop: 5 }]}
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
              defaultValue={userDetails.lname}
              textStyle={[styles.inputTextStyle, { marginTop: 5 }]}
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
          <Text style={styles.inputTitleText}>Phone Number</Text>
          <View style={styles.inputFieldContainer}>
            <Input
              name="phoneNumber"
              control={control}
              placeholderTextColor={Colors.placeholderText}
              defaultValue={userDetails.phone}
              style={styles.inputField}
              textStyle={[styles.inputTextStyle, { marginTop: 5 }]}
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
          <Text style={styles.inputTitleText}>Email</Text>
          <View style={styles.inputFieldContainer}>
            <Input
              name="email"
              control={control}
              placeholderTextColor={Colors.placeholderText}
              defaultValue={userDetails.email}
              style={styles.inputField}
              textStyle={[styles.inputTextStyle, { marginTop: 5 }]}
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
          <Text style={styles.inputTitleText}>Address</Text>
          <View style={styles.inputFieldContainer}>
            <Input
              name="address"
              control={control}
              placeholderTextColor={Colors.placeholderText}
              defaultValue={userDetails.address}
              style={styles.inputField}
              textStyle={[styles.inputTextStyle, { marginTop: 5 }]}
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
              defaultValue={userDetails.city}
              style={styles.inputField}
              textStyle={[styles.inputTextStyle, { marginTop: 5 }]}
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
              defaultValue={userDetails.state}
              style={styles.inputField}
              textStyle={[styles.inputTextStyle, { marginTop: 5 }]}
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
              name="ZipCode"
              control={control}
              placeholderTextColor={Colors.placeholderText}
              defaultValue={userDetails.zipcode}
              style={styles.inputField}
              textStyle={[styles.inputTextStyle, { marginTop: 5 }]}
              rules={{
                required: 'Zipcode is required',
                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                message: 'Enter a valid email',
              }}
              placeholder="Enter Your Zip Code"
            />
          </View>
          {errors.ZipCode && (
            <Text style={styles.error}>{errors.ZipCode.message} </Text>
          )}
        </View>
        <CustomButton
          onPress={handleSubmit(onSubmit)}
          title={'Next'}
          style={{ marginVertical: 20 }}
        />

        {
          !userDetails.social_id &&
          <CustomButton
            onPress={() => navigation.navigate('changePassword')}
            title={'Change Password'}
            style={{ marginBottom: 15 }}
          />
        }
        <CustomButton
          onPress={() => dispatch(logout(user_id, setModalVisible))}
          title={'Log out'}
          style={{ marginBottom: 15 }}
        />
      </ScrollView>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.themeWhite,
  },
  imageContainer: {
    width: 130,
    alignSelf: 'center',
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 100,
    //   width: 120,
    // borderColor: 'rbga(255,255,255,0.1)',
    borderColor: Colors.themeRed,
    height: 130,
  },
  profilePicture: {
    width: 128.5,
    height: 128.5,
    borderRadius: 100,
    alignSelf: 'center',
  },
  iconsContainer: {
    padding: 5,
    borderRadius: 50,
    position: 'absolute',

    bottom: 0,
    right: 0,
    backgroundColor: Colors.themeRed,
  },
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
