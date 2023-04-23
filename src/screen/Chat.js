import React, {useCallback, useRef, useState} from 'react';
import ChatHeader from '../components/header/ChatHeader';
import {Colors} from '../constant/Colors';
import ChatBoxConatiner from '../components/ChatBoxConatiner';
import SendMessageInput from '../components/inputs/SendMessageInput';
import {useSelector} from 'react-redux';
import {token, base_Url} from '../constant/BaseUrl';
import {useFocusEffect} from '@react-navigation/native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {scale, verticalScale} from 'react-native-size-matters-ch';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Font} from '../constant/Font';
import {CUSTOMER_DETAILS} from '../redux/reducers/ProviderReducer';
import OneSignal from 'react-native-onesignal';

const Chat = ({route}) => {
  const userId = useSelector(state => state.auth.user_details.user_id);
  const roleId = useSelector(state => state.auth.user_details.role_id);
  const friendID = route.params.id;
  console.log('====================================');
  console.log('rider Id ', friendID);
  console.log('====================================');
  const customerName = useSelector(state => state.provider.customerName);
  const reciverName = roleId == 1 ? route.params.name : customerName;
  const [chatData, setChatData] = useState([]);
  const [message, setMesssage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const flatlistRef = useRef();
  let int = 0;
  console.log('====================================');
  console.log('Customer Details : ', customerName, (int += 1));
  console.log('====================================');

  const getMessages = async () => {
    try {
      let base_url = `${base_Url}/getmessages.php`;
      let formData = new FormData();
      formData.append('user_id', userId);
      formData.append('friend_id', friendID);
      const response = await fetch(base_url, {
        method: 'POST',
        body: formData,
      });

      const responseData = await response.json();
      console.log('====================================');
      console.log('Getting message response: ', responseData.status);
      console.log('====================================');
      if (responseData.status == true) {
        setChatData(responseData.data);
        setIsLoading(false);
      } else {
        setChatData([]);
      }
    } catch (error) {
      console.log('====================================');
      console.log('ERROR !!! ', error);
      console.log('====================================');
      setChatData([]);
    }
  };

  const sendMessage = async () => {
    try {
      console.log('====================================');
      console.log('Message sending in process');
      console.log('====================================');
      let base_url = `${base_Url}/sendmessage.php`;
      let formData = new FormData();
      formData.append('user_id', userId);
      formData.append('user_massage', message);
      formData.append('friend_id', friendID);
      formData.append('data_type', 'text');
      const response = await fetch(base_url, {
        method: 'POST',
        body: formData,
      });

      const responseData = await response.json();
      console.log('====================================');
      console.log('Message sent', responseData);
      console.log('====================================');
      if (responseData.status == true) {
        getMessages();
        setMesssage('');
      } else {
        getMessages();
      }
    } catch (error) {
      console.log('====================================');
      console.log('ERROR from send Message!!! ', error);
      console.log('====================================');
    }
  };

  const sendImage = async data => {
    try {
      setIsLoading(true);
      let base_url = `${base_Url}/sendmessage.php`;
      let formData = new FormData();
      formData.append('user_id', userId);
      formData.append('user_massage', data.name);
      formData.append('friend_id', friendID);
      formData.append('data_type', data.type);
      formData.append('data_uri', data);
      const response = await fetch(base_url, {
        method: 'POST',
        body: formData,
      });

      const responseData = await response.json();
      setIsLoading(true);
      console.log('====================================');
      console.log('IMAGE SENT');
      console.log('====================================');
      if (responseData.status == true) {
        getMessages();
      } else {
        getMessages();
      }
    } catch (error) {
      console.log('====================================');
      console.log('ERROR !!! ', error);
      console.log('====================================');
    }
  };

  useFocusEffect(
    useCallback(() => {
      getMessages();
    }, [customerName]),
  );

  const openGallery = async () => {
    setIsLoading(true);
    let options = {
      storageOptions: {
        mediaType: 'photo',
        path: 'image',
        includeExtra: true,
      },
      selectionLimit: 1,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        let myData = {
          name: response.assets?.[0]?.fileName,
          uri: response.assets?.[0]?.uri,
          type: response.assets?.[0]?.type,
        };
        setModalVisible(false);
        sendImage(myData);
      }
    });
  };

  const openCam = async () => {
    let options = {
      storageOptions: {
        mediaType: 'photo',
        path: 'image',
        includeExtra: true,
      },
      selectionLimit: 1,
    };
    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        let myData = {
          name: response.assets?.[0]?.fileName,
          uri: response.assets?.[0]?.uri,
          type: response.assets?.[0]?.type,
        };
        setModalVisible(false);
        sendImage(myData);
      }
    });
  };

  OneSignal.setNotificationWillShowInForegroundHandler(
    notificationReceivedEvent => {
      let notification = notificationReceivedEvent.getNotification();
      OneSignal.add;
      const data = notification.additionalData;
      console.log('data in notification', data);
      getMessages();
      notificationReceivedEvent.complete();
    },
  );

  return (
    <View style={styles.container}>
      <ChatHeader name={reciverName} />
      <FlatList
        ref={flatlistRef}
        onContentSizeChange={() => flatlistRef?.current?.scrollToEnd()}
        data={chatData}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return <ChatBoxConatiner data={item} senderId={userId} />;
        }}
      />
      {isLoading ? (
        <ActivityIndicator
          size={'large'}
          style={{margin: 20}}
          color={Colors.themeRed}
        />
      ) : (
        <SendMessageInput
          textController={setMesssage}
          text={message}
          onSendHandler={sendMessage}
          onPickImage={() => {
            setModalVisible(!modalVisible);
          }}
        />
      )}
      <Modal
        backdropOpacity={0.2}
        onBackdropPress={() => setModalVisible(false)}
        transparent={true}
        isVisible={modalVisible}
        style={{
          width: '100%',
          position: 'relative',
          right: scale(18),
          top: 20,
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <View style={styles.SecCon}>
            <TouchableOpacity
              onPress={() => {
                openCam();
              }}
              style={styles.ModalBtn}>
              <Ionicons name="camera" size={24} color={Colors.themeRed} />
              <Text style={styles.Text}>Take an image</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                openGallery();
              }}
              style={styles.ModalBtn}>
              <Ionicons name="images" size={24} color={Colors.themeRed} />
              <Text style={styles.Text}>select an image</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.themeWhite,
  },
  ModalBtn: {
    flex: 1,
    backgroundColor: 'white',
    margin: scale(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  Text: {
    fontFamily: Font.Poppins300,
    fontSize: scale(11),
    color: Colors.themeRed,
  },
  SecCon: {
    height: verticalScale(100),
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    flexDirection: 'row',
  },
  tinyLogo: {
    height: verticalScale(22),
    width: scale(22),
  },
});
